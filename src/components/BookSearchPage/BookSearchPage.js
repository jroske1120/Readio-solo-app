import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BookListItem from '../BookListItem/BookListItem'
import Skeleton from '@material-ui/lab/Skeleton';

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
  root: {
    height: 250,
    width: '30%',
  },
};

class BookSearchPage extends Component {

  state = {
    search: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit:', this.state.search);
    this.props.dispatch({ type: "FETCH_BOOKS", payload: this.state.search })
    this.setState({
      search: ''
    })
  }

  handleChange = (event) => {
    console.log('in search field', event.target.value);
    this.setState({
      search: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form 
          onSubmit={this.handleSubmit}
        >
          <input type="text" onChange={this.handleChange} placeholder="Search"></input>
          <button type="submit">Search</button>
        </form>
        {/* {this.props.reduxState.searchRed} */}
        {this.props.reduxState.search.map((item, index) =>
          <BookListItem
            key={index} item={item} />)}
      </div>
    );
  }

}
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(BookSearchPage));
