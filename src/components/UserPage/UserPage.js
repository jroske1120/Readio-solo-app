import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { withStyles } from '@material-ui/core/styles';
import BookListItem from '../BookListItem/BookListItem'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    width: 350,
    padding: 10,
    margin: 40,
    justifyContent: 'center',
    backgroundColor: 'silver',
  },
  media: {
    height: 250,
    width: 'auto',
    marginLeft: 85
  },
};

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PROFILE_BOOKS' });
  }

  goToDetails = (item) => {
    console.log('in details...', item)
    this.props.history.push(`/details/${item.book_id}`);
  }

  deleteBook = (item) => {
    console.log('item is...', item)
    this.props.dispatch({type: 'DELETE_BOOK', payload: item})
  }

  finishBook = (item) => {
    console.log('item is...', item)
    this.props.dispatch({type: 'FINISH_BOOK', payload: item})
  }
  // This is main user profile
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.reduxState.user.username}!</h1>
        <p>Your ID is: {this.props.reduxState.user.id}</p>
        <button onClick={() => {
          this.props.history.push('/search');
        }} >
          Search for a Book!
          </button>
        {/* map out books that have been added to server based on id WHERE user.id === user.id*/}
        {/* {JSON.stringify(this.props.match.params)} */}

        <h2>Books that you add will show here below</h2>
        {this.props.reduxState.profileBooks.map(item =>

          <Grid
            key={item.book_id}
            container direction="column"
            justify="center"
            alignItems="center">
            <Card
              variant="outlined"
              className={classes.card} >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={item.book_image}
                  alt={item.book_title} />
                <CardContent>
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
                  {/* <hr color="black" /> */}
                  {/* <Typography
                    variant="body2" component="p">
                    {item.book_description}
                  </Typography> */}
                  <hr />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                  </Typography>
                </CardContent>
              </CardActionArea>
              <button><a
                href={item.book_text}
                rel="noopener noreferrer"
                target="_blank">
                Read it!
                        </a></button>
              <button onClick={() => this.deleteBook(item)}>Remove from Profile</button>
              <button onClick={() => this.goToDetails(item)}>See details</button>
            </Card>
          </Grid>
        )}
        <br></br>
        <LogOutButton className="log-in" />
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
    );
  }
}

// Instead of taking everything from state, we just want the user info.

// this allows us to use <App /> in index.js
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(UserPage));

