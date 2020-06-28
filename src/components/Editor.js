import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Item from "./Item";
import EditableItem from "./EditableItem";
import NotFound from "./NotFound";
import ReorderItemsDialog from "./ReorderItemsDialog";
import { getCourseFromFirestore } from "../services/firestore";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    height: "100%",
  },
  leftPanel: {
    padding: theme.spacing(3),
    height: "100%",
    overflowY: "scroll",
  },
  rightPanel: {
    padding: theme.spacing(3),
    height: "100%",
    overflowY: "scroll",
    borderLeft: "solid",
    borderLeftWidth: "1px",
    borderLeftColor: theme.palette.grey[300],
  },
}));

export default function Editor() {
  const classes = useStyles();
  let { courseId } = useParams();
  const [show404, setShow404] = useState(false);
  const [course, setCourse] = useState();
  const [currentItemId, setCurrentItemId] = useState();
  const [openReorderDialog, setOpenReorderDialog] = useState(false);

  useEffect(() => {
    getCourseFromFirestore(courseId)
      .then((course) => {
        if (course.exists) {
          // extract the course data
          const courseData = course.data();
          // load into state
          setCourse(courseData);
          // update the browser tab title dynamically
          document.title = courseData.title;
        } else {
          setShow404(true);
        }
      })
      .catch((error) =>
        console.error("Error loading course from Firestore: ", error)
      );
  }, [courseId]);

  const handleFocus = (itemId) => {
    setCurrentItemId(itemId);
  };

  const handleChangeItem = (changedItem) => {
    const items = [...course.items];
    const index = items.findIndex((item) => item.id === changedItem.id);
    items[index] = changedItem;
    setCourse({ ...course, items });
  };

  // generic function for updating items (e.g. for reordering them)
  const handleUpdateItems = (items) => {
    setCourse({ ...course, items });
  };

  const currentItem = useMemo(
    () => course && course.items.filter((item) => item.id === currentItemId)[0],
    [currentItemId, course]
  );

  // return null if the course isn't loaded yet
  if (!course) return null;

  // if the course isn't found, show 404
  if (show404) return <NotFound type="course" />;

  return (
    <>
      <Grid className={classes.container} container>
        <Grid className={classes.leftPanel} item md={6}>
          {course.items.map((item) => (
            <Box key={item.id} marginBottom={3}>
              <EditableItem
                item={item}
                onFocus={handleFocus}
                onChangeItem={handleChangeItem}
                onClickMove={() => setOpenReorderDialog(true)}
              />
            </Box>
          ))}
        </Grid>
        <Hidden smDown>
          <Grid className={classes.rightPanel} item md={6}>
            {/* todo: set maxWidth for item preview */}
            <Box width="100%">{currentItem && <Item item={currentItem} />}</Box>
          </Grid>
        </Hidden>
      </Grid>
      <ReorderItemsDialog
        items={course.items}
        open={openReorderDialog}
        setOpen={setOpenReorderDialog}
        onReorderItems={handleUpdateItems}
      />
    </>
  );
}
