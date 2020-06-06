import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

export default function Course({ content }) {
  const classes = useStyles();
  const history = useHistory();
  const [inputs, setInputs] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleChangeInput = (itemId, value) => {
    setInputs({
      ...inputs,
      [itemId]: value,
    });
  };

  const handleSubmit = () => {
    history.push("/done");
    setShowSolutions(true);
  };

  return (
    <>
      {content.map((item) => (
        <Item
          key={item.id}
          item={item}
          value={inputs[item.id] || []}
          onChangeInput={handleChangeInput}
          showSolution={showSolutions}
        ></Item>
      ))}
      <Box textAlign="center">
        <BigButton
          className={classes.button}
          onClick={handleSubmit}
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
