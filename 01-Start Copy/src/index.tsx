import './scss/app.scss';

import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './js/App';

import { BrowserRouter } from 'react-router-dom';

import ViewStore from './js/stores/ViewStore'; // import state
import { Provider } from 'mobx-react';
const viewStore = new ViewStore();

const stores = {
  viewStore
};

const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
  <AppContainer>
    <Provider {...stores}>
      <BrowserRouter>
        <Component viewStore={viewStore}/>
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  rootEl
  );

render(App);
if (module.hot) module.hot.accept('./js/App', () => render(App));