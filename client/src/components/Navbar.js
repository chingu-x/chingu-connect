import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signoutUser } from '../actions/auth';

/**
 * Navigation bar component
 * Returns react-router anchors to the help board and profile components
 * @param {Object} creds: Get user ID from redux store for profile path
 * @param {Object} signedIn: If signed in, show 'profile' and 'sign out' links
 */

const Navbar = (props) => {
  const { signedIn, creds } = props.auth;

  return (
    <div>
      {signedIn &&
        <div className="navbar-container">
          <NavLink to="/" id="chingu" className="link navbar-link">
            <img src="https://avatars1.githubusercontent.com/u/28485958?s=200&v=4" alt="chingu logo"/>
          </NavLink>
          <NavLink to="/expressboard" className="link navbar-link">Express Board</NavLink>
          <NavLink to={`/user/${creds._id}`} className="link navbar-link">Profile</NavLink>
          <a href="http://localhost:8008/auth/logout" className="link navbar-link" onClick={() => props.dispatch(signoutUser())}>Sign Out</a>
        </div>}
    </div>
  );
};

Navbar.propTypes = {
  props: PropTypes.object,
  creds: PropTypes.object,
  signedIn: PropTypes.bool,
  auth: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default (connect(mapStateToProps)(Navbar));

