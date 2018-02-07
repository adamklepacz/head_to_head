import * as React from 'react';
import ViewStore from '../../stores/ViewStore';
import { observer, inject } from 'mobx-react';
import { UnAuthorised } from './';
 
const RequireAuth = (Component) => {

  interface ComponentProps {
    viewStore?: ViewStore,
  };

  interface ComponentState {

  }

  @inject('viewStore')
  @observer
  class AuthenticatedComponent extends React.Component<ComponentProps, ComponentState> {
    render() {
      const { viewStore } = this.props;
      return viewStore && viewStore.authed ?
        <Component {...this.props}/> :
        <UnAuthorised /> 
    }
  }
  return AuthenticatedComponent;
}

export default RequireAuth;