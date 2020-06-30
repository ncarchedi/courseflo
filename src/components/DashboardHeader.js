import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxHeight: theme.mixins.toolbar.minHeight - 25,
  },
}));

export default function DashboardHeader() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Box flexGrow={1}>
            {/* https://mybrandnewlogo.com/logo/Xv0GzYYrn7iZXkGGjnJL */}
            <img
              className={classes.logo}
              src="../logo.png"
              alt="Courseflo logo"
            />
          </Box>
        </Toolbar>
      </AppBar>
      {/* second toolbar due to: https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
}
