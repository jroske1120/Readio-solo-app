import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BookListItem from '../BookListItem/BookListItem'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    marginLeft: 85,
  },
  root: {
    height: 250,
    width: '30%',
  },
  textField: {
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
  },
};

class BookSearchPage extends Component {

  state = {
    search: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "FETCH_BOOKS", payload: this.state.search })
    this.setState({
      search: ''
    })
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.textField}
          onSubmit={this.handleSubmit}
        >
          <TextField className={classes.textField}
            type="text"
            onChange={this.handleChange} placeholder="Search for a book!"></TextField>
          <Button className={classes.textField}
            variant="contained" color="primary"
            type="submit">
            Search
             </Button>
        </form>
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
