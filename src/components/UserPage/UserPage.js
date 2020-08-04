import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    width: 350,
    padding: 10,
    margin: 40,
    justifyContent: 'center',
    backgroundColor: 'silver',
  },
  media: {
    height: 250,
    width: 'auto',
    marginLeft: 85
  },
};


class UserPage extends Component {
  
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_PROFILE_BOOKS'});
  }

  // This is main user profile
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.reduxState.user.username}!</h1>
        <p>Your ID is: {this.props.reduxState.user.id}</p>
        <button onClick={() => {
          this.props.history.push('/search');
        }} >
          Search for a Book!
          </button>
        {/* map out books that have been added to server based on id WHERE user.id === user.id*/}


        <h2>Books that you add will show here below</h2>
        {JSON.stringify(this.props.reduxState.profileBooks)}
        <ul>
          <li>Book 1</li>
          <li>Book 2</li>
        </ul>
        <br></br>
        <LogOutButton className="log-in" />
        {/* Conditional rendering if user is a teacher
        then button to see class info (link to /teacher) displays */}
        {this.props.reduxState.user.is_teacher ?
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

// this allows us to use <App /> in index.js
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(UserPage));

