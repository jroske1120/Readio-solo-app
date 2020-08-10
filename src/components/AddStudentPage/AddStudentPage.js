import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  
};

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
      <>
        {this.props.reduxState.user.is_teacher === true ?
        (<div>
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
        <br></br></div>)
        :
        <div>404</div>}
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(AddStudentPage)));