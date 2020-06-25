import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.1rem",
  },
}));

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function LandingPageSignup() {
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
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "signup", ...inputs }),
    })
      .then(() => alert("Success!"))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h5">Sign up now to get started.</Typography>
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={inputs.firstName}
              onChange={handleChange}
              autoComplete="fname"
              variant="outlined"
              required
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={inputs.lastName}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email Address"
              value={inputs.email}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              autoComplete="email"
            />
          </Grid>
        </Grid>
        <Button
          className={classes.submitButton}
          onClick={handleSubmit}
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
