import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import NotesIcon from "@material-ui/icons/Notes";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import ImageIcon from "@material-ui/icons/Image";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import KeyboardIcon from "@material-ui/icons/Keyboard";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: "1.15rem",
    flexGrow: 1,
  },
  iconContainer: {
    textAlign: "right",
    paddingTop: theme.spacing(0.5),
  },
  helperText: {
    fontSize: "0.9rem",
  },
}));

export default function ItemHeader({ item, titleColor, points }) {
  const classes = useStyles();

  let pointsText;
  let helperText;
  let icon;

  const getPointsText = (pts) => {
    return pts <= 1 ? points + " point" : points + "points";
  };

  switch (item.type) {
    case "Text":
      pointsText = null;
      helperText = null;
      icon = <NotesIcon color="disabled" />;
      break;
    case "Video":
      pointsText = null;
      helperText = null;
      icon = <OndemandVideoIcon color="disabled" />;
      break;
    case "Image":
      pointsText = null;
      helperText = null;
      icon = <ImageIcon color="disabled" />;
      break;
    case "SingleSelect":
      pointsText = getPointsText(points);
      helperText = "Select only one";
      icon = <FormatListBulletedIcon color="disabled" />;
      break;
    case "MultiSelect":
      pointsText = getPointsText(points);
      helperText = "Check all that apply";
      icon = <DoneAllIcon color="disabled" />;
      break;
    case "TextInput":
      pointsText = getPointsText(points);
      helperText = null;
      icon = <KeyboardIcon color="disabled" />;
      break;
    default:
      helperText = null;
      icon = null;
  }

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={11}>
          <Typography
            className={classes.title}
            style={{ color: titleColor }}
            variant="h6"
          >
            {item.number}. {item.title || item.prompt}
          </Typography>
        </Grid>
        <Grid className={classes.iconContainer} item xs={1}>
          {icon}
        </Grid>
      </Grid>
      <FormHelperText className={classes.helperText}>
        {helperText ? pointsText + " — " + helperText : pointsText}
      </FormHelperText>
    </Box>
  );
}
