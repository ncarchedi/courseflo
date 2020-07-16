import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Item from "./Item";
import NoItems from "./NoItems";
import CourseNav from "./CourseNav";
import JumpToItemDialog from "./JumpToItemDialog";
import CompleteCourseDialog from "./CompleteCourseDialog";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(3),
  },
  poweredByBox: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  logo: {
    maxHeight: theme.spacing(2),
  },
}));

export default function ItemViewer({
  items,
  userItems,
  onChangeAnswer,
  onItemLoad,
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
      <Box
        className={classes.poweredByBox}
        component={RouterLink}
        to="/"
        target="_blank"
      >
        <Box mr={0.5}>
          <Typography variant="body2">Powered by</Typography>
        </Box>
        <img
          className={classes.logo}
          src="../logo-bw.png"
          alt="Courseflo logo"
        />
      </Box>
      <CourseNav
        itemNumber={itemNumber}
        onChangeItemNumber={onChangeItemNumber}
        setJumpToDialogOpen={setJumpToDialogOpen}
        setOpenCompleteCourseDialog={setOpenCompleteCourseDialog}
        onLastItem={itemNumber === items.length - 1}
        disableContinue={
          item.required && userItem && userItem.answer.length === 0
        }
      />
      <JumpToItemDialog
        open={jumpToDialogOpen}
        setOpen={setJumpToDialogOpen}
        items={items}
        userItems={userItems}
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
