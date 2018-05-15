import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Navigation bar component
 * Returns react-router anchors to the help board and profile components
 * @param {String} Get user ID from state for profile path
 */

const Navbar = ({ id }) => (
    <div className="navbar-container">
      <NavLink to="/helpboard" className="link navbar-link">Help Board</NavLink>
      <NavLink to={`${id}`} className="link navbar-link">Profile</NavLink>
    </div>
  );

Navbar.propTypes = {
  id: PropTypes.string,
};

export default Navbar;

