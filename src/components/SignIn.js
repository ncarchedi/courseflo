import React, { useState, useContext } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./LandingPageHeader";
import Footer from "./LandingPageFooter";
import UserContext from "../context/UserContext";
import { signInExistingUser } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  errorMessage: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
export default function SignIn() {
  const classes = useStyles();
  const [user, userLoading] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if there's an error, don't submit
    if (error) return;
    // sign in existing user
    signInExistingUser(email, password, setError);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  // return null until user is done loading
  if (userLoading) return null;

  return (
    <>
      {user ? (
        <Redirect to={`/dashboard/${user.uid}`} />
      ) : (
        <>
          <Header />
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <TextField
                  value={email}
                  onChange={handleChangeEmail}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  value={password}
                  onChange={handleChangePassword}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Typography
                  className={classes.errorMessage}
                  variant="body1"
                  color="error"
                >
                  {error}
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container justify="center">
                  <Grid item xs>
                    <Link
                      href="mailto:hello@dayonelabs.io?subject=Please reset my password!"
                      target="_blank"
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/" variant="body2">
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Footer />
          </Container>
        </>
      )}
    </>
  );
}
