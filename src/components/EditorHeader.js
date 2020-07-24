import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import PublishButton from "./PublishButton";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    flexGrow: 1,
    marginRight: theme.spacing(3),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default function Header({
  userId,
  courseTitle,
  onChangeTitle,
  onPublish,
  onRestore,
  setShowFeedbackDialog,
  setShowSettingsDialog,
  onCopyJSON,
}) {
  const classes = useStyles();
  const theme = useTheme();
  let { courseId } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [titleFormOpen, setTitleFormOpen] = useState(false);
  const [title, setTitle] = useState(courseTitle);

  // create course URL
  const courseUrl = `${window.location.origin}/course/${courseId}`;

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSaveTitle = (e) => {
    e.preventDefault();
    setTitleFormOpen(false);
    onChangeTitle(title);
  };

  // https://stackoverflow.com/a/52033479/2338922
  // todo: confirm browser coverage is sufficient
  const handleCopyLink = () => {
    setSnackbarOpen(true);
    navigator.clipboard.writeText(courseUrl);
  };

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar className={classes.toolbar}>
          <Box marginRight={1}>
            <IconButton
              component={RouterLink}
              to={`/dashboard/${userId}`}
              edge="start"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box className={classes.titleContainer}>
            <form onSubmit={handleSaveTitle} onBlur={handleSaveTitle}>
              {titleFormOpen ? (
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
            </form>
          </Box>
          <Box display="flex" alignItems="center">
            <Box marginRight={1}>
              <PublishButton onPublish={onPublish} onRestore={onRestore} />
            </Box>
            {/* show copy JSON button for me only */}
            {userId === "eREaYzuMiJegynCCVVf32esGZsx2" && (
              <Tooltip title="Copy JSON">
                <IconButton color="inherit" onClick={onCopyJSON}>
                  <CodeOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Settings">
              <IconButton
                color="inherit"
                onClick={() => setShowSettingsDialog(true)}
              >
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Course">
              <IconButton color="inherit" href={courseUrl} target="_blank">
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share Course">
              <IconButton color="inherit" onClick={handleCopyLink}>
                <ShareOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Provide Feedback">
              <IconButton
                onClick={() => setShowFeedbackDialog(true)}
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
