import React from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FeedbackIcon from "@material-ui/icons/Feedback";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Box flexGrow={1}>
          <Typography className={classes.title} variant="h5" component="h1">
            {courseTitle}
          </Typography>
          <Typography className={classes.author} variant="body2" component="h2">
            By Nick Carchedi
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Hidden smDown>
            {!showSolutions && !editing && (
              <Typography className={classes.remaining} variant="body1">
                {(numRemaining ? numRemaining : "No") + " questions remaining"}
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
  );
}
