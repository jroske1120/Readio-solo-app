import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';

const LogOutButton = props => (
  <IconButton>
    <img src="https://cdn.onlinewebfonts.com/svg/img_248752.png"
      alt="Log Out"
      title="Log Out"
      height="30px"
      className={props.className}
      onClick={() => props.dispatch({ type: 'LOGOUT' })}
    />

  </IconButton>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
