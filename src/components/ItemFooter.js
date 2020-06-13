import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  hintText: {
    fontStyle: "italic",
  },
}));

export default function ItemFooter({ item }) {
  const classes = useStyles();
  const [showHint, setShowHint] = useState(false);

  if (!item.hint) return null;

  return (
    <Box className={classes.container}>
      {showHint ? (
        <Typography className={classes.hintText} color="textSecondary">
          Hint: {renderHtmlFromString(item.hint)}
        </Typography>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowHint(true)}
        >
          Show hint
        </Button>
      )}
    </Box>
  );
}
