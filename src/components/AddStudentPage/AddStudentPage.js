import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";

class AddStudentPage extends Component {
  state = {
    username: '',
    password: '',
    is_teacher: 'false',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.is_teacher) {
      this.props.dispatch({
        type: 'ADD_STUDENT',
        payload: {
          username: this.state.username,
          password: this.state.password,
          is_teacher: this.state.is_teacher,
        },
      });
      this.props.history.push('/teacher');
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  // This is main user profile
  render() {
    return (
      <div>
        <h1 id="welcome">Add Student Page!</h1>
        <form onSubmit={this.registerUser}>
          <h1>Add A Student</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Add"
            />
          </div>
        </form>
        <button onClick={() => {
          this.props.history.push('/teacher');
        }} >
          Back to Teacher Page
          </button>
        <br></br>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddStudentPage);