import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(1),
  },
  iconContainer: {
    textAlign: "right",
    paddingTop: theme.spacing(0.5),
  },
}));

export default function EditableItemHeader({
  item,
  icon,
  onFocus,
  onChangeItemValue,
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid className={classes.container} container spacing={1}>
      <Grid item xs={11}>
        <form onFocus={() => onFocus(item.id)}>
          <TextField
            variant="filled"
            name={item.title ? "title" : "prompt"}
            placeholder={item.title ? "Title" : "Question"}
            value={item.title ? item.title : item.prompt}
            onChange={onChangeItemValue}
            // match style of item header
            InputProps={{
              style: {
                padding: theme.spacing(2),
                fontSize: "1.15rem",
                fontWeight: 500,
              },
            }}
            multiline
            fullWidth
          />
        </form>
      </Grid>
      <Grid className={classes.iconContainer} item xs={1}>
        {icon}
      </Grid>
    </Grid>
  );
}
