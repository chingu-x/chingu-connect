import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import GET_USER from '../queries/GET_USER';

/**
 * User Profile component
 * Displays previously created and joined connection cards
 * @param {Object} Uses props for react-router re-directs and profile ID from URL
 */

const Profile = (props) => {
  const { id } = props.props.match.params;

  // re-route to homepage if not logged in
  if (id === 'null') { props.props.history.push('/'); }
  props.handleId(props.props.match.params.id);

  return (
    <div>
      {props.data.user &&
      <div className="user-query-container">
        <p>{props.data.user.username}</p>
        <img src={props.data.user.avatar} alt="user github profile picture"/>
      </div>}
      <h1>Profile Page</h1>
      <Link to="/" className="link">Go to Homepage</Link>
    </div>
  );
};

Profile.propTypes = {
  props: PropTypes.object,
  handleId: PropTypes.func,
  history: PropTypes.object,
  push: PropTypes.func,
  data: PropTypes.object,
  username: PropTypes.string,
  avatar: PropTypes.string,
};

export default withRouter(graphql(GET_USER, {
  options: props => ({ variables: { id: props.props.match.params.id } }),
})(Profile));
