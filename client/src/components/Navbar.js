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
    <div className="navbar-container">
      <NavLink to="/helpboard" className="link navbar-link">Help Board</NavLink>
      {signedIn && <NavLink to={`/user/${data._id}`} className="link navbar-link">Profile</NavLink>}
      {signedIn && <a href="http://localhost:8008/auth/logout" className="link navbar-link">Sign Out</a>}
    </div>
  );
};

Navbar.propTypes = {
  props: PropTypes.object,
  data: PropTypes.object,
  signedIn: PropTypes.bool,
};

export default Navbar;

