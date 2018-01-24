import { firebaseAuth, playersRef, headToHeadsRef } from '../utils/firebase';
import { observable } from 'mobx';
import { Player, HeadToHead } from '../models';

class ViewStore {
  @observable authed: boolean = true;
  @observable isLoading: boolean = true;
  @observable user: any = null;
  @observable errorMessage: string = "";
  @observable players: Player[] = [];
  @observable headToHeads: HeadToHead[] = [];

  constructor() {
    this.fetchPlayers();
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
    playersRef.child(playerKey).set({"name": value});
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

}

export default ViewStore;