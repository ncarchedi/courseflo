import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Item from "./Item";
import PoweredBy from "./PoweredBy";
import NoItems from "./NoItems";
import CourseNav from "./CourseNav";
import JumpToItemDialog from "./JumpToItemDialog";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(3),
  },
}));

export default function ItemViewer({
  items,
  userItems,
  onChangeAnswer,
  onItemLoad,
  itemNumber,
  onChangeItemNumber,
  showCourseNav,
  setShowCompleteCourseDialog,
}) {
  const classes = useStyles();
  const [jumpToDialogOpen, setJumpToDialogOpen] = useState(false);

  // if there are no items to show, show empty screen
  if (!items.length) return <NoItems />;

  // get the current item, if there is one
  const item = items[itemNumber];
  if (!item) return null;

  // get the current userItem, if there is one
  // note: don't require it to exist since it's created
  // once the item loads
  const userItem = userItems[itemNumber];

  return (
    <>
      <Box className={classes.item}>
        <Item
          key={item.id}
          item={item}
          userItem={userItem}
          onItemLoad={onItemLoad}
          onChangeAnswer={onChangeAnswer}
        />
      </Box>
      <PoweredBy />
      {showCourseNav && (
        <CourseNav
          itemNumber={itemNumber}
          onChangeItemNumber={onChangeItemNumber}
          setJumpToDialogOpen={setJumpToDialogOpen}
          setShowCompleteCourseDialog={setShowCompleteCourseDialog}
          onLastItem={itemNumber === items.length - 1}
          disableContinue={
            item.required && userItem && userItem.answer.length === 0
          }
        />
      )}
      <JumpToItemDialog
        open={jumpToDialogOpen}
        setOpen={setJumpToDialogOpen}
        items={items}
        userItems={userItems}
        itemNumber={itemNumber}
        onChangeItemNumber={onChangeItemNumber}
      />
    </>
  );
}
