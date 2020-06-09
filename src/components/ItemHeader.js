import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import NotesIcon from "@material-ui/icons/Notes";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import ImageIcon from "@material-ui/icons/Image";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CreateIcon from "@material-ui/icons/Create";

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

export default function ItemHeader({ item, titleColor }) {
  const classes = useStyles();

  let helperText;
  let icon;

  switch (item.type) {
    case "Text":
      helperText = null;
      icon = <NotesIcon color="disabled" />;
      break;
    case "Video":
      helperText = null;
      icon = <OndemandVideoIcon color="disabled" />;
      break;
    case "Image":
      helperText = null;
      icon = <ImageIcon color="disabled" />;
      break;
    case "SingleSelect":
      helperText = "Select only one";
      icon = <RadioButtonCheckedIcon color="disabled" />;
      break;
    case "MultiSelect":
      helperText = "Check all that apply";
      icon = <DoneAllIcon color="disabled" />;
      break;
    case "TextInput":
      helperText = null;
      icon = <CreateIcon color="disabled" />;
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
      {helperText && (
        <FormHelperText className={classes.helperText}>
          ({helperText})
        </FormHelperText>
      )}
    </Box>
  );
}
