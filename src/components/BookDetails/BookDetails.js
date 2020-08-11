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
import Button from '@material-ui/core/Button';


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
    readButton: {
        // backgroundColor: 'rgba(255, 255, 255, 0.54)',
        // boxShadow: 'inset 0 0 5px white',
        // border: '1px solid black',
        // float: 'center',
        color: 'white',
    },
    button: {
        textAlign: 'center',
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

    finishBook = (item) => {
        this.props.dispatch({ type: 'FINISH_BOOK', payload: item })
    }
    render() {
        const { classes } = this.props;
        const details = this.props.reduxState.details;
        return (
            <div>

                {this.props.reduxState.details.map(item =>

                    <Grid key={item.book_id}
                        container direction="column"
                        justify="center"
                        alignItems="center">
                        <Card
                            variant="outlined"
                            className={classes.card} >
                            <CardActionArea>
                                <Typography
                                    gutterBottom variant="h5" component="h5">
                                    {item.book_title}
                                </Typography>
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    image={item.book_image}
                                    alt={item.book_title} />
                                <CardContent>
                                    <Typography
                                        variant="body2" component="p">
                                        By {item.book_authors}
                                    </Typography>
                                    <hr color="black" />
                                    <Typography
                                        variant="body2" component="p">
                                        {item.book_description}
                                    </Typography>
                                    <hr />
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p">
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <div className={classes.button}>
                            <Button
                                variant="contained" color="primary"
                            ><a className={classes.readButton}
                                href={item.book_text}
                                rel="noopener noreferrer"
                                target="_blank">
                                    Read it!
                </a></Button>

                            {item.finish_quiz === false ?
                                <Button
                                    variant="contained" color="primary"
                                    className={classes.readButton}
                                    onClick={() => {
                                        this.props.history.push('/quiz');
                                    }}>Take the quiz!</Button>
                                : <></>}
                            {item.quiz_score != null ?
                                (<>
                                    <p>{item.quiz_feedback}</p>
                                    <p>{item.quiz_score}</p>
                                </>)
                                : <></>
                            }
                            </div>
                        </Card>
                    </Grid>
                )}
            </div>
        );
    }

}
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(BookDetails)));
