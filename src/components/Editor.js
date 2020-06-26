import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    height: "100%",
  },
  panel: {
    padding: theme.spacing(3),
  },
  leftPanel: {
    borderRight: "solid",
    borderWidth: "1px",
    borderRightColor: theme.palette.grey[300],
  },
}));

export default function Editor() {
  const classes = useStyles();

  const currentItem = {
    id: "howComputeXIntercept",
    type: "SingleSelect",
    prompt:
      "Given the formula for a line, how do you compute the $$x$$-intercept?",
    hint:
      "Recall from the video that the $$x$$-intercept is where a line intersects the $$x$$-axis.",
    options: [
      "Set $$y$$ equal to $$0$$ and solve for $$x$$",
      "Set $$x$$ equal to $$0$$ and solve for $$y$$",
      "Set both $$x$$ and $$y$$ equal to $$0$$",
      "None of the above",
    ],
    solution: "Set $$y$$ equal to $$0$$ and solve for $$x$$",
  };

  return (
    <Grid className={classes.container} container>
      <Grid className={`${classes.panel} ${classes.leftPanel}`} item xs={6}>
        <TextField
          value={JSON.stringify(currentItem, null, 2)}
          variant="outlined"
          multiline
          fullWidth
        />
      </Grid>
      <Grid className={classes.panel} item xs={6}>
        {currentItem && <Item item={currentItem} />}
      </Grid>
    </Grid>
  );
}
