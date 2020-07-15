import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Item from "./Item";
import NoItems from "./NoItems";
import CourseNav from "./CourseNav";
import JumpToItemDialog from "./JumpToItemDialog";
import CompleteCourseDialog from "./CompleteCourseDialog";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(3),
  },
}));

export default function ItemViewer({
  items,
  answers,
  onChangeAnswer,
  onSubmitCourse,
  itemNumber,
  onChangeItemNumber,
}) {
  const classes = useStyles();
  const [jumpToDialogOpen, setJumpToDialogOpen] = useState(false);
  const [openCompleteCourseDialog, setOpenCompleteCourseDialog] = useState(
    false
  );

  // if there are no items to show, show empty screen
  if (!items.length) return <NoItems />;

  // get the current item, if there is one
  const item = items[itemNumber];
  if (!item) return null;

  // get the answer if there is one
  const answer = answers && answers.filter((a) => a.itemId === item.id)[0];

  return (
    <>
      <Box className={classes.item}>
        <Item
          key={item.id}
          item={item}
          answer={answer}
          onChangeAnswer={onChangeAnswer}
        />
      </Box>
      <CourseNav
        itemNumber={itemNumber}
        onChangeItemNumber={onChangeItemNumber}
        setJumpToDialogOpen={setJumpToDialogOpen}
        setOpenCompleteCourseDialog={setOpenCompleteCourseDialog}
        onLastItem={itemNumber === items.length - 1}
        disableContinue={item.required && answer.value.length === 0}
      />
      <JumpToItemDialog
        open={jumpToDialogOpen}
        setOpen={setJumpToDialogOpen}
        items={items}
        itemNumber={itemNumber}
        onChangeItemNumber={onChangeItemNumber}
      />
      <CompleteCourseDialog
        onSubmit={onSubmitCourse}
        open={openCompleteCourseDialog}
        setOpen={setOpenCompleteCourseDialog}
      />
    </>
  );
}
