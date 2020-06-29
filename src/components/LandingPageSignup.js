import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import createCourse from "../utils/createCourse";
import { saveCourseToFirestore } from "../services/firestore";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.1rem",
  },
  formHeader: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeightLight,
  },
}));

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function LandingPageSignup({ setCourseId }) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // create course
    const fullName = (inputs.firstName + " " + inputs.lastName).trim();
    const newCourse = createCourse(fullName);
    saveCourseToFirestore(newCourse)
      .then((docRef) => setCourseId(docRef.id))
      .catch((error) =>
        console.error("Error saving course to Firestore: ", error)
      );

    // send netlify form data
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "signup", ...inputs }),
    }).catch((error) =>
      console.error("Error sending form data to Netlify: ", error)
    );

    e.preventDefault();
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography className={classes.formHeader}>
        Sign up now to create a course or quiz for free.
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={inputs.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={inputs.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email Address"
              value={inputs.email}
              onChange={handleChange}
              type="email"
              autoComplete="email"
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
        >
          Let's do this!
        </Button>
        <Grid container justify="center">
          <Grid item>
            <Link
              href="https://courseflo.com/course/CnONPrnou4370gHU2DV0"
              target="_blank"
            >
              See an example course
            </Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
