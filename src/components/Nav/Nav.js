import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h1 className="nav-title">Readio  {props.reduxState.user.username}</h1>
    </Link>
    <div className="nav-right">
      <Link  to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.reduxState.user.id ? (<IconButton><img
          src="https://image.flaticon.com/icons/png/512/46/46285.png"
          alt="Profile"
          title="Profile"
          height="30px"
          onClick={() => {
            props.history.push('/home');
          }}
        /></IconButton>) : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.reduxState.user.id && (
        <>
          <Link to="/search">
            <IconButton>
            <img src="https://lh3.googleusercontent.com/proxy/3DvzTlgC3H4AF2p_ofT4zZbmoKj0GYr7H69AZg2tbtqWnPXjq3uWq6kg4Xd7FEIQsOKdnqu34kWCKiZahm5uQpqzUppCAUM"
          alt="Book Search"
          title="Book Search"
          height="30px"  
          onClick={() => {
            props.history.push('/search');
          }}
          />
            </IconButton>
          </Link>
          <LogOutButton/>

        </>
      )}
      {/* Always show this link since the about page is not protected */}
      {/* <Link className="nav-link" to="/about">
        About
      </Link> */}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default (withRouter(connect(mapReduxStateToProps)(Nav)));
