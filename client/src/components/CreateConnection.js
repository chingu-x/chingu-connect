import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import CREATE_CONNECTION from '../mutations/CREATE_CONNECTION';

// Actions
import { addConnection } from '../actions/connections';

// when a Connection is made we push it into the users redux "created" store array
// "" "" joined we do the same

const CreateConnection = (props) => {
  const { auth, mutate } = props;
  const id = auth.creds._id;

  const validateData = (e) => {
    e.preventDefault();

    mutate({
      variables: {
        id,
        title: e.target.elements.title.value,
        description: e.target.elements.description.value,
        lifespan: e.target.elements.lifespan.value,
      },
    }).then((results) => {
      props.dispatch(addConnection(results.data.createConnection));
      props.props.history.push('/expressboard');
    });
  };

  return (
    <div className="new-connection-container">
      <h1>New Connection</h1>
      <form className="new-connection-form" onSubmit={validateData.bind(this)}>
        <label>
          Title
          <input required type="text" name="title" onChange={() => validateData.bind(this)}/>
        </label>
        <label>
          Description
          <textarea
            required
            type="text"
            name="description"
            rows="1"
            onChange={() => validateData.bind(this)}
          />
        </label>
        <label>
          Availability (in hours)
          <select name="lifespan" onChange={e => validateData.bind(e.target.value)}>
            <option defaultValue="1">1</option>
            <option defaultValue="2">2</option>
            <option defaultValue="3">3</option>
            <option defaultValue="4">4</option>
            <option defaultValue="5">5</option>
            <option defaultValue="6">6</option>
            <option defaultValue="7">7</option>
            <option defaultValue="8">8</option>
          </select>
        </label>
        <button className="button new-connection-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

CreateConnection.propTypes = {
  props: PropTypes.object,
  mutate: PropTypes.func,
  auth: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default (withRouter(
  graphql(CREATE_CONNECTION)(
    (connect(mapStateToProps)(CreateConnection)),
  ),
));
