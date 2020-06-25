import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LandingPageHeader from "../components/LandingPageHeader";
import LandingPageFooter from "../components/LandingPageFooter";
import LandingPageSignup from "../components/LandingPageSignup";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(5),
  },
  firstRow: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(10),
    },
  },
  header: {
    fontFamily: ["Alegreya Sans", "sans-serif"],
    fontSize: "3rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "4.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "5.5rem",
    },
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
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.h4.fontSize,
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

  return (
    <>
      {/* header */}
      <LandingPageHeader />

      {/* main content */}
      <Container className={classes.container}>
        {/* first row */}
        <Grid className={classes.firstRow} container spacing={3}>
          <Grid item xs={12} md={10}>
            <Typography className={classes.header} variant="h1">
              The fastest way to create and share online courses.
            </Typography>
          </Grid>
          <LandingPageSignup />
        </Grid>

        <Divider className={classes.divider} />

        {/* second row */}
        <Grid className={classes.middleRow} container spacing={6}>
          <Grid className={classes.supportingTextContainer} item xs={12} md={4}>
            <Typography className={classes.supportingText}>
              Use a combination of videos, text, and images to teach new
              material.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.imageContainer} elevation={3}>
              <img src="video.png" alt="video example" width="100%" />
            </Paper>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        {/* third row */}
        <Grid className={classes.middleRow} container spacing={6}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.imageContainer} elevation={3}>
              <img src="multiSelect.png" alt="question example" width="100%" />
            </Paper>
          </Grid>
          <Grid className={classes.supportingTextContainer} item xs={12} md={4}>
            <Typography className={classes.supportingText}>
              Mix-and-match question types to reinforce learning and check
              comprehension.
            </Typography>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        {/* fourth row */}
        <Grid className={classes.middleRow} container spacing={6}>
          <Grid className={classes.supportingTextContainer} item xs={12} md={4}>
            <Typography className={classes.supportingText}>
              Provide feedback so students can learn from their mistakes.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.imageContainer} elevation={3}>
              <img
                src="incorrectAnswer.png"
                alt="incorrect answer"
                width="100%"
              />
            </Paper>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        {/* final row */}
        <Grid className={classes.finalRow} container>
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
              Let's do this!
            </Button>
          </Grid>
        </Grid>

        {/* footer */}
        <LandingPageFooter />
      </Container>
    </>
  );
}
