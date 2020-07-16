import React, { useState, useEffect, useContext } from "react";
import { Redirect, useParams, Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import UpdateIcon from "@material-ui/icons/Update";
import DashboardHeader from "./DashboardHeader";
import NotFound from "./NotFound";
import DeleteCourseDialog from "./DeleteCourseDialog";
import FeedbackDialog from "./FeedbackDialog";
import Analytics from "./Analytics";
// import Emoji from "./Emoji";
import UserContext from "../context/UserContext";
import SubscriberContext from "../context/SubscriberContext";
import createCourse from "../utils/createCourse";
import duplicateCourse from "../utils/duplicateCourse";
import {
  getAuthorCoursesFromFirestore,
  saveCourseToFirestore,
  deleteCourseInFirestore,
} from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, "auto"),
  },
  card: {
    minHeight: 190,
    height: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardActionArea: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: "space-evenly",
  },
  paywall: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.grey[100],
  },
  updateIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { userId } = useParams();
  const [user, userLoading] = useContext(UserContext);
  const subscriber = useContext(SubscriberContext);
  const [courses, setCourses] = useState();
  const [newCourseId, setNewCourseId] = useState();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState();

  useEffect(() => {
    // update the browser tab title
    document.title = "Courseflo - Dashboard";

    const setUserCourses = async () => {
      const userCourses = await getAuthorCoursesFromFirestore(user.uid);
      // don't show soft deleted courses in dashboard
      setCourses(userCourses.filter((course) => !course.deleted));
    };

    user && setUserCourses();
  }, [user]);

  // do nothing until user and courses are done loading
  if (userLoading || !courses) return null;

  // redirect when user creates a new course
  if (newCourseId) return <Redirect to={`/course/${newCourseId}/edit`} />;

  // if user is not logged in, redirect to landing page
  if (!user) return <Redirect to="/" />;

  // if the user is logged in, but not on their dashboard, show 404
  if (user && user.uid !== userId) return <NotFound type="page" />;

  const handleCreateCourse = () => {
    const newCourse = createCourse(user.uid);
    saveCourseToFirestore(newCourse)
      .then((docRef) => setNewCourseId(docRef.id))
      .catch((error) =>
        console.error("Error saving course to Firestore:", error)
      );
  };

  const handleClickAnalytics = (courseId) => {
    setSelectedCourseId(courseId);
    setShowAnalytics(true);
  };

  // https://stackoverflow.com/a/52033479/2338922
  // todo: confirm browser coverage is sufficient
  const handleShare = (courseId) => {
    setSnackbarOpen(true);
    const courseUrl = `${window.location.origin}/course/${courseId}`;
    navigator.clipboard.writeText(courseUrl);
  };

  const handleDuplicate = (courseId) => {
    const originalCourse = courses.filter(
      (course) => course.id === courseId
    )[0];
    const newCourse = duplicateCourse(originalCourse);
    saveCourseToFirestore(newCourse)
      .then((docRef) => setNewCourseId(docRef.id))
      .catch((error) =>
        console.error("Error saving course to Firestore:", error)
      );
  };

  const CourseCard = ({ id, title, updated }) => {
    return (
      <Card className={classes.card}>
        <CardActionArea
          className={classes.cardActionArea}
          component={RouterLink}
          to={`/course/${id}/edit`}
        >
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Tooltip title="Last update">
                <UpdateIcon className={classes.updateIcon} />
              </Tooltip>
              <Typography variant="body2" color="textSecondary" component="p">
                {updated}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Tooltip title="Analytics">
            <IconButton
              color="inherit"
              onClick={() => handleClickAnalytics(id)}
            >
              <TimelineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton
              color="inherit"
              component={RouterLink}
              to={`/course/${id}`}
              target="_blank"
            >
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton color="inherit" onClick={() => handleShare(id)}>
              <ShareOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duplicate">
            <IconButton color="inherit" onClick={() => handleDuplicate(id)}>
              <FileCopyOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="inherit" onClick={() => handleClickDelete(id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  };

  const CreateCard = ({ showPaywall }) => {
    // const [paywallVisible, setPaywallVisible] = useState(false);

    return (
      // <>
      //   {showPaywall && paywallVisible ? (
      //     <Card
      //       className={`${classes.card} ${classes.paywall}`}
      //       onMouseLeave={() => setPaywallVisible(false)}
      //     >
      //       <CardContent>
      //         <Typography variant="h5">
      //           <Link component={RouterLink} to="/pricing">
      //             Upgrade now
      //           </Link>{" "}
      //           to create more courses{" "}
      //           <Emoji symbol="📈" label="chart increasing" />
      //         </Typography>
      //       </CardContent>
      //     </Card>
      //   ) : (
      <Card
        className={classes.card}
        // onMouseOver={() => setPaywallVisible(true)}
      >
        <CardActionArea
          className={classes.cardActionArea}
          onClick={() => handleCreateCourse()}
        >
          <Typography variant="h5">New Course</Typography>
          <Box marginTop={1}>
            <AddCircleOutlineIcon fontSize="large" color="primary" />
          </Box>
        </CardActionArea>
      </Card>
      //   )}
      // </>
    );
  };

  const handleClickDelete = (courseId) => {
    setSelectedCourseId(courseId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    setCourses(courses.filter((course) => course.id !== selectedCourseId));
    deleteCourseInFirestore(selectedCourseId);
    setSelectedCourseId(); // reset selected course ID
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setSelectedCourseId(); // reset selected course ID
  };

  // is the user an active subscriber?
  const isSubscribed = subscriber && subscriber.active;

  // get the selected course
  const selectedCourse = courses.filter((c) => c.id === selectedCourseId)[0];

  return (
    <>
      <DashboardHeader
        isSubscribed={isSubscribed}
        setShowFeedbackDialog={setShowFeedbackDialog}
      />
      <Container className={classes.container} maxWidth="md">
        {showAnalytics ? (
          <Analytics
            courses={courses}
            initialCourseId={selectedCourseId}
            setShowAnalytics={setShowAnalytics}
          />
        ) : (
          <>
            <Box marginBottom={2}>
              <Typography variant="h5" color="inherit">
                My Courses
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {courses.map((course) => (
                <Grid item key={course.id} xs={12} sm={6} md={4}>
                  <CourseCard
                    id={course.id}
                    title={course.title}
                    updated={moment(course.updated.toDate()).calendar()}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4}>
                <CreateCard showPaywall={courses.length > 0 && !isSubscribed} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
      <DeleteCourseDialog
        open={showDeleteDialog}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        courseTitle={selectedCourse && selectedCourse.title}
      />
      <FeedbackDialog
        open={showFeedbackDialog}
        setOpen={setShowFeedbackDialog}
        sentFrom="dashboard"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          Course link copied to clipboard!
        </MuiAlert>
      </Snackbar>
    </>
  );
}
