import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Item from "./Item";
import BigButton from "./BigButton";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(5),
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
      <Box textAlign="center">
        <BigButton
          className={classes.button}
          onClick={() => onSubmit(inputs)}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          I'm all done!
        </BigButton>
      </Box>
    </>
  );
}
