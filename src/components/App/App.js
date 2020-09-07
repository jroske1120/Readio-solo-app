import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import UserPage from '../UserPage/UserPage';
import BookSearchPage from '../BookSearchPage/BookSearchPage'
import QuizPage from '../QuizPage/QuizPage'
import TeacherPage from '../TeacherPage/TeacherPage'
import AddStudentPage from '../AddStudentPage/AddStudentPage'
import BookDetails from '../BookDetails/BookDetails'
import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            
            <ProtectedRoute
              exact path="/search"
              component={BookSearchPage}
            />
            <ProtectedRoute
              exact path="/quiz"
              component={QuizPage}
            />
            <ProtectedRoute
              exact path="/teacher"
              component={TeacherPage}
            />
            <ProtectedRoute
              exact path="/addstudent"
              component={AddStudentPage}
            />
            <ProtectedRoute
              exact path="/details/:id"
              component={BookDetails}
            />  
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
