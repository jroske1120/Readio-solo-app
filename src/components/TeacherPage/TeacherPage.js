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
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_STUDENTS' });
    // still need reducer and saga, and router for this
  }

  removeStudent = (student) => {
    this.props.dispatch({ type: 'REMOVE_STUDENT', payload: student })
  }

  // This is main user profile
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 id="welcome"></h1>
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
                  <TableCell>0</TableCell>
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

      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(TeacherPage));

