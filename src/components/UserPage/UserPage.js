import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { withStyles } from '@material-ui/core/styles';
import BookListItem from '../BookListItem/BookListItem'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
// import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import IconButton from '@material-ui/core/IconButton';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ListIcon from '@material-ui/icons/List';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import background from '/Users/joelroske/Documents/Prime/prime-solo-project-master/src/images/phonebackground.jpg';
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: 'hidden',
    paddingTop: 0,
    padding: 10,

  },
  border: {
    position: 'relative',
    padding: '2px',
    border: '1px solid silver',
    borderRadius: '20px',
    boxShadow: '10px 30px 20px black',
    width: '40%',
    maxWidth: 400,
    minWidth: 350,
  },
  gridList: {
    // width: 400,
    height: 400,
    margin: 50,
    // paddingBottom: 10,
    border: 'double 40px transparent',
    borderRadius: '20px',
    // outline: '1px solid white',
    boxShadow: 'inset 0 0 9px white',
    backgroundColor: 'black',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    backgroundImage: `linear-gradient(#363636, #363636), radial-gradient(circle at top right, #6d6d6d,black)`,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  tile: {
    // padding: 5,
  },
});

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PROFILE_BOOKS' });
  }

  goToDetails = (item) => {
    this.props.history.push(`/details/${item.book_id}`);
  }

  deleteBook = (item) => {
    this.props.dispatch({ type: 'DELETE_BOOK', payload: item })
  }

  finishBook = (item) => {
    this.props.dispatch({ type: 'FINISH_BOOK', payload: item })
  }

  // This is main user profile
  render() {
    const { classes } = this.props;
    return (
      <>
        <div>
          <h2>{this.props.reduxState.user.username}, here are your books</h2>
          <div className={classes.root}>
            <div className={classes.border}>
              <GridList cellHeight={300} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                  {/* <ListSubheader component="div">Books</ListSubheader> */}
                </GridListTile>

                {this.props.reduxState.profileBooks.map(item => (
                  <GridListTile className={classes.tile}
                    key={item.book_id}>
                    <img src={item.book_image} alt={item.book_title}
                      onClick={() => this.goToDetails(item)}
                    />
                    <GridListTileBar
                      title={item.book_title}
                      subtitle={<span>by: {item.book_authors}</span>}
                      actionIcon={
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <Button className={classes.icon} {...bindTrigger(popupState)}>
                                <ListIcon />
                              </Button>
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={() => this.finishBook(item)}>Finish</MenuItem>
                                <MenuItem onClick={() => this.deleteBook(item)}>Remove</MenuItem>
                              </Menu>
                            </React.Fragment>
                          )}
                        </PopupState>
                        // <IconButton aria-label={`info about ${item.book_title}`} className={classes.icon}>
                        //   <RemoveCircleRoundedIcon onClick={() => this.deleteBook(item)}/>
                        // </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList></div>
          </div>

          {/* 
                  <Typography
                    gutterBottom variant="h5" component="h5">
                    {item.book_title}
                    {item.finish_book === false ?
                  <button
                  onClick={() => this.finishBook(item)}
                  >Finished? Click to Finish!</button>
                  :
                  <h5>Finished!</h5>  
                  }
                  </Typography>
                   <Typography
                    variant="body2" component="p">
                    {item.book_description}
              
        )} */}

          {/* Conditional rendering if user is a teacher
        then button to see class info (link to /teacher) displays */}
          {this.props.reduxState.user.is_teacher ?
            <button onClick={() => {
              this.props.history.push('/teacher');
            }} >
              See Class Info</button>
            : <></>
          }
        </div>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.

// this allows us to use <App /> in index.js
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(UserPage));

