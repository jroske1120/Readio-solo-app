import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import Fade from 'react-reveal/Fade';

const styles = {
  input: {
    width: '80%',
    margin: 10,
  }
};

class QuizPage extends Component {
  state = {
    question_1: ' ',
    question_2: ' ',
    question_3: ' ',
    question_4: ' ',
    finish_quiz: true
  };

  fillerAnswers = () => {
    this.setState({
      question_1:`I am similar to the main character because I don''t really like to work, and I'll do anything to get out of doing my chores.`,
      question_2: ` The tone of this text is playful. An example of this is in the main character''s sarcasm.`,
      question_3: `If I were the author, I would be more explicit about the racial injustices surrounding Native Americans. `,
      question_4: `This book reminds me of the book, The Lord of the Flies. In that book, the characters demonstrate the two sides of Tom: carefree and reckless or coming of age with a hidden desire to fit in.`,
    });
  }
  submitQuiz = (event) => {
if (this.props.reduxState.details[0] != null){

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
  } else {
    Swal.fire(
      'Oh no!',
      'You have to go back and choose a book!',
      'error'
    )
  }
  } // end submit

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  componentDidMount() {
    // this.props.dispatch({ type: 'FETCH_QUIZ' });
  }

  // This is main user profile
  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* map out books that have been added to server based on id */}
        <h2 onClick={this.fillerAnswers}>Quiz Questions
        {this.props.reduxState.details[0] != null ?
            <span> for {this.props.reduxState.details[0].book_title}</span>
            : <></>
          }

        </h2>
        <Fade left>
        <form>
          {/* <h1>Quiz for {this.props.reduxState.details[0].book_title}</h1> */}
          <div>
            1. How are you similar to or different from one of the characters?<br></br>
            <TextField
              className={classes.input}
              multiline
              rows={3}
              variant="outlined"
              value={this.state.question_1}
              onChange={this.handleInputChangeFor('question_1')}
            />
          </div>
          <div>
            2. Discuss the tone and of this text, citing specific examples.<br></br>
            <TextField
              className={classes.input}
              multiline
              rows={3}
              variant="outlined"
              value={this.state.question_2}
              onChange={this.handleInputChangeFor('question_2')}
            />
          </div>
          <div>
            3. What changes would you make if you were the author? Why would you make these changes?
              <br></br><TextField
              className={classes.input}
              multiline
              rows={3}
              variant="outlined"
              value={this.state.question_3}
              onChange={this.handleInputChangeFor('question_3')}
            />
          </div>
          <div>
            4. Connect this text to another text you have read. Be specific!
             <br></br> <TextField
              className={classes.input}
              multiline
              rows={3}
              variant="outlined"
              value={this.state.question_4}
              onChange={this.handleInputChangeFor('question_4')}
            />
          </div>
          <div>
          <Button 
          variant="contained" color="primary"
          onClick={this.submitQuiz}>Submit</Button>
          </div>
          
        </form>
        </Fade>
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
