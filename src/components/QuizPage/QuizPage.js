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
                <form>
                    {this.props.reduxState.questions.map((item, index) => (
                       <p key={index}> <label htmlFor='question_1'>{item.question_1}</label>
                        <input type="text" name="question_1"/>
                   </p> ))}
                </form>
                {/* {this.props.reduxState.questions.map(item =>
                    <ol> <li>{item.question_1}</li>
                    <input />
                        <li>{item.question_2}</li>
                        <li>{item.question_3}</li>
                        <li>{item.question_4}</li> </ol>
                )} */}
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the user info.

// this allows us to use <App /> in index.js
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(QuizPage));
