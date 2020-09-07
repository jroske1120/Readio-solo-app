import React, { Component } from "react";
import { connect } from "react-redux";
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

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push("/");
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <center>
          <form className="welcome-form">
            <h2>Welcome to Readio!</h2>
            <p>
            Readio is a full stack web application built for my solo project
              with Prime Digital Academy. The inspiration for it comes from teaching. 
              As an educator, I noticed that much of the reading software used
              in our schools is either too complex for students or too expensive
              for schools.
            </p>
            <p>
              Readio harnesses the power of Google
              Books' API to give students access to books that they can read,
              rate, and take quizzes on. Register as a teacher to see students
              in your class and grade their quizzes!
            </p>
            <p>
              If you have any questions, or something isn't working, please
              reach out to me at joel.j.roske@gmail.com.
            </p>
            <p>-Joel Roske</p>
          </form>
          {this.props.errors.loginMessage && (
            <h2 className="alert" role="alert">
              {this.props.errors.loginMessage}
            </h2>
          )}
          <form>
            <h1 className={classes.textField}>Login</h1>
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
                  onClick={this.login}
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </div>
            </div>
          </form>

          <Button
            variant="contained"
            // color="primary"
            // className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
