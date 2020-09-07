import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import FadeIn from 'react-fade-in';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  heroContent: {
    marginTop: 20,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 1),
  },
  contain: {
    margin: 20,
  },
  table: {
    padding: 10,
  },
  container: {
    marginBottom: 10,
    boxShadow: "-3px 3px 10px black",
  },
  unscored: {
    backgroundColor: "yellow",
  },
  button: {
    marginTop: 10,
    textAlign: "center",
  },
  feedback: {
    width: 250,
  },
  tableHead: {
    fontWeight: 700,
  },
});
class TeacherPage extends Component {
  state = {
    quiz_feedback: " ",
    quiz_score: " ",
  };

  submitFeedback = (questions) => {

    this.props.dispatch({
      type: "SUBMIT_FEEDBACK",
      payload: {
        quiz_feedback: this.state.quiz_feedback,
        quiz_score: this.state.quiz_score,
        user_id: this.props.reduxState.questions[0].user_id,
        book_id: questions.book_id,
      },
    });
    this.props.dispatch({ type: "FETCH_STUDENTS" });
  }; 

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_STUDENTS" });
  }

  removeStudent = (student) => {
    Swal.fire({
      title: "Are you sure you want to remove this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove.",
    }).then((result) => {
      if (result.value) {
        Swal.fire(`${student.username} was removed!`, "", "success");
        this.props.dispatch({ type: "REMOVE_STUDENT", payload: student });
      }
    });
  };

  submitFeedback = (questions) => {
    this.props.dispatch({
      type: "SUBMIT_FEEDBACK",
      payload: {
        quiz_feedback: this.state.quiz_feedback,
        quiz_score: this.state.quiz_score,
        user_id: this.props.reduxState.questions[0].user_id,
        book_id: questions.book_id,
      },
    });
    this.props.dispatch({ type: "FETCH_STUDENTS" });
  }; 

  viewQuiz = (student) => {
    this.props.dispatch({ type: "FETCH_QUIZZES", payload: student });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
      <FadeIn>
      <div className={classes.heroContent}>
          <Container 
          maxWidth="md"
          >
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              This is your teacher page. Here is where you can grade students, and adjust your roster by adding or removing students.
            </Typography>
            </Container>
            </div>
            <div className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.props.history.push("/addstudent");
                }}
              >
                <PersonAddRoundedIcon />
                Add a student!
              </Button>
            </div>
        {this.props.reduxState.user.is_teacher === true ? (
          <div className={classes.contain}>
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead >
                  <TableRow >
                    <TableCell className={classes.tableHead}>ID</TableCell>
                    <TableCell className={classes.tableHead}>Username</TableCell>
                    <TableCell className={classes.tableHead}>Books Read</TableCell>
                    <TableCell className={classes.tableHead}>Avg. Quiz</TableCell>
                    <TableCell className={classes.tableHead}>Grade</TableCell>
                    <TableCell className={classes.tableHead}>Remove Student</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.reduxState.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell component="th" scope="row">
                        {student.id}
                      </TableCell>
                      <TableCell>{student.username}</TableCell>
                      {student.books === null ? (
                        <TableCell></TableCell>
                      ) : (
                        <TableCell>{student.books.join(", ")}</TableCell>
                      )}

                      <TableCell>{student.avg}</TableCell>
                      <TableCell>
                        {student.grade === null ?
                      <Button
                      variant="contained"
                      // color="disabled"
                    >
                      Grade
                    </Button>  
                      :
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={() => this.viewQuiz(student)}
                        >
                          Grade
                        </Button>
                      }
                        
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.removeStudent(student)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
           
            {/* map out books that have been added to server based on id */}
<FadeIn>
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                {this.props.reduxState.questions.length > 0 ? (
                  <TableHead>
                    <TableRow >
                      <TableCell className={classes.tableHead}>Book Title</TableCell>
                      <TableCell className={classes.tableHead}>Question 1</TableCell>
                      <TableCell className={classes.tableHead}>Question 2</TableCell>
                      <TableCell className={classes.tableHead}>Question 3</TableCell>
                      <TableCell className={classes.tableHead}>Question 4</TableCell>
                      <TableCell className={classes.tableHead}>Quiz Feedback</TableCell>
                      <TableCell className={classes.tableHead}>Quiz Score</TableCell>
                      <TableCell className={classes.tableHead}>Submit Score</TableCell>
                    </TableRow>
                  </TableHead>
                ) : (
                  <></>
                )}
                <TableBody>
                  {this.props.reduxState.questions.map((questions) => (
                    <TableRow key={questions.book_id}>
                      <TableCell component="th" scope="row">
                        {questions.book_title}
                      </TableCell>
                      <TableCell>{questions.question_1}</TableCell>
                      <TableCell>{questions.question_2}</TableCell>
                      <TableCell>{questions.question_3}</TableCell>
                      <TableCell>{questions.question_4}</TableCell>
                      <TableCell>
                        <TextField
                          className={classes.feedback}
                          variant="filled"
                          label="Teacher Feedback"
                          multiline
                          rows={2}
                          name="quiz_feedback"
                          value={questions.quiz_feedback}
                          onChange={this.handleInputChangeFor("quiz_feedback")}
                        />
                      </TableCell>
                      {questions.quiz_score === null ? (
                        <TableCell>
                          <TextField
                            label="Score"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            className={classes.unscored}
                            type="number"
                            name="quiz_score"
                            value={questions.quiz_score}
                            onChange={this.handleInputChangeFor("quiz_score")}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <TextField
                            label="Score"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="number"
                            name="quiz_score"
                            value={questions.quiz_score}
                            onChange={this.handleInputChangeFor("quiz_score")}
                          />
                        </TableCell>
                      )}
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => this.submitFeedback(questions)}
                        >
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </FadeIn>
          </div>
        ) : (
          <div>404</div>
        )}{" "}
        </FadeIn>
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withStyles(styles)(TeacherPage));
