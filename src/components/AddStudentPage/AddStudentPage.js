import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

const styles = {
  textField: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    display: "flex",
    alignItems: "center",
  },
};

class AddStudentPage extends Component {
  state = {
    username: '',
    password: '',
    is_teacher: 'false',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.is_teacher) {
      this.props.dispatch({
        type: 'ADD_STUDENT',
        payload: {
          username: this.state.username,
          password: this.state.password,
          is_teacher: this.state.is_teacher,
        },
      });
      this.props.history.push('/teacher');
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  // This is main user profile
  render() {
    const { classes } = this.props;
    return (
      <>
        {this.props.reduxState.user.is_teacher === true ?
        (<div>
          <form>
        <h1 
        onClick={this.fillerAnswers}
        className={classes.textField}>Add a student</h1>
        <div className={classes.textField}>
          <div>
            <label htmlFor="username">
              Username:
              <TextField
                className={classes.textField}
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor("username")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <TextField
                className={classes.textField}
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </label>
          </div>
          <div>
            <Button
              // className={classes.textField}
              onClick={this.registerUser}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </div>
          </div>
        </form>
        <center>
        <Button variant="contained" color="primary"
        onClick={() => {
          this.props.history.push('/teacher');
        }} >
          Back to Teacher Page
          </Button>
        </center>
        
        
        <br></br></div>)
        :
        <div>404</div>}
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(AddStudentPage)));