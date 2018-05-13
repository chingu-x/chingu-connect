import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const App = () => (
  <div className="app-container">
    <Query
      query={gql`
        {
          users {
            id
          }
        }
      `}
    >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error!</p>;
      // Temporary code vomit to show query
      return <p>Users in DB: {data.users.length}</p>;
    }}
    </Query>
    <div className="app-card">
      <h1>Chingu Connect</h1>
      <p>A tool to optimally connect learners. Designed serendipity</p>
    </div>
    <button className="login-button">
      <span className="login-button__icon">
        <i className="fab fa-github"></i>
      </span>
      Sign in with GitHub
    </button>
  </div>
);

export default App;
