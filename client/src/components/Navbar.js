import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Navigation bar component
 * Returns react-router anchors to the help board and profile components
 * @param {Object} props.data: Get user ID from state for profile path
 * @param {Object} loggedIn: If signed in, show 'profile' and 'sign out' links
 */

const Navbar = ({ props }) => {
  const { signedIn, data } = props;

  return (
    <div>
      {signedIn &&
        <div className="navbar-container">
          <NavLink to="/" id="chingu" className="link navbar-link">
            <img src="https://avatars1.githubusercontent.com/u/28485958?s=200&v=4" alt="chingu logo"/>
          </NavLink>
          <NavLink to="/expressboard" className="link navbar-link">Express Board</NavLink>
          <NavLink to={`/user/${data._id}`} className="link navbar-link">Profile</NavLink>
          <a href="http://localhost:8008/auth/logout" className="link navbar-link">Sign Out</a>
        </div>}
    </div>
  );
};

Navbar.propTypes = {
  props: PropTypes.object,
  data: PropTypes.object,
  signedIn: PropTypes.bool,
};

export default Navbar;

