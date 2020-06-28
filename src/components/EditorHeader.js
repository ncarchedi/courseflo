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
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import PublishButton from "./PublishButton";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Header({
  courseTitle,
  onPublish,
  onRestore,
  setShowFeedbackModal,
}) {
  const classes = useStyles();
  let { url } = useRouteMatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // https://stackoverflow.com/a/52033479/2338922
  // todo: confirm browser coverage is sufficient
  const handleCopy = () => {
    setSnackbarOpen(true);
    // get rid of anything after /edit (e.g. trailing forward slash)
    const courseUrl = url.split("/edit")[0];
    navigator.clipboard.writeText(`https://courseflo.com${courseUrl}`);
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
            <PublishButton onPublish={onPublish} onRestore={onRestore} />
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
                <FeedbackOutlinedIcon />
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
