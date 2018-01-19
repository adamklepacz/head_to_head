import { firebaseAuth } from '../utils/firebase';
import { observable } from 'mobx';

class ViewStore {
  @observable authed: boolean = true;
  @observable isLoading: boolean = false;
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
}

export default ViewStore;