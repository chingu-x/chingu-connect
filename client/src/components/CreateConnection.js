import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
// import CREATE_CONNECTION from '../mutations/CREATE_CONNECTION';

class CreateConnection extends Component {
  constructor() {
    super();

    this.state = {};
  }

  validateData(e) {
    e.preventDefault();
    const { title, description, lifespan } = e.target.elements;

    this.setState({
      ...this.state,
      title: title.value,
      description: description.value,
      lifespan: lifespan.value,
    });
  }

  render() {
    console.log('from create: ', this.props, this.state);
    return (
      <div className="new-connection-container">
        <h1>New Connection</h1>
        <form className="new-connection-form" onSubmit={this.validateData.bind(this)}>
          <label>
            Title
            <input required type="text" name="title" onChange={() => this.validateData.bind(this)}/>
          </label>
          <label>
            Description
            <textarea
              required
              type="text"
              name="description"
              rows="1"
              onChange={() => this.validateData.bind(this)}
            />
          </label>
          <label>
            Lifespan
            <select name="lifespan" onChange={e => this.validateData.bind(e.target.value)}>
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
  }
}

export default CreateConnection;

// export default graphql(CREATE_CONNECTION, {
//   options: (this) => ({
//     variables: {
//       id: this.props.id._id,
//       title: this.state.title,
//       description: this.state.description,
//       lifespan: this.state.lifespan,
//     },
//   }),
// })(CreateConnection);
