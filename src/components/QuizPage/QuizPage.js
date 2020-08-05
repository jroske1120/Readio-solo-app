import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { withStyles } from '@material-ui/core/styles';
import BookListItem from '../BookListItem/BookListItem'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class QuizPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_QUIZ' });
        //still need reducer and saga, and router for this
      }

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
        {JSON.stringify(this.props.reduxState.quiz)}
        
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

// this allows us to use <App /> in index.js
const mapReduxStateToProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(mapReduxStateToProps)(withStyles(QuizPage));
