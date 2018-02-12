import { firebaseAuth, playersRef, headToHeadsRef, gamesRef } from '../utils/firebase';
import { observable } from 'mobx';
import { Player, HeadToHead, Game } from '../models';
import { log } from 'util';

class ViewStore {
  @observable authed: boolean = true;
  @observable isLoading: boolean = true;
  @observable user: any = null;
  @observable errorMessage: string = "";
  @observable players: Player[] = [];
  @observable headToHeads: HeadToHead[] = [];
  @observable selectedHeadToHead: HeadToHead = null;
  @observable games: Game[] = [];

  constructor() {
    // added by me - possilbe to remove
   // this.clearSelectedHeadToHead();
  }

  fetchData = () => {
    this.fetchPlayers();
    this.fetchHeadToHeads();  
    this.errorMessage = ''; 
  }

  // // added by my - possilbe to remov
  // clearSelectedHeadToHead() {
  //   this.selectedHeadToHead = null;
  // }

  getPlayerNames = (key: string):string => {
    const player = this.players.length > 0 && this.players.filter(player => player.key === key);
    return player[0].name;
  }

  fetchPlayers() {
    console.log('fetchuje playerow');
    playersRef.on('value', function (snapshot) {
      let players = [];

      snapshot.forEach(function (childSnapshot) {
        const player = childSnapshot.val();
        player.key = childSnapshot.key;
        players.push(player);
      });

      this.players = players;
    }.bind(this));
  }

  fetchHeadToHeads() {
    console.log('fetchuje headToHeads');
    headToHeadsRef.on('value', function (snapshot) {
      let headToHeads = [];

      snapshot.forEach(function (childSnapshot) {
        const headToHead = childSnapshot.val();
        headToHead.key = childSnapshot.key;
        headToHeads.push(headToHead);
      });

      this.headToHeads = headToHeads;

      // select the first head to head in the array if there is no other head to heads selected
      this.headToHeads.length > 0 && this.selectedHeadToHead === null && this.selectHeadToHead(this.headToHeads[0]);

    }.bind(this));
  }

  fetchHeadToHead(key: string) {
    this.fetchPlayers();

    headToHeadsRef.child(key).on('value', function (snapshot) {

      if(!!snapshot.val()) {
        const headToHead = snapshot.val();
        headToHead.key = snapshot.key;

        this.selectHeadToHead(headToHead); 
      } else {
        this.errorMessage = 'This Head To Head does not exist';
      }
  
    }.bind(this));
  }

  fetchGames = (headToHead: HeadToHead, fetchAll?: boolean) => {
 
    const limit = fetchAll ? 99999 : 10;

    // now read games from firebase, only games related to selected head to head
    console.log('fetchuje gamesy');
    gamesRef.orderByChild('headToHeadKey').equalTo(headToHead.key).limitToLast(limit).on('value', function (snapshot) {
      let games = [];

      snapshot.forEach(function (childSnapshot) {
        const game = childSnapshot.val();
        game.key = childSnapshot.key;
        games.push(game);
      });

      this.games = games;
    }.bind(this));
  }

  @observable firebaseCheckAuth = () => {
    firebaseAuth().onAuthStateChanged((user) => {
      if(user) {
        this.authed = true,
        this.isLoading = false,
        this.user = user;
      } else {
        this.authed = false,
        this.isLoading = false,
        this.user = null;
      }
    });
  }

  logError = (error) => {
    this.errorMessage = error;
  }

  // CRUD - player
  addPlayer = (playerName: string) => {
    // add data to firebase
    const playerKey = playersRef.push().key;
    playersRef.child(playerKey).set({"name" : playerName});
  }

  updatePlayer = (playerKey: string, value: string) => {
    playersRef.child(playerKey).update({"name": value});
  }

  removePlayer = (playerKey: string) => {
    playersRef.child(playerKey).set(null);
  }

  // in case of removing all players
  // removeAllPlayers = () => {
  //   playersRef.remove();
  // }

  // CRUD - headToHead
  addHeadToHead = (title: string, playerA: string, playerB: string) => {
    // add data to firebase
    const headToHeadKey = headToHeadsRef.push().key;
    headToHeadsRef.child(headToHeadKey).set({
      "title": title,
      "playerA": playerA,
      "playerB": playerB,
      "playerAWinCount": 0,
      "drawsCount": 0,
      "playerBWinCount": 0
    });
  }

