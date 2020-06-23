import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontFamily: ["Patrick Hand SC", "cursive"],
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.9rem",
    },
  },
  remaining: {
    fontStyle: "italic",
    marginRight: theme.spacing(1),
  },
}));

export default function Header({
  courseTitle,
  numRemaining,
  showSolutions,
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

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" component="h1">
            {courseTitle}
          </Typography>
          <Box display="flex" alignItems="center">
            <Hidden smDown>
              {!showSolutions && (
                <Typography className={classes.remaining} variant="body1">
                  {(numRemaining ? numRemaining : "No") +
                    " questions remaining"}
                </Typography>
              )}
            </Hidden>
            <Tooltip title="Share Course">
              <IconButton color="inherit" onClick={handleCopy}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Provide Feedback">
              <IconButton
                onClick={() => setShowFeedbackModal(true)}
                edge="end"
                color="inherit"
              >
                <FeedbackIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
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
