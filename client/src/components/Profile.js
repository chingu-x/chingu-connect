import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import ConnectionCard from './ConnectionCard';

// Actions
import { fetchUserConnections } from '../actions/auth';

// Queries
import GET_USER from '../queries/GET_USER';

class Profile extends Component {
  componentDidMount() {
    /**
     * Check if redux store has user connections
     * If not, fetch connections through graphql query
     * Dispatch data to redux store
     */
    if (!this.props.auth.connectionList) {
      this.props.client.query({
        query: GET_USER,
        variables: { id: this.props.props.match.params.id },
      })
        .then(({ data }) => {
          this.props.dispatch(fetchUserConnections(data.user.created, data.user.joined));
        });
    }
  }

  render() {
    const { creds, connectionList } = this.props.auth;

    /**
     * User Profile component
     * Displays previously created and joined connection cards
     * @param {Object} Uses props for react-router re-directs and profile ID from URL
     */
    const mapCreatedConnections = allConnections => allConnections.map((connection, index) => (
      <ConnectionCard key={ index } connection={ connection } index={ index }/>
    ));

    /**
     * Render connections column with different data based on field that's passed
     * Field is either 'created' or 'joined'
     * @param {String} connectionField
     */
    const renderConnections = (connectionField) => {
      if (connectionList) {
        return (
          <div className="connections-column">
            <h2>Connections { connectionField === 'created' ? 'Created' : 'Joined'}</h2>
            <label htmlFor="user-created-connections">Sort By:</label>
            <select id="user-created-connections">
              <option defaultValue>Newest</option>
            </select>
            { connectionList[connectionField].length > 0
              ? mapCreatedConnections(connectionList[connectionField])
              : <div>No { connectionField === 'created' ? 'Created' : 'Joined'} Connections</div> }
          </div>
        );
      }
      return null;
    };

    return (
      <div>
        { connectionList &&
          <div className="user-query-container">
            <p>{ creds.username }</p>
            <img src={ creds.avatar } alt="user github profile picture" />
          </div>
        }
        <div className="connections-container">
          { creds ? renderConnections('created') : null }
          { creds ? renderConnections('joined') : null }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  props: PropTypes.object,
  avatar: PropTypes.string,
  client: PropTypes.object,
  auth: PropTypes.object,
  dispatch: PropTypes.func,
  creds: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  connections: state.connections,
});

// export default graphql(GET_USER, {
//   options: props => ({ variables: { id: props.props.match.params.id } }),
// })(Profile);

export default connect(mapStateToProps)(withApollo(Profile));
