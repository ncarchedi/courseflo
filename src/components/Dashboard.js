import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
// import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
// import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
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
} from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, "auto"),
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    width: 250,
    minHeight: 190,
    margin: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  cardActionArea: {
    flexGrow: 1,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  createCardActionArea: {
    height: "100%",
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
  const { user, userLoading } = useContext(UserContext);
  const [courses, setCourses] = useState();
  const [newCourseId, setNewCourseId] = useState();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    // update the browser tab title
    document.title = "Courseflo - Dashboard";

    const setUserCourses = async () => {
      const userCourses = await getUserCoursesFromFirestore(user.email);
      setCourses(userCourses);
    };

    user && setUserCourses();
  }, [user]);

  // do nothing until user and courses are done loading
  if (userLoading || !courses) return null;

  // redirect when user creates a new course
  if (newCourseId) return <Redirect to={`/course/${newCourseId}/edit`} />;

  // // if user is not logged in, redirect to landing page
  // if (!user) return <Redirect to="/" />;

  // // if the user is logged in, but not on their dashboard, show 404
  // if (user && user.uid !== userId) return <NotFound type="page" />;

  const CourseCard = ({ id, title, updated }) => {
    return (
      <Card className={classes.card}>
        <CardActionArea className={classes.cardActionArea}>
          <Link
            component={RouterLink}
            to={`/course/${id}/edit`}
            underline="none"
            color="inherit"
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
          </Link>
        </CardActionArea>
        {/* <CardActions className={classes.cardActions}>
          <Tooltip title="Preview">
            <IconButton
              color="inherit"
              onClick={() => console.log("preview " + id)}
            >
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton
              color="inherit"
              onClick={() => console.log("share " + id)}
            >
              <ShareOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="inherit"
              onClick={() => console.log("delete " + id)}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </CardActions> */}
      </Card>
    );
  };

  const handleCreateCourse = () => {
    const newCourse = createCourse(user.email);
    saveCourseToFirestore(newCourse)
      .then((docRef) => setNewCourseId(docRef.id))
      .catch((error) =>
        console.error("Error saving course to Firestore: ", error)
      );
  };

  const CreateCard = () => {
    return (
      <Card className={classes.card}>
        <CardActionArea
          className={classes.createCardActionArea}
          onClick={() => handleCreateCourse()}
        >
          <Typography variant="h5" component="h2">
            New Course
          </Typography>
          <Box marginTop={1}>
            <AddCircleOutlineIcon fontSize="large" color="primary" />
          </Box>
        </CardActionArea>
      </Card>
    );
  };

  return (
    <>
      <DashboardHeader setShowFeedbackModal={setShowFeedbackModal} />
      <Container className={classes.container} maxWidth="md">
        <Box className={classes.cardContainer}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              updated={moment(course.updated.toDate()).calendar()}
            />
          ))}
          <CreateCard />
        </Box>
      </Container>
      <FeedbackModal
        open={showFeedbackModal}
        setOpen={setShowFeedbackModal}
        sentFrom="dashboard"
      />
    </>
  );
}
