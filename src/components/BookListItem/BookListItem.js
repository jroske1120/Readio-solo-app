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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    card: {
        width: '70%',
        padding: 10,
        margin: 40,
        justifyContent: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '-3px 3px 10px black',
        borderRadius: 5,
    },
    media: {
        height: 250,
        width: 'auto',
        marginLeft: 85
    },
    descr: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        width: '100%',
        borderRadius: '2px',
    },
    readButton: {
        color: 'white',
        border: '1px solid black',
        float: 'left',
        marginLeft: '5%',
    },
    addButton: {
        border: '1px solid black',
        float: 'right',
        marginRight: '5%',
    },
    acc: {
        borderRadius: '5px',
    },
    urlButton: {
        color: 'white',
    },
});

class BookListItem extends Component {

    //this.state.user.id
    addToProfile = (event) => {
        console.log('book to add...', { ...this.props.item })
        this.props.dispatch({ type: 'ADD_BOOK', payload: { ...this.props.item } })
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
                    elevation={3}
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
                                <Accordion className={classes.acc}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.descr}>
                                            <b>What is this book about?</b>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {this.props.item.volumeInfo.description}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                {/* <hr color="black" />
                                <Typography
                                    variant="body2" component="p">
                                    {this.props.item.volumeInfo.description}
                                </Typography>
                                <hr /> */}
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p">
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Button
                            className={classes.readButton}
                            variant="contained" color="primary"
                        ><a className={classes.urlButton}
                            href={this.props.item.accessInfo.webReaderLink}
                            rel="noopener noreferrer"
                            target="_blank">
                                Read it!
                        </a></Button>
                        <Button
                            variant="contained" color="primary"
                            className={classes.addButton}
                            onClick={this.addToProfile}>Add to Profile</Button>
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
