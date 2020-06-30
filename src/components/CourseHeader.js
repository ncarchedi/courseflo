import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import Crop75OutlinedIcon from "@material-ui/icons/Crop75Outlined";

import ProgressBar from "./ProgressBar";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function CourseHeader({
  courseTitle,
  progress,
  orientation,
  setOrientation,
  setShowFeedbackModal,
}) {
  const classes = useStyles();
  let { url } = useRouteMatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // https://stackoverflow.com/a/52033479/2338922
  // todo: confirm browser coverage is sufficient
  const handleCopy = () => {
    setSnackbarOpen(true);
    navigator.clipboard.writeText(`https://courseflo.com${url}`);
  };

  const toggleView = () => {
    setOrientation(orientation === "horizontal" ? "vertical" : "horizontal");
  };

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.title}
            variant="h5"
            component="h1"
            noWrap
          >
            {courseTitle}
          </Typography>
          <Box display="flex" alignItems="center">
            {progress !== 100 && (
              <Tooltip title="Toggle View">
                <IconButton color="inherit" onClick={toggleView}>
                  {orientation === "horizontal" ? (
                    <ViewAgendaOutlinedIcon />
                  ) : (
                    <Crop75OutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Share Course">
              <IconButton color="inherit" onClick={handleCopy}>
                <ShareOutlinedIcon />
              </IconButton>
            </Tooltip>
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
        {/* only show progress bar for horizontal orientation */}
        {orientation === "horizontal" && <ProgressBar value={progress} />}
      </AppBar>
      {/* second toolbar due to: https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          Course link copied to clipboard!
        </MuiAlert>
      </Snackbar>
    </>
  );
}
