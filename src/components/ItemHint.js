import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  hint: {
    fontStyle: "italic",
  },
}));

export default function ItemHint({ hint }) {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <Box className={classes.container}>
      {show ? (
        <Typography className={classes.hint} color="textSecondary">
          Hint: {hint}
        </Typography>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShow(true)}
        >
          Show hint
        </Button>
      )}
    </Box>
  );
}
