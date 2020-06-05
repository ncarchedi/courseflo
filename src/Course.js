import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));

export default function Course({ content }) {
  const classes = useStyles();
  const [responses, setResponses] = useState({});

  const handleChangeResponse = (itemId, value) => {
    setResponses({
      ...responses,
      [itemId]: value,
    });
  };

  return (
    <>
      {content.map((item) => (
        <Item
          key={item.id}
          item={item}
          value={responses[item.id]}
          onChange={handleChangeResponse}
        ></Item>
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
