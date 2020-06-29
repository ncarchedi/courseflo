import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import PublishButton from "./PublishButton";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

export default function Header({
  courseTitle,
  onChangeTitle,
  onPublish,
  onRestore,
  setShowFeedbackModal,
}) {
  const classes = useStyles();
  const theme = useTheme();
  let { url } = useRouteMatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [titleFormOpen, setTitleFormOpen] = useState(false);
  const [title, setTitle] = useState(courseTitle);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSaveTitle = () => {
    setTitleFormOpen(false);
    onChangeTitle(title);
  };

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
          <Box className={classes.titleContainer}>
            {titleFormOpen ? (
              <form onSubmit={handleSaveTitle} onBlur={handleSaveTitle}>
                <TextField
                  value={title}
                  onChange={handleChangeTitle}
                  InputProps={{
                    style: {
                      fontSize: theme.typography.h5.fontSize,
                      letterSpacing: "0em",
                    },
                  }}
                  autoFocus
                  fullWidth
                />
              </form>
            ) : (
              <Hidden xsDown>
                <Box display="flex" alignItems="center">
                  <Typography variant="h5" component="h1" noWrap>
                    {title}
                  </Typography>
                  <IconButton onClick={() => setTitleFormOpen(true)}>
                    <CreateOutlinedIcon />
                  </IconButton>
                </Box>
              </Hidden>
            )}
          </Box>
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
