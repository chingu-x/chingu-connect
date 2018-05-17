import gql from 'graphql-tag';

export default gql`
  mutation ($id: ID!, $title: String!, $description: String!, $lifespan: Int!) {
    createConnection (input: {
      id: $id,
      title: $title,
      description: $description,
      lifespan: $lifespan,
    }) {
      id
    }
  }
`;
