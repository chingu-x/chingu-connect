import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import App from './components/App';
import './styles/main.scss';

// uri defaults to `/graphql`
const client = new ApolloClient({
  uri: 'http://localhost:8008/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppContainer>
      <App />
    </AppContainer>
  </ApolloProvider>,
  document.getElementById('root'),
);

// Webpack Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <AppContainer>
          <App />
        </AppContainer>
      </ApolloProvider>,
      document.getElementById('root'),
    );
  });
}
