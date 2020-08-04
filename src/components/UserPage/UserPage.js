import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";

class UserPage extends Component {

  // This is main user profile
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <button onClick={() => {
          this.props.history.push('/search');
        }} >
          Search for a Book!
          </button>
        {/* map out books that have been added to server based on id WHERE user.id === user.id*/}


        <h2>Books that you add will show here below</h2>
        <ul>
          <li>Book 1</li>
          <li>Book 2</li>
        </ul>
        <br></br>
        <LogOutButton className="log-in" />
        {/* Conditional rendering if user is a teacher
        then button to see class info (link to /teacher) displays */}
        {this.props.user.is_teacher ?
          <button onClick={() => {
            this.props.history.push('/teacher');
          }} >
            See Class Info</button>
          : <></>
}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
