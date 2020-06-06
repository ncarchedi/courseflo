import React from "react";
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

export default function Course({
  content,
  inputs,
  onChangeInput,
  showSolutions,
  setShowSolutions,
}) {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = () => {
    history.push("/score");
    setShowSolutions(true);
  };

  return (
    <>
      {content.map((item) => (
        <Item
          key={item.id}
          item={item}
          value={inputs[item.id] || []}
          onChangeInput={onChangeInput}
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
          {showSolutions ? "Back to my score" : "I'm all done!"}
        </BigButton>
      </Box>
    </>
  );
}
