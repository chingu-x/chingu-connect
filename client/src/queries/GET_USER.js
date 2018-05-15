import gql from 'graphql-tag';

export default gql`
  query ($id: ID!) {
    user (input: {
      id: $id
    }) {
      username
      avatar
    }
  }
`;
