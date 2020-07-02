import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import UpdateIcon from "@material-ui/icons/Update";
import DashboardHeader from "./DashboardHeader";
// import NotFound from "./NotFound";
import FeedbackModal from "./FeedbackModal";
import UserContext from "../context/UserContext";
import createCourse from "../utils/createCourse";
import {
  getUserCoursesFromFirestore,
  saveCourseToFirestore,
  deleteCourseFromFirestore,
} from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, "auto"),
  },
  card: {
    minHeight: 190,
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
    backgroundColor: theme.palette.grey[200],
  },
  updateIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

// const fakeCourses = [
//   { id: 1, title: "My Really Cool Course", updated: "June 28, 2020" },
//   { id: 2, title: "My Slightly Less Cool Course", updated: "June 25, 2020" },
//   {
//     id: 3,
//     title: "My Blah Course That Has a Crazy Long Title",
//     updated: "September 19, 2019",
//   },
//   { id: 4, title: "My Other Really Cool Course", updated: "May 12, 2019" },
// ];

export default function Dashboard() {
  const classes = useStyles();
  // const { userId } = useParams();
  const [user, userLoading] = useContext(UserContext);
  const [courses, setCourses] = useState();
  const [newCourseId, setNewCourseId] = useState();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // update the browser tab title
    document.title = "Courseflo - Dashboard";

    const setUserCourses = async () => {
      const userCourses = await getUserCoursesFromFirestore(user.uid);
      setCourses(userCourses);
    };

    user && setUserCourses();
  }, [user]);

  // do nothing until user and courses are done loading
  if (userLoading || !courses) return null;

  // redirect when user creates a new course
  if (newCourseId) return <Redirect to={`/course/${newCourseId}/edit`} />;

  // if user is not logged in, redirect to landing page
  if (!user) return <Redirect to="/" />;

  // // if the user is logged in, but not on their dashboard, show 404
  // if (user && user.uid !== userId) return <NotFound type="page" />;

  const handleCreateCourse = () => {
    const newCourse = createCourse(user.uid);
    saveCourseToFirestore(newCourse)
      .then((docRef) => setNewCourseId(docRef.id))
      .catch((error) =>
        console.error("Error saving course to Firestore: ", error)
      );
  };

  // https://stackoverflow.com/a/52033479/2338922
  // todo: confirm browser coverage is sufficient
  const handleShare = (courseId) => {
    setSnackbarOpen(true);
    navigator.clipboard.writeText(`https://courseflo.com/course/${courseId}`);
  };

  const handleDelete = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    deleteCourseFromFirestore(courseId);
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
          <Tooltip title="Preview">
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
          <Tooltip title="Delete">
            <IconButton color="inherit" onClick={() => handleDelete(id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  };

  const CreateCard = ({ paywall }) => {
    const [showPaywall, setShowPaywall] = useState(false);

    return (
      <>
        {showPaywall ? (
          <Card
            className={`${classes.card} ${classes.paywall}`}
            onMouseOver={() => setShowPaywall(true)}
            onMouseLeave={() => setShowPaywall(false)}
          >
            <CardContent>
              <Typography variant="h5">
                Course limit reached!{" "}
                <Link component={RouterLink} to="/pricing">
                  Upgrade now
                </Link>{" "}
                to create more.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Card
            className={classes.card}
            onMouseOver={() => setShowPaywall(true)}
          >
            <CardActionArea
              className={classes.cardActionArea}
              onClick={() => handleCreateCourse()}
              disabled={paywall}
            >
              <Typography variant="h5">New Course</Typography>
              <Box marginTop={1}>
                <AddCircleOutlineIcon fontSize="large" color="primary" />
              </Box>
            </CardActionArea>
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      <DashboardHeader setShowFeedbackModal={setShowFeedbackModal} />
      <Container className={classes.container} maxWidth="md">
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
            <CreateCard paywall={true} />
          </Grid>
        </Grid>
      </Container>
      <FeedbackModal
        open={showFeedbackModal}
        setOpen={setShowFeedbackModal}
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
