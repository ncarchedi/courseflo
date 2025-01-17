import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
// import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxHeight: theme.mixins.toolbar.minHeight - 25,
  },
}));

export default function LandingPageHeader() {
  const classes = useStyles();
  // const [user, userLoading] = useContext(UserContext);
  // const location = useLocation();

  // const showSignInButton =
  //   !userLoading && !user && location.pathname !== "/login";
  // const showPricingButton = location.pathname === "/";

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Box flexGrow={1}>
            <Link component={RouterLink} to="/">
              {/* https://mybrandnewlogo.com/logo/Xv0GzYYrn7iZXkGGjnJL */}
              <img
                className={classes.logo}
                src="logo.png"
                alt="Courseflo logo"
              />
            </Link>
          </Box>
          <Hidden xsDown>
            <Box mr={1}>
              <Button
                href="mailto:hello@courseflo.com"
                target="_blank"
                color="inherit"
              >
                Contact us
              </Button>
            </Box>
          </Hidden>
          {/* {showPricingButton && (
            <Box mr={showSignInButton ? 2 : 0}>
              <Button component={RouterLink} to="/pricing" color="inherit">
                Pricing
              </Button>
            </Box>
          )}
          {showSignInButton && (
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              color="inherit"
            >
              Sign in
            </Button>
          )} */}
        </Toolbar>
      </AppBar>
      {/* second toolbar due to: https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
}
