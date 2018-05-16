import React from 'react';
import PropTypes from 'prop-types';

/**
 * Initial Landing Page component
 * GitHub button for authentication
 * @param {boolean} signedIn: if user is signed in, hide github button
 */

const Landing = ({ signedIn }) => {
  const handleGithubLogin = () => {
    // Temporarily hard-coding backend route for github auth
    window.location = 'http://localhost:8008/auth/login';
  };

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Chingu Connect</h1>
        <p>A tool to optimally connect learners. Designed serendipity</p>
      </div>
      {!signedIn &&
      <button className="button login-button" onClick={() => handleGithubLogin()}>
      <span className="login-button__icon">
        <i className="fab fa-github"></i>
      </span>
      Sign in with GitHub
      </button>}
    </div>
  );
};

Landing.propTypes = {
  signedIn: PropTypes.bool,
};

export default Landing;
