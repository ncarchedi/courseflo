import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  container: {
    "& p, ol, ul": {
      fontSize: theme.typography.body1.fontSize,
    },
  },
}));

export default function Statement({ item }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>{renderHtmlFromString(item.body)}</Box>
  );
}
