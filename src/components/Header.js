import React, { useState } from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
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
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    alignItems: "flex-start",
  },
  title: {
    fontFamily: ["Patrick Hand SC", "cursive"],
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.9rem",
    },
  },
  author: {
    fontStyle: "italic",
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
  editing,
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
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box flexGrow={1}>
            <Typography className={classes.title} variant="h5" component="h1">
              {courseTitle}
            </Typography>
            <Hidden xsDown>
              <Typography
                className={classes.author}
                variant="body2"
                component="h2"
              >
                By Nick Carchedi
              </Typography>
            </Hidden>
          </Box>
          <Box display="flex" alignItems="center">
            <Hidden smDown>
              {!showSolutions && !editing && (
                <Typography className={classes.remaining} variant="body1">
                  {(numRemaining ? numRemaining : "No") +
                    " questions remaining"}
                </Typography>
              )}
            </Hidden>
            <Tooltip title={editing ? "Preview Course" : "Edit Course"}>
              <IconButton
                component={RouterLink}
                to={editing ? url : `${url}/edit`}
                color="inherit"
              >
                {editing ? <VisibilityIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
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
