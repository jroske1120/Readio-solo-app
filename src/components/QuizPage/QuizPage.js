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
import { withRouter } from 'react-router-dom';

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

class QuizPage extends Component {
    state = {
        question_1: ' ',
        question_2: ' ',
        question_3: ' ',
        question_4: ' ',
        finish_quiz: true
    };

    submitQuiz = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.props.dispatch({
            type: 'SUBMIT_QUIZ',
            payload: {
                question_1: this.state.question_1,
                question_2: this.state.question_2,
                question_3: this.state.question_3,
                question_4: this.state.question_3,
                finish_quiz: this.state.finish_quiz,
                book_id: this.props.reduxState.details[0].book_id,
            },
            
        });
        this.props.history.push('/');
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_QUIZ' });
    }

    // This is main user profile
    render() {
        const question = this.props.reduxState.questions;
        return (
            <div>
                <h1 id="welcome">Quiz Page!</h1>

                {/* map out books that have been added to server based on id */}
                <h2>Quiz Questions will appear here</h2>
                <form onSubmit={this.submitQuiz}>
          {/* <h1>Quiz for {this.props.reduxState.details[0].book_title}</h1> */}
          <div>
            <label htmlFor="question_1">
              1: Question 1
              <input
                type="text"
                name="question_1"
                value={this.state.question_1}
                onChange={this.handleInputChangeFor('question_1')}
              />
            </label>
          </div>
          <div>
          <label htmlFor="question_2">
              2: Question 2
              <input
                type="text"
                name="question_2"
                value={this.state.question_2}
                onChange={this.handleInputChangeFor('question_2')}
              />
            </label>
          </div>
          <div>
          <label htmlFor="question_3">
              3: Question 3
              <input
                type="text"
                name="question_3"
                value={this.state.question_3}
                onChange={this.handleInputChangeFor('question_3')}
              />
            </label>
          </div>
          <div>
          <label htmlFor="question_4">
              4: Question 4
              <input
                type="text"
                name="question_4"
                value={this.state.question_4}
                onChange={this.handleInputChangeFor('question_4')}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
        </form>
                {/* <form>
                    {this.props.reduxState.questions.map((item, index) => (
                        <p key={index}> <label htmlFor='question_1'>{item.question_1}</label>
                            <input type="text" name="question_1" />
                        </p>))}
                </form> */}
                
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the user info.

// this allows us to use <App /> in index.js
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(QuizPage)));
