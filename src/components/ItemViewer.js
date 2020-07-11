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
  userEmail,
  setUserEmail,
}) {
  const classes = useStyles();
  const [jumpToDialogOpen, setJumpToDialogOpen] = useState(false);
  const [openCompleteCourseDialog, setOpenCompleteCourseDialog] = useState(
    false
  );

  // if there are no items to show, show empty screen
  if (!items.length) return <NoItems />;

  const item = items[itemNumber];
  if (!item) return null;

  return (
    <>
      <Box className={classes.item}>
        <Item
          key={item.id}
          item={item}
          answer={answers && answers.filter((a) => a.itemId === item.id)[0]}
          onChangeAnswer={onChangeAnswer}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      </Box>
      <CourseNav
        itemNumber={itemNumber}
        onChangeItemNumber={onChangeItemNumber}
        setJumpToDialogOpen={setJumpToDialogOpen}
        setOpenCompleteCourseDialog={setOpenCompleteCourseDialog}
        disableButtons={item.type === "Email" && !userEmail}
        onLastItem={itemNumber === items.length - 1}
      />
      <JumpToItemDialog
        items={items}
        itemNumber={itemNumber}
        onChangeItemNumber={onChangeItemNumber}
        open={jumpToDialogOpen}
        setOpen={setJumpToDialogOpen}
      />
      <CompleteCourseDialog
        onSubmit={onSubmitCourse}
        open={openCompleteCourseDialog}
        setOpen={setOpenCompleteCourseDialog}
      />
    </>
  );
}
