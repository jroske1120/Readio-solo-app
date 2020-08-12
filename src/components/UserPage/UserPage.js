import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { withStyles } from '@material-ui/core/styles';
import BookDetails from '../BookDetails/BookDetails'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

const styles = (theme) => ({
  flex: {
    display: 'flex',
    margin: 50,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  root: {
    // display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 0,
    padding: 10,
  },
  border: {
    display: 'flex',
    position: 'relative',
    padding: '2px',
    border: '1px solid silver',
    borderRadius: '20px',
    boxShadow: '-3px 3px 10px black',
    width: '40%',
    maxWidth: 400,
    minWidth: 350,
  },
  gridList: {
    // width: 400,
    height: 400,
    margin: 50,
    border: 'double 40px transparent',
    borderRadius: '20px',
    boxShadow: 'inset 0 0 9px white',
    backgroundColor: 'black',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    backgroundImage: `linear-gradient(#363636, #363636), radial-gradient(circle at top right, #6d6d6d,black)`,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
    padding: 3,
  },
  button: {
    margin: 50,
    textAlign: 'center',
  },
});

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PROFILE_BOOKS' });
  }

  goToDetails = (item) => {
    this.props.dispatch({
      type: "FETCH_DETAILS",
      payload: item.book_id
  })  }

  deleteBook = (item) => {
    Swal.fire({
      title: 'Are you sure you want to return this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, return!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Returned!',
          '',
          'success',
        )
        this.props.dispatch({ type: 'DELETE_BOOK', payload: item });
      }    
    })
  }

  finishBook = (item) => {
    this.props.dispatch({ type: 'FINISH_BOOK', payload: item })
    let timerInterval
    Swal.fire({
      title: 'Congratulations!',
      html: 'You finished the book!',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  // This is main user profile
  render() {
    const { classes } = this.props;
    return (
        <div className={classes.flex}>
          <div className={classes.root}>
            <div className={classes.border}>
              <GridList 
              cols={2}
              cellHeight={200} 
              className={classes.gridList}>
              
                {this.props.reduxState.profileBooks.map(item => (
                  <GridListTile className={classes.tile}
                    key={item.book_id}>
                    <img src={item.book_image} alt={item.book_title}
                      onClick={() => this.goToDetails(item)}
                    />
                    <GridListTileBar
                      actionIcon={
                        <>
                          {item.finish_book === false ?
                            (<IconButton className={classes.icon}
                              onClick={() => this.finishBook(item)}>
                              <CheckBoxOutlineBlankIcon />
                            </IconButton>)
                            :
                            (<IconButton className={classes.icon}>
                              <CheckBoxRoundedIcon />
                            </IconButton>
                            )
                          }
                          <IconButton aria-label={`Delete this book`} className={classes.icon}>
                            <IndeterminateCheckBoxIcon onClick={() => this.deleteBook(item)} />
                          </IconButton>
                        </>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
              </div>
              {this.props.reduxState.user.is_teacher ?
           <div className={classes.button}>
              <Button 
            variant="contained" color="primary"
            onClick={() => {
              this.props.history.push('/teacher');
            }} >
              See Class Info</Button>
              </div>
            : <></>
          }
          {/* {this.props.reduxState.user.is_teacher && 
          this.props.reduxState.profileBooks != null ?
          
        :<></>
        } */}
          </div> 
         {this.props.reduxState.details != null ?
          <BookDetails/>
        :
        <></>}
        </div>
    );
  }
}
// this allows us to use <App /> in index.js
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(UserPage));

