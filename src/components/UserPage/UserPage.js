import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Rating from "material-ui-rating";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Fade from 'react-reveal/Fade';

const styles = (theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 1),
  },
  heroButtons: {
    marginTop: theme.spacing(4, 0, 1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "-3px 3px 10px black",
    justifyContent: "center",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    backgroundSize: "auto",
    margin: 5,
    textAlign: "center",
  },
  cardContent: {
    flexGrow: 1,
    textAlign: "center",
  },
  centerBtns: {
    justifyContent: "center",
  },
  popup: {
    width: 500,
    height: "auto",
    textAlign: "center",
  },
  readButton: {
    color: 'white',
    textDecoration: 'none',
},
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
    padding: 3,
  },
});

class UserPage extends Component {
  state = {
    student_rating: 0,
  };

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_PROFILE_BOOKS" });
  }

  goToDetails = (item) => {
    this.props.dispatch({
      type: "FETCH_DETAILS",
      payload: item.book_id,
    });
    this.props.history.push("/quiz");
  };

  deleteBook = (item) => {
    Swal.fire({
      title: "Are you sure you want to remove this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Removed!", "", "success");
        this.props.dispatch({ type: "DELETE_BOOK", payload: item });
      }
    });
  };

  rateBook = (student_rating, item) => {
this.props.dispatch({
      type: "RATE_BOOK",
      payload: { item, student_rating },
    });
  };

  finishBook = (item) => {
    this.props.dispatch({ type: "FINISH_BOOK", payload: item });
    let timerInterval;
    Swal.fire({
      title: "Congratulations!",
      html: "You finished the book!",
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  };

  // This is main user profile
  render() {
    const { classes } = this.props;
    const store = this.props.reduxState;

    return (
      <main>
        <div className={classes.heroContent}>
          <Container 
          maxWidth="lg"
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {store.user.id ? (
                <span>Hi, {store.user.username}, here are your books!</span>
              ) : (
                <span>Log in to see books!</span>
              )}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              This is your profile page. You can see the books on your shelf, or
              remove them if you like. You can also click to see the book's
              details, rate it, and take its quiz. Enjoy!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                {this.props.reduxState.user.is_teacher ? (
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.props.history.push("/teacher");
                      }}
                    >
                      See Class Info
                    </Button>
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.props.history.push("/search");
                    }}
                  >
                    Search for Books
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Fade up>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {store.profileBooks.map((item) => (
              <Grid item key={item.book_id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.book_image}
                    title={item.book_title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.book_title}
                    </Typography>

                    <Rating
                      name="student_rating"
                      value={item.student_rating}
                      onChange={(student_rating) =>
                        this.rateBook(student_rating, item)
                      }
                      precision={1}
                    />
                  </CardContent>
                  <div className={classes.centerBtns}>
                    <CardActions className={classes.centerBtns}>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => this.finishBook(item)}
                      >
                        Finish
                      </Button>
                      {/* <Button size="small" color="primary"
                     onClick={() => this.goToDetails(item)}>
                       View Details
                     </Button> */}

                      <PopupState variant="popover">
                        {(popupState) => (
                          <div>
                            <Button
                              // size="small"
                              variant="contained"
                              color="primary"
                              {...bindTrigger(popupState)}
                            >
                              Details
                            </Button>
                            <Popover
                              {...bindPopover(popupState)}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                            >
                              <Box p={2} className={classes.popup}>
                                <>
                                  <h3>{item.book_title}</h3>
                                  <p>{item.book_authors}</p>
                                  <img src={item.book_image} alt={item.book_title} />
                                  <p>{item.book_description}</p>
                                  <Button variant="contained" color="primary">
                                    <a
                                      className={classes.readButton}
                                      href={item.book_text}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      Read it!
                                    </a>
                                  </Button>
                                  {item.finish_book === true ? (
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      className={classes.readButton}
                                      onClick={() => this.goToDetails(item)}
                                    >
                                      Take the quiz!
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="disabled"
                                      color="primary"
                                      className={classes.readButton}
                                    >
                                      Finish to take quiz!
                                    </Button>
                                  )}
                                  {item.quiz_score != null ? (
                                    <>
                                      <p>
                                        Teacher feedback on your quiz:{" "}
                                        <i>{item.quiz_feedback}</i>
                                      </p>
                                      <p>
                                        Your score for {item.book_title}:{" "}
                                        <b>{item.quiz_score}</b>
                                      </p>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              </Box>
                            </Popover>
                          </div>
                        )}
                      </PopupState>

                      <Button
                        onClick={() => this.deleteBook(item)}
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <div>
          {/* {this.props.reduxState.details != null ?
          <BookDetails/>
        :
        <></>} */}
        </div>
        </Fade>
      </main>
      
    );
  }
}
// this allows us to use <App /> in index.js
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withStyles(styles)(UserPage));
