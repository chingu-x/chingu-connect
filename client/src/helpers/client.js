import ApolloClient from 'apollo-boost';

/**
 * Create CLIENT for apollo graphql
 * URI defaults to `/graphql`
 * Option: add ClientState to replace redux eventually
 */

export default new ApolloClient({
  uri: 'http://localhost:8008/graphql',
});
