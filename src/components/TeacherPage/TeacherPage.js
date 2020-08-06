import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";

class TeacherPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_STUDENTS' });
    // still need reducer and saga, and router for this
}

  // This is main user profile
  render() {
    return (
      <div>
        <h1 id="welcome">Teacher's Page!</h1>
        <p>Your ID is: {this.props.reduxState.user.id}</p>
        <button onClick={() => {
          this.props.history.push('/search');
        }} >
          Search for a Book!
          </button>
          {JSON.stringify(this.props.reduxState.students)}

          <button onClick={() => {
          this.props.history.push('/addstudent');
        }} >
          Add a student!
          </button>
{/* map out books that have been added to server based on id */}
        
        
        <h2>Students will appear here</h2>
        
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(TeacherPage);

