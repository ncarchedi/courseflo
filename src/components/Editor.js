import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Item from "./Item";
import EditorHeader from "./EditorHeader";
import EditableItem from "./EditableItem";
import NotFound from "./NotFound";
import ReorderItemsDialog from "./ReorderItemsDialog";
import FeedbackModal from "./FeedbackModal";
import AddItemFab from "./AddItemFab";
import createItem from "../utils/createItem";
import {
  getCourseFromFirestore,
  updateCourseInFirestore,
} from "../services/firestore";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    height: "100%",
    // need padding on bottom due to header
    paddingBottom: theme.mixins.toolbar.minHeight,
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
  const panelRef = useRef();
  let { courseId } = useParams();
  const [show404, setShow404] = useState(false);
  const [course, setCourse] = useState();
  const [currentItemId, setCurrentItemId] = useState();
  const [openReorderDialog, setOpenReorderDialog] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

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

  const handleChangeTitle = (title) => {
    setCourse({ ...course, title });
  };

  const handleFocus = (itemId) => {
    setCurrentItemId(itemId);
  };

  const handleAddItem = (type) => {
    const items = [...course.items];
    const newItem = createItem(type);
    items.push(newItem);
    setCourse({ ...course, items });
    // https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
    panelRef.current.scrollTop = panelRef.current.scrollHeight;
  };

  const handleChangeItem = (changedItem) => {
    const items = [...course.items];
    const index = items.findIndex((item) => item.id === changedItem.id);
    items[index] = changedItem; // update item in place to avoid reordering
    setCourse({ ...course, items });
  };

  const handleDeleteItem = (itemId) => {
    setCourse({
      ...course,
      items: course.items.filter((item) => item.id !== itemId),
    });
  };

  // generic function for updating items (e.g. for reordering them)
  const handleUpdateItems = (items) => {
    setCourse({ ...course, items });
  };

  const handlePublish = () => {
    updateCourseInFirestore(courseId, course);
  };

  const handleRestore = () => {
    window.location.reload();
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
      <EditorHeader
        courseTitle={course.title}
        onChangeTitle={handleChangeTitle}
        onPublish={handlePublish}
        onRestore={handleRestore}
        setShowFeedbackModal={setShowFeedbackModal}
      />
      <Grid className={classes.container} container>
        <Grid className={classes.leftPanel} ref={panelRef} item xs={12} md={6}>
          {course.items.map((item) => (
            <Box key={item.id} marginBottom={3}>
              <EditableItem
                item={item}
                focused={item.id === currentItemId}
                onFocus={handleFocus}
                onChangeItem={handleChangeItem}
                onClickMove={() => setOpenReorderDialog(true)}
                onClickDelete={handleDeleteItem}
              />
            </Box>
          ))}
        </Grid>
        <Hidden smDown>
          <Grid className={classes.rightPanel} item xs={false} md={6}>
            <Box width="100%" marginBottom={3}>
              {currentItemId ? (
                <Item item={currentItem} />
              ) : (
                <Box marginTop="10%">
                  <Typography color="textSecondary" align="center">
                    Select an exercise to preview it here
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Hidden>
      </Grid>
      <ReorderItemsDialog
        items={course.items}
        open={openReorderDialog}
        setOpen={setOpenReorderDialog}
        onReorderItems={handleUpdateItems}
      />
      <FeedbackModal open={showFeedbackModal} setOpen={setShowFeedbackModal} />
      <AddItemFab onAddItem={handleAddItem} />
    </>
  );
}
