import gql from 'graphql-tag';

export default gql`
  mutation ($id: ID!, $title: TITLE!, $description: DESCRIPTION!, $lifespan: LIFESPAN!) {
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
