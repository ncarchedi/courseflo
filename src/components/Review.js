import React from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(3),
  },
}));

export default function Review({ items, answers, userEmail }) {
  const classes = useStyles();

  return (
    <>
      {items.map((item) => (
        <Box key={item.id} className={classes.item}>
          <Item
            item={item}
            answer={answers.filter((a) => a.itemId === item.id)[0]}
            userEmail={userEmail}
            showSolution
          />
        </Box>
      ))}
    </>
  );
}
