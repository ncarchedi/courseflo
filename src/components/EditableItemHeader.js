import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
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

export default function ItemHeader({ item, icon }) {
  const classes = useStyles();

  // figure out whether to render title or prompt
  const text = item.title ? item.title.raw : item.prompt.raw;

  return (
    <Grid container>
      <Grid item xs={11}>
        <TextField
          variant="filled"
          name="prompt"
          label="Prompt"
          value={text}
          multiline
          fullWidth
        />
      </Grid>
      <Grid className={classes.iconContainer} item xs={1}>
        {icon}
      </Grid>
    </Grid>
  );
}
