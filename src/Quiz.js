import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));

export default function Quiz({ content }) {
  const classes = useStyles();

  return (
    <>
      {content.map((item) => (
        <Item content={item}></Item>
      ))}
      <Button
        className={classes.button}
        variant="contained"
        size="large"
        color="primary"
      >
        I'm all done!
      </Button>
    </>
  );
}
