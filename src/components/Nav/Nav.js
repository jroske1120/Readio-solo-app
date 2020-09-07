import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h1 className="nav-title">READ.IO 
       </h1>
    </Link>
    <div className="nav-right">
     
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.reduxState.user.id ? (
        <IconButton
        onClick={() => {
          props.history.push('/home');
        }}>
          <AccountCircleRoundedIcon
          alt="Profile"
          title="Profile"
          height="30px"
        
        />Profile</IconButton>) : 'Login / Register'}
    
      {/* Show the link to the search page and the logout button if the user is logged in */}
      {props.reduxState.user.id ? (
        <>
          
            <IconButton
            onClick={() => {
              props.history.push('/search');
            }}>
            <SearchRoundedIcon
          alt="Book Search"
          title="Book Search"
          height="30px"  
          
          />Search
            </IconButton>
          <LogOutButton/>

        </>)
        : <></>
      }
      {/* Always show this link since the about page is not protected */}
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
