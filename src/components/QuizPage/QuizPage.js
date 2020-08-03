import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";

class QuizPage extends Component {

  // This is main user profile
  render() {
    return (
      <div>
        <h1 id="welcome">Quiz Page!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <button onClick={() => {
          this.props.history.push('/search');
        }} >
          Search for a Book!
          </button>
{/* map out books that have been added to server based on id */}
        
        
        <h2>Quiz Questions will appear here</h2>
        <ul>
          <li>Question 1</li>
          <li>Question 2</li>
        </ul>
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
export default connect(mapStateToProps)(QuizPage);