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

class BookListItem extends Component {

    //this.state.user.id
    addToProfile = (event) => {
        console.log('book to add...', {...this.props.item})
        this.props.dispatch({ type: 'ADD_BOOK', payload: {...this.props.item}})
        this.props.history.push('/home');
    }
    goToDetails = () => {
        // calls SET_DETAILS (details reducer) with 
        //payload of the selected movie's details
        this.props.dispatch({ type: 'SET_DETAILS', payload: { ...this.props.item } })
        //Then pushes history and brings us to the selected movies' details
        this.props.history.push('/details');
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid
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
                                image={this.props.item.volumeInfo.imageLinks.thumbnail}
                                alt={this.props.item.volumeInfo.title} />
                            <CardContent>
                                <Typography
                                    gutterBottom variant="h5" component="h5">
                                    {this.props.item.volumeInfo.title}
                                </Typography>
                                <hr color="black" />
                                <Typography
                                    variant="body2" component="p">
                                    {this.props.item.volumeInfo.description}
                                </Typography>
                                <hr />
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p">
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <button><a
                            href={this.props.item.accessInfo.webReaderLink}
                            rel="noopener noreferrer"
                            target="_blank">
                            Read it!
                        </a></button>
                        <button onClick={this.addToProfile}>Add to Profile</button>
                        {/* <button onClick={this.goToDetails}>See details</button> */}
                    </Card>
                </Grid>
            </div>
        );
    }

}
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(BookListItem)));
