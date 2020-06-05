import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));

export default function Course({ content, onSubmit }) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({});

  const handleChangeInput = (itemId, value) => {
    setInputs({
      ...inputs,
      [itemId]: value,
    });
  };

  return (
    <>
      {content.map((item) => (
        <Item
          key={item.id}
          item={item}
          value={inputs[item.id]}
          onChangeInput={handleChangeInput}
        ></Item>
      ))}
      <Button
        className={classes.button}
        onClick={() => onSubmit(inputs)}
        variant="contained"
        size="large"
        color="primary"
      >
        I'm all done!
      </Button>
    </>
  );
}
