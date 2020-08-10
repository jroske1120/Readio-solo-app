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


const styles = {
  table: {
    // maxWidth: 650,
    padding: 40,
  },
  container: {
    // minWidth: 650,
    // marginRight: 150, 
  },
};
class TeacherPage extends Component {
  state = {
    quiz_feedback: ' ',
    questiquiz_scoreon_2: ' ',
    
};

submitFeedback = (event) => {
    event.preventDefault();
    console.log(this.state)
    this.props.dispatch({
        type: 'SUBMIT_FEEDBACK',
        payload: {
          quiz_feedback: this.state.quiz_feedback,
            question_2: this.state.questiquiz_scoreon_2,
            // book_id: this.props.reduxState.details[0].book_id,
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
      <div>
        <h1 id="welcome"> </h1>
        <h2>Students will appear here</h2>
        <TableContainer className={classes.container} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell >Username</TableCell>
                <TableCell >Books Read</TableCell>
                <TableCell >Avg. Quiz Score</TableCell>
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
                  <TableCell >{student.books.join(', ')}</TableCell>
                  <TableCell><button
                      onClick={() =>
                        this.viewQuiz(student)}>
                      Grade
                  </button></TableCell>
                  <TableCell >
                    <button
                      onClick={() =>
                        this.removeStudent(student)}>
                      Remove
                  </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <button onClick={() => {
          this.props.history.push('/addstudent');
        }} >
          Add a student!
          </button>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.questions.map((questions, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {questions.book_title}
                  </TableCell>
                  <TableCell >{questions.question_1}</TableCell>
                  <TableCell >{questions.question_2}</TableCell>
                  <TableCell >{questions.question_3}</TableCell>
                  <TableCell >{questions.question_4}</TableCell>
                  <TableCell><textarea
                type="textexttArea"
                name="quiz_feedback"
                value={this.state.quiz_feedback}
                onChange={this.handleInputChangeFor('quiz_feedback')}
              /></TableCell>
                  <TableCell ><input
                type="number"
                name="quiz_score"
                value={this.state.quiz_score}
                onChange={this.handleInputChangeFor('quiz_score')}
              />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(TeacherPage));

