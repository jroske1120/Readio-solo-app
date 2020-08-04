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

class BookDetails extends Component {

    componentDidMount() {
        if (!this.props.reduxState.details.book_id) {
            this.props.dispatch({
                type: "FETCH_DETAILS",
                payload: this.props.match.params.id
            })
        } console.log('this.props.reduxState...', this.props.reduxState);
    }

    render() {
        const { classes } = this.props;
        const details = this.props.reduxState.details;
        return (
            <div>
                {JSON.stringify(this.props.match)} <br></br>
                {JSON.stringify(this.props.reduxState.details)}

                <h2>Book details</h2>
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
                                image={details.book_image}
                                alt={details.book_title} />
                            <CardContent>
                                <Typography
                                    gutterBottom variant="h5" component="h5">
                                    {details.book_title}
                                </Typography>
                                <hr color="black" />
                                <Typography
                                    variant="body2" component="p">
                                    {details.book_description}
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
                            href={details.book_text}
                            rel="noopener noreferrer"
                            target="_blank">
                            Read it!
                        </a></button>
                        {/* <button onClick={this.addToProfile}>Add to Profile</button> */}
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

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(BookDetails)));
