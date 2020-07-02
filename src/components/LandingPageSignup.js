import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { addNewUserToFirebase } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.1rem",
  },
  formHeader: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
}));

// const encode = (data) => {
//   return Object.keys(data)
//     .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&");
// };

export default function LandingPageSignup() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewUserToFirebase(email, password);
  };

  // const handleSubmit = (e) => {
  //   // create course
  //   const fullName = (inputs.firstName + " " + inputs.lastName).trim();
  //   const newCourse = createCourse(fullName);
  //   saveCourseToFirestore(newCourse)
  //     .then((docRef) => setCourseId(docRef.id))
  //     .catch((error) =>
  //       console.error("Error saving course to Firestore: ", error)
  //     );

  //   // send netlify form data
  //   fetch("/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: encode({ "form-name": "signup", ...inputs }),
  //   }).catch((error) =>
  //     console.error("Error sending form data to Netlify: ", error)
  //   );

  //   e.preventDefault();
  // };

  return (
    <Grid item xs={12} md={6}>
      <Typography className={classes.formHeader}>
        Sign up now to create your first course or quiz for free.
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          className={classes.submitButton}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Get started in seconds
        </Button>
        <Grid container justify="center">
          <Grid item>
            <Link
              component={RouterLink}
              to="/course/wSWLr1JGVVRGnWuXJxtF"
              target="_blank"
              variant="body1"
            >
              See an example course
            </Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
