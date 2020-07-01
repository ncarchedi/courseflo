import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxHeight: theme.mixins.toolbar.minHeight - 25,
  },
}));

export default function DashboardHeader({ setShowFeedbackModal }) {
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
          <Box display="flex" alignItems="center">
            <Tooltip title="Provide Feedback">
              <IconButton
                onClick={() => setShowFeedbackModal(true)}
                edge="end"
                color="inherit"
              >
                <ErrorOutlineOutlinedIcon />
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
