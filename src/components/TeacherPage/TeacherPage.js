import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";

class TeacherPage extends Component {

  // This is main user profile
  render() {
    return (
      <div>
        <h1 id="welcome">Teacher's Page!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <button onClick={() => {
          this.props.history.push('/search');
        }} >
          Search for a Book!
          </button>
          <button onClick={() => {
          this.props.history.push('/addstudent');
        }} >
          Add a student!
          </button>
{/* map out books that have been added to server based on id */}
        
        
        <h2>You will only see this if is_teacher = true!</h2>
        
        <br></br>
        <LogOutButton className="log-in" />

      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TeacherPage);