import React from "react";
// import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import LandingPageHeader from "./LandingPageHeader";
import LandingPageFooter from "./LandingPageFooter";
import LandingPageSignup from "./LandingPageSignup";
// import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  firstRow: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(10),
    },
  },
  header: {
    fontFamily: ["Alegreya Sans", "sans-serif"],
    // https://css-tricks.com/books/fundamental-css-tactics/scale-typography-screen-size/
    fontSize: "calc(35px + (75 - 35) * ((100vw - 300px) / (1600 - 300)))",
  },
  middleRow: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(10),
    },
  },
  imageContainer: {
    backgroundColor: "inherit",
  },
  supportingTextContainer: {
    display: "flex",
    alignItems: "center",
  },
  supportingText: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  finalRow: {
    textAlign: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(10),
    },
  },
  divider: {
    width: "40%",
    margin: theme.spacing(5, "auto"),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    marginTop: theme.spacing(1),
    fontSize: "1.1rem",
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  // const [user, userLoading] = useContext(UserContext);

  // // return null if auth is still loading
  // if (userLoading) return null;

  return (
    <>
      {/* {user ? (
        <Redirect to={`/dashboard/${user.uid}`} />
      ) : (
        <> */}
          {/* header */}
          <LandingPageHeader />

          {/* main content */}
          <Container>
            {/* first row */}
            <Grid className={classes.firstRow} container spacing={3}>
              <Grid item xs={12} md={9}>
                <Typography className={classes.header} variant="h1">
                  The fastest way to create online courses and quizzes.
                </Typography>
              </Grid>
              <LandingPageSignup />
            </Grid>

            <Divider className={classes.divider} />

            {/* second row */}
            <Grid className={classes.middleRow} container spacing={6}>
              <Grid
                className={classes.supportingTextContainer}
                item
                xs={12}
                md={4}
              >
                <Typography className={classes.supportingText}>
                  Create courses and quizzes that render beautifully on any
                  device.
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper className={classes.imageContainer} elevation={0}>
                  <img
                    src="laptop-mobile-screenshots.png"
                    alt="laptop and mobile screenshots"
                    width="100%"
                  />
                </Paper>
              </Grid>
            </Grid>

            <Divider className={classes.divider} />

            {/* third row */}
            <Grid className={classes.middleRow} container spacing={6}>
              <Grid item xs={12} md={8}>
                <Paper className={classes.imageContainer} elevation={3}>
                  <img src="video.png" alt="video example" width="100%" />
                </Paper>
              </Grid>
              <Grid
                className={classes.supportingTextContainer}
                item
                xs={12}
                md={4}
              >
                <Typography className={classes.supportingText}>
                  Embed videos, text, images and documents to teach new
                  material.
                </Typography>
              </Grid>
            </Grid>

            <Divider className={classes.divider} />

            {/* fourth row */}
            <Grid className={classes.middleRow} container spacing={6}>
              <Grid
                className={classes.supportingTextContainer}
                item
                xs={12}
                md={4}
              >
                <Typography className={classes.supportingText}>
                  Mix-and-match question types to reinforce learning and check
                  comprehension.
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper className={classes.imageContainer} elevation={3}>
                  <img
                    src="multiSelect.png"
                    alt="question example"
                    width="100%"
                  />
                </Paper>
              </Grid>
            </Grid>

            <Divider className={classes.divider} />

            {/* fifth row */}
            <Grid className={classes.middleRow} container spacing={6}>
              <Grid item xs={12} md={8}>
                <Paper className={classes.imageContainer} elevation={3}>
                  <img
                    src="incorrectAnswer.png"
                    alt="incorrect answer"
                    width="100%"
                  />
                </Paper>
              </Grid>
              <Grid
                className={classes.supportingTextContainer}
                item
                xs={12}
                md={4}
              >
                <Typography className={classes.supportingText}>
                  Provide feedback so students can learn from their mistakes.
                </Typography>
              </Grid>
            </Grid>

            <Divider className={classes.divider} />

            {/* final row */}
            {/* <Grid className={classes.finalRow} container>
              <Grid item xs={12}>
                <Typography className={classes.supportingText} gutterBottom>
                  Ready to get started for free?
                </Typography>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Sign up now
                </Button>
              </Grid>
            </Grid> */}

            {/* footer */}
            <LandingPageFooter />
          </Container>
        {/* </>
      )} */}
    </>
  );
}
