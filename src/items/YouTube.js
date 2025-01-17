import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  box: {
    overflow: "hidden",
    paddingTop: "56.25%",
    position: "relative",
    "& iframe": {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      border: 0,
    },
  },
}));

export default function YouTube({ item }) {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <iframe
        title={item.title}
        src={`https://www.youtube-nocookie.com/embed/${item.videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  );
}
