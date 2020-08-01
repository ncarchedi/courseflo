import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  hintText: {
    fontStyle: "italic",
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.secondary,
  },
}));

export default function ItemFooter({ item }) {
  const classes = useStyles();
  const [showHint, setShowHint] = useState(false);

  if (!item.hint) return null;

  return (
    <Box className={classes.container}>
      {showHint ? (
        <Box className={classes.hintText}>
          {renderHtmlFromString(item.hint)}
        </Box>
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
