import React from 'react';

/**
 * Initial Landing Page component
 * GitHub button for authentication
 */

const Landing = () => {
  const handleGithubLogin = () => {
    // Temporarily hard-coding backend route for github auth
    fetch('http://localhost:8008/auth/login');
  };

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Chingu Connect</h1>
        <p>A tool to optimally connect learners. Designed serendipity</p>
      </div>
      <button className="button login-button" onClick={() => handleGithubLogin()}>
      <span className="login-button__icon">
        <i className="fab fa-github"></i>
      </span>
      Sign in with GitHub
      </button>
    </div>
  );
};

export default Landing;