  updateHeadToHead = (key: string, name: string, value: string) => {
    headToHeadsRef.child(key).update({ 
      [name]: value 
    });
  }

  removeHeadToHead = (key: string) => {
    headToHeadsRef.child(key).remove();
  }

  selectHeadToHead = (headToHead: HeadToHead) => {
    console.log(headToHead.title);
    this.selectedHeadToHead = headToHead;
    this.fetchGames(headToHead);
  }

  // CRUD - games
  addGame = (homeTeamName: string, awayTeamName: string, homeTeamGoals: number, awayTeamGoals: number) => {

    const { key, playerA, playerB } = this.selectedHeadToHead;
    const winnerKey = this.getWinner(playerA, playerB, homeTeamGoals, awayTeamGoals);

    const pA = this.players.length > 0 && this.players.filter(player => player.key === playerA);
    const pB = this.players.length > 0 && this.players.filter(player => player.key === playerB);

    this.updateTotalScore(winnerKey, 'addGame');

    // add data to firebase
    const gameKey = gamesRef.push().key;
    gamesRef.child(gameKey).set({
      "headToHeadKey": key,
      "homeTeamKey": playerA,
      "awayTeamKey": playerB,
      "homeTeamName": homeTeamName !== '' ? homeTeamName : pA[0].name,
      "awayTeamName": awayTeamName !== '' ? awayTeamName : pB[0].name,
      "homeTeamGoals": homeTeamGoals,
      "awayTeamGoals": awayTeamGoals,
      "date": Date.now(),
      "winnerKey": winnerKey
    });
  }

  getWinner = (playerA: string, playerB: string, homeTeamGoals: number, awayTeamGoals: number) => {
    let winner;
    if (homeTeamGoals > awayTeamGoals) {
      winner = playerA;
      console.log('Winner is:', playerA);
    } else if (homeTeamGoals < awayTeamGoals) {
      winner = playerB;
      console.log('Winner is:', playerB);
    } else if (homeTeamGoals === awayTeamGoals) {
      winner = '';
      console.log('It is draw'); 
    }
    return winner;
  }

  updateGame = (key: string, name: string, value: string) => {
    gamesRef.child(key).update({
      [name]: value
    });
  }

  removeGame = (key: string) => {
    // get winner key from current removed game
    const game = this.games.filter(game => game.key === key);
    const { winnerKey } = game[0];

    gamesRef.child(key).remove();
    this.updateTotalScore(winnerKey, 'removeGame');
  }

  updateTotalScore = (winnerKey: string, action: string) => {
    // action = addGame || removeGame
    const { key, playerAWinCount, drawsCount, playerBWinCount, playerA, playerB  } = this.selectedHeadToHead;

    switch (action) {
      case 'addGame':
        if(winnerKey === playerA) {
          headToHeadsRef.child(key).update({"playerAWinCount" : playerAWinCount + 1}, function() {
            this.selectedHeadToHead.playerAWinCount = playerAWinCount + 1;
          }.bind(this));
        } else if(winnerKey === playerB) {
          headToHeadsRef.child(key).update({ "playerBWinCount": playerBWinCount + 1 }, function() {
            this.selectedHeadToHead.playerBWinCount = playerBWinCount + 1;
          }.bind(this));
        } else if(winnerKey === '') {
          headToHeadsRef.child(key).update({ "drawsCount": drawsCount + 1 }, function() {
            this.selectedHeadToHead.drawsCount = drawsCount + 1;
          }.bind(this));
        }
        break;

      case 'removeGame':
        if (winnerKey === playerA) {
          headToHeadsRef.child(key).update({ "playerAWinCount": playerAWinCount - 1 }, function () {
            this.selectedHeadToHead.playerAWinCount = playerAWinCount - 1;
          }.bind(this));
        } else if (winnerKey === playerB) {
          headToHeadsRef.child(key).update({ "playerBWinCount": playerBWinCount - 1 }, function () {
            this.selectedHeadToHead.playerBWinCount = playerBWinCount - 1;
          }.bind(this));
        } else if (winnerKey === '') {
          headToHeadsRef.child(key).update({ "drawsCount": drawsCount - 1 }, function () {
            this.selectedHeadToHead.drawsCount = drawsCount - 1;
          }.bind(this));
        }
        break;
    
      default:
        break;
    }
  }
}

export default ViewStore;