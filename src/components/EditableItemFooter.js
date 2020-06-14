import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  hintText: {
    fontStyle: "italic",
  },
}));

export default function EditableItemFooter({ item }) {
  const classes = useStyles();

  if (!item.hint) return null;

  return (
    <Box className={classes.container}>
      <Typography className={classes.hintText} color="textSecondary">
        Hint: {renderHtmlFromString(item.hint)}
      </Typography>
    </Box>
  );
}
