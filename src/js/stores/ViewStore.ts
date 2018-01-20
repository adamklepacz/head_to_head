import { firebaseAuth, playersRef } from '../utils/firebase';
import { observable } from 'mobx';

class ViewStore {
  @observable authed: boolean = true;
  @observable isLoading: boolean = true;
  @observable user: any = null;
  @observable  errorMessage: string = "";

  @observable  firebaseCheckAuth = () => {
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

  addPlayer = (playerName: string) => {
    // add data to firebase
    const playerKey = playersRef.push().key;
    playersRef.child(playerKey).set({"name" : playerName});
  }
}

export default ViewStore;