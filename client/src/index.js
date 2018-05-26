import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import './styles/main.scss';
import App from './components/App';
import store from './helpers/store';
import client from './helpers/client';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <AppContainer>
        <App />
      </AppContainer>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);

// Webpack Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AppContainer>
            <App />
          </AppContainer>
        </ApolloProvider>
      </Provider>,
      document.getElementById('root'),
    );
  });
}
