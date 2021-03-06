import * as React from 'react';
// import NavBar from './components/NavBar';
// import Home from './components/Home';
// import Login from './components/Login';
// import All from './components/All';
import Admin from './components/admin/Admin';
// import Loader from './components/Loader';
import { NavBar, Home, Login, All, Loader } from './components';
import { Route, Switch } from 'react-router-dom';
import ViewStore from './stores/ViewStore';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { RequireAuth } from './components/routes';

interface AppProps {
  viewStore: ViewStore
};

interface AppState {

};

@observer
class App extends React.Component<AppProps, AppState> {
 
  constructor(props){
    super(props);

  }

  componentDidMount() {
    const { viewStore } = this.props;
    setTimeout(() => {
      viewStore.firebaseCheckAuth();
    }, 800);  
  }

  render(){
    const { viewStore } = this.props;
    const { isLoading } = viewStore;

    return (
      <div className={`${isLoading ? 'is-loading' : ''}`}>
        {
          <DevTools />
        }
        {/* NavBar - do I need to include the ending tag? :) */}
        {
          isLoading ? <Loader /> : 
          <div>
            <NavBar viewStore={viewStore}/>

            <div className="container-fluid">
              <div className="row">
                <div className="container main-content">
                  <div className="row">

                    {/* Main content - start */}
                    <div className={`col-sm-12`} >
                      <Switch>
                        <Route exact path="/" component={ Home }/> 
                        {/* <Route path="/login" component={ Login } /> */}
                        <Route 
                          path="/login" 
                          render={routeProps => <Login {...routeProps} viewStore={viewStore}/>} 
                        />
                          <Route path="/all" component={RequireAuth(All)} />
                          <Route path="/admin" component={RequireAuth(Admin)} />
                      </Switch>
                    </div>
                    {/* Main content - end */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(App);