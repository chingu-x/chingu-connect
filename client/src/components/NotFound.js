import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Not Found component
 * Handles all routes (on frontend) not specified by react-router paths
 * Manually types URLs that are invalid are handled on backend
 */

const NotFound = () => (
  <div>
    <h1>Error! Page not found.</h1>
    <Link to="/" className="link">Go to Homepage</Link>
  </div>
);

export default NotFound;
