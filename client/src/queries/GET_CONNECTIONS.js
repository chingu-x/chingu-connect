import gql from 'graphql-tag';

export default gql`
  query {
    connections {
      id
      title
      description
      timestamp
      lifespan
      owner {
        id
        username
      }
      partner {
        id
        username
      }
    }
  }
`;
