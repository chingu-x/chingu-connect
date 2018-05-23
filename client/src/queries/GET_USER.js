import gql from 'graphql-tag';

export default gql`
  query ($id: ID!) {
    user (input: {
      id: $id
    }) {
      id
      username
      avatar
      created {
          id
          title
          description
          timestamp
          lifespan
          owner {
              id
              username
          }          
      }
      joined {
        id,
        title
        description
        timestamp
        partner {
          id
          username
        }
      }
    }
  }
`;
