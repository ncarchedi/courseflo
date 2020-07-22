import React from "react";
import { Link as RouterLink } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxHeight: theme.mixins.toolbar.minHeight - 25,
  },
}));

export default function DashboardHeader({
  // isSubscribed,
  setShowFeedbackDialog,
}) {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Box flexGrow={1}>
            <Hidden xsDown>
              {/* https://mybrandnewlogo.com/logo/Xv0GzYYrn7iZXkGGjnJL */}
              <img
                className={classes.logo}
                src="../logo.png"
                alt="Courseflo logo"
              />
            </Hidden>
          </Box>
          <Box display="flex" alignItems="center">
            {/* {!isSubscribed && ( */}
            <Box mr={2}>
              <Button
                component={RouterLink}
                to="/pricing"
                variant="outlined"
                color="inherit"
              >
                Upgrade
              </Button>
            </Box>
            {/* )} */}
            <Tooltip title="Provide Feedback">
              <IconButton
                onClick={() => setShowFeedbackDialog(true)}
                color="inherit"
              >
                <ErrorOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Log Out">
              <IconButton
                onClick={() => firebase.auth().signOut()}
                edge="end"
                color="inherit"
              >
                <ExitToAppOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      {/* second toolbar due to: https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
}
