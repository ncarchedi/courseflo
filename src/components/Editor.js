import React, { useState, useEffect, useMemo, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
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
import FeedbackDialog from "./FeedbackDialog";
import EditorSettingsDialog from "./EditorSettingsDialog";
import AddItemFab from "./AddItemFab";
import NoItems from "./NoItems";
import LoadingScreen from "./LoadingScreen";
import createItem from "../utils/createItem";
import addDefaultSettings from "../utils/addDefaultSettings";
import {
  getDraftCourseFromFirestore,
  getPublishedCourseFromFirestore,
  updatePublishedCourseInFirestore,
  updateDraftCourseInFirestore,
} from "../services/firebase";
import UserContext from "../context/UserContext";

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
  let { courseId } = useParams();
  const [user, userLoading] = useContext(UserContext);
  const [show404, setShow404] = useState(false);
  const [course, setCourse] = useState();
  const [currentItemId, setCurrentItemId] = useState();
  const [openReorderDialog, setOpenReorderDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [changesSaved, setChangesSaved] = useState(true);

  // course loading sequence
  const loadCourse = (course) => {
    // extract the course data
    const courseData = course.data();
    // if proper settings aren't set, set defaults
    const courseDataWithSettings = addDefaultSettings(courseData);
    // load into state
    setCourse(courseDataWithSettings);
    // update the browser tab title dynamically
    document.title = courseData.title;
  };

  // load course from firestore
  useEffect(() => {
    // check for draft course first
    getDraftCourseFromFirestore(courseId).then((draftCourse) => {
      if (draftCourse.exists) {
        loadCourse(draftCourse);
      } else {
        // if draft doesn't exist, check for published course
        // for backwards compatibility (before drafts existed)
        getPublishedCourseFromFirestore(courseId)
          .then((publishedCourse) => {
            if (publishedCourse.exists) {
              loadCourse(publishedCourse);
            } else {
              // if neither draft nor published exist, show 404
              setShow404(true);
            }
          })
          .catch((error) =>
            console.error("Error loading course from Firestore:", error)
          );
      }
    });
  }, [courseId]);

  // when the course changes, update the draft in firestore
  // and local storage (as last resort content backup)
  useEffect(() => {
    if (course) {
      // update the draft course in firestore
      updateDraftCourseInFirestore(courseId, course).catch((error) =>
        console.error("Error updating draft course in Firestore:", error)
      );

      // update the current course in local storage
      const localCourses = JSON.parse(localStorage.getItem("courses"));
      localStorage.setItem(
        "courses",
        JSON.stringify({
          ...localCourses,
          [courseId]: course,
        })
      );

      // indicate changes have been saved
      setChangesSaved(true);
    }
  }, [courseId, course]);

  // // smooth scroll currently selected item into view
  // useEffect(() => {
  //   const itemId = document.getElementById(currentItemId);
  //   itemId && itemId.scrollIntoView({ behavior: "smooth", block: "center" });
  // }, [currentItemId]);

  const handleChangeTitle = (title) => {
    setCourse({ ...course, title });
  };

  const handleFocus = (itemId) => {
    setCurrentItemId(itemId);
  };

  const handleAddItem = (type) => {
    // copy existing items
    const items = [...course.items];
    // create new item
    const newItem = createItem(type);
    // get index of currently selected item
    const currentIndex = items.findIndex((item) => item.id === currentItemId);
    // insert new item after current item
    items.splice(currentIndex + 1, 0, newItem);
    // update state with new item
    setCourse({ ...course, items });
    // highlight the new item
    setCurrentItemId(newItem.id);
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
    updatePublishedCourseInFirestore(courseId, course);
  };

  const handleRestore = () => {
    // get last published version
    getPublishedCourseFromFirestore(courseId)
      .then((publishedCourse) => {
        if (publishedCourse.exists) {
          // extract course data
          const publishedCourseData = publishedCourse.data();
          // update draft to match published
          updateDraftCourseInFirestore(courseId, publishedCourseData);
        }
      })
      .catch((error) =>
        console.error("Error restoring published course from Firestore:", error)
      )
      .finally(() => {
        // reload the page to load updated draft
        window.location.reload();
      });
  };

  const handleSaveSettings = (settings) => {
    const updatedCourse = { ...course, settings };
    setCourse(updatedCourse);
  };

  const handleCopyJSON = () => {
    const courseJSON = JSON.stringify(course, null, 2);
    navigator.clipboard.writeText(courseJSON);
  };

  const currentItem = useMemo(
    () => course && course.items.filter((item) => item.id === currentItemId)[0],
    [currentItemId, course]
  );

  // do nothing until user is done loading
  if (userLoading) return null;

  // if user is not logged in, redirect to landing page
  if (!user) return <Redirect to="/" />;

  // if the course isn't found, show 404
  if (show404) return <NotFound type="course" />;

  // show loading indicator before the course loads
  if (!course) return <LoadingScreen />;

  // if the user is logged in, but not editing their own course, show 404
  if (user.uid !== course.userId) return <NotFound type="page" />;

  return (
    <>
      <EditorHeader
        userId={user.uid}
        courseTitle={course.title}
        onChangeTitle={handleChangeTitle}
        onPublish={handlePublish}
        onRestore={handleRestore}
        setShowFeedbackDialog={setShowFeedbackDialog}
        setShowSettingsDialog={setShowSettingsDialog}
        onCopyJSON={handleCopyJSON}
        changesSaved={changesSaved}
      />
      {course.items.length === 0 ? (
        <NoItems editing />
      ) : (
        <Grid className={classes.container} container>
          <Grid className={classes.leftPanel} item xs={12} md={6}>
            {course.items.map((item) => (
              <Box key={item.id} id={item.id} marginBottom={3}>
                <EditableItem
                  item={item}
                  focused={item.id === currentItemId}
                  onFocus={handleFocus}
                  onChangeItem={handleChangeItem}
                  onClickMove={() => setOpenReorderDialog(true)}
                  onClickDelete={handleDeleteItem}
                  setChangesSaved={setChangesSaved}
                />
              </Box>
            ))}
          </Grid>
          <Hidden smDown>
            <Grid className={classes.rightPanel} item xs={false} md={6}>
              <Box width="100%" marginBottom={3}>
                {currentItemId ? (
                  <Item key={currentItemId} item={currentItem} />
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
      )}
      <ReorderItemsDialog
        items={course.items}
        open={openReorderDialog}
        setOpen={setOpenReorderDialog}
        onReorderItems={handleUpdateItems}
      />
      <FeedbackDialog
        open={showFeedbackDialog}
        setOpen={setShowFeedbackDialog}
        sentFrom="editor"
      />
      <EditorSettingsDialog
        open={showSettingsDialog}
        setOpen={setShowSettingsDialog}
        currentSettings={course.settings}
        onSaveSettings={handleSaveSettings}
      />
      <AddItemFab onAddItem={handleAddItem} />
    </>
  );
}
