import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";

class AddStudentPage extends Component {

  // This is main user profile
  render() {
    return (
      <div>
        <h1 id="welcome">Add Student Page!</h1>

        <form>
          <input />
          <input />
        </form>
        <button>Add This Student to your Class!</button>
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