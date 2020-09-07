import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  textField: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    display: "flex",
    alignItems: "center",
  },
};

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    is_teacher: 'false',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.is_teacher) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          is_teacher: this.state.is_teacher,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
              <center>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form>
          <h1
           className={classes.textField}
           >Register User</h1>
          <div
           className={classes.textField}>
             <div>
            <label htmlFor="username">
              Username:
              <TextField
               className={classes.textField}
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
            </div>
          </div>
          <br/>

          <div>
            <label htmlFor="password">
              Password:
              <TextField
               className={classes.textField}
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <br/>
          <div>
            <label htmlFor="is_teacher">
              Are you a teacher?
              <select 
              
              onChange={this.handleInputChangeFor('is_teacher')}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
              {/* <input
                type="is_teacher"
                name="is_teacher"
                value={this.state.is_teacher}
                onChange={this.handleInputChangeFor('is_teacher')}
              /> */}
            </label>
          </div>
          <br/>

          <div>
            <Button
            onClick={this.registerUser}
            variant="contained"
            color="primary"
            >Register
            </Button>
          </div>
        </form>
  
          <Button
                      variant="contained"
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));

