import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';

const styles = {
  contain: {
    margin: 40,
  },
  table: {
    padding: 10,
  },
  container: {
    marginBottom: 150,
    boxShadow: '-3px 3px 10px black',
    },
  unscored: {
    backgroundColor: 'yellow',
  },
  button: {
    marginBottom: 50,
    textAlign: 'center',
  },
};
class TeacherPage extends Component {
  state = {
    quiz_feedback: ' ',
    quiz_score: ' ',
  };

  submitFeedback = (questions) => {
    // event.preventDefault();
    console.log('state is..', this.state)
    console.log('questions are,', questions)
    this.props.dispatch({
      type: 'SUBMIT_FEEDBACK',
      payload: {
        quiz_feedback: this.state.quiz_feedback,
        quiz_score: this.state.quiz_score,
        user_id: this.props.reduxState.questions[0].user_id,
        book_id: questions.book_id,
      },
    });
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_STUDENTS' });
    // still need reducer and saga, and router for this
  }

  removeStudent = (student) => {
    this.props.dispatch({ type: 'REMOVE_STUDENT', payload: student })
  }
  viewQuiz = (student) => {
    this.props.dispatch({ type: 'FETCH_QUIZZES', payload: student })
  }
  // This is main user profile
  render() {
    const { classes } = this.props;
    return (
      <>
        {this.props.reduxState.user.is_teacher === true ?
          (<div className={classes.contain}>
            <h1 id="welcome"> </h1>
            <h2>See how your class is doing</h2>
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell >Username</TableCell>
                    <TableCell >Books Read</TableCell>
                    <TableCell >Avg. Quiz</TableCell>
                    <TableCell >Grade</TableCell>
                    <TableCell >Remove Student</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.reduxState.students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell component="th" scope="row">
                        {student.id}
                      </TableCell>
                      <TableCell >{student.username}</TableCell>
                      {student.books === null ?
                        <TableCell></TableCell>
                        :
                        <TableCell >{student.books.join(', ')}</TableCell>}

                      <TableCell>{student.avg}
                      </TableCell>
                      <TableCell><Button
                        variant="contained" color="primary"
                        onClick={() =>
                          this.viewQuiz(student)}>
                        Grade
                  </Button></TableCell>
                      <TableCell >
                        <Button
                          variant="contained" color="secondary"
                          onClick={() =>
                            this.removeStudent(student)}>
                          Remove
                  </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={classes.button}>
              <Button
                variant="contained" color="primary"
                onClick={() => {
                  this.props.history.push('/addstudent');
                }}>
                <PersonAddRoundedIcon />
          Add a student!
          </Button>
            </div>
            {/* map out books that have been added to server based on id */}
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >Book Title</TableCell>
                    <TableCell >Question 1</TableCell>
                    <TableCell >Question 2</TableCell>
                    <TableCell >Question 3</TableCell>
                    <TableCell >Question 4</TableCell>
                    <TableCell >Quiz Feedback</TableCell>
                    <TableCell >Quiz Score</TableCell>
                    <TableCell >Submit Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.reduxState.questions.map((questions) => (
                    <TableRow key={questions.book_id}>
                      <TableCell component="th" scope="row">
                        {questions.book_title}
                      </TableCell>
                      <TableCell >{questions.question_1}</TableCell>
                      <TableCell >{questions.question_2}</TableCell>
                      <TableCell >{questions.question_3}</TableCell>
                      <TableCell >{questions.question_4}</TableCell>
                      <TableCell><TextField
                                  id="filled-multiline-static"
                                  variant="filled"
                        label="Teacher Feedback"
                        multiline
                        rows={2}
                        name="quiz_feedback"
                        value={questions.quiz_feedback}
                        onChange={this.handleInputChangeFor('quiz_feedback')}
                      /></TableCell>
                      {questions.quiz_score === null ? (
                        <TableCell ><TextField
                          label="Score"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className={classes.unscored}
                          type="number"
                          name="quiz_score"
                          value={questions.quiz_score}
                          onChange={this.handleInputChangeFor('quiz_score')}
                        /></TableCell>)
                        :
                        (<TableCell ><TextField
                          label="Score"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="number"
                          name="quiz_score"
                          value={questions.quiz_score}
                          onChange={this.handleInputChangeFor('quiz_score')}
                        /></TableCell>)}
                      <TableCell>
                        <Button variant="contained" color="secondary"
                          onClick={() => this.submitFeedback(questions)}>
                          Submit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </div>)
          :
          <div>404</div>} </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(TeacherPage));

