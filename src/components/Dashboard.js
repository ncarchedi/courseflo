import React, { useState, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DashboardHeader from "./DashboardHeader";
import NotFound from "./NotFound";
import FeedbackModal from "./FeedbackModal";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, "auto"),
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  card: {
    width: 250,
    margin: theme.spacing(2, "auto"),
  },
  cardContent: {
    textAlign: "center",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  shareIcon: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { userId } = useParams();
  const { user, userLoading } = useContext(UserContext);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // do nothing until user is done loading
  if (userLoading) return null;

  // if user is not logged in, redirect to landing page
  if (!user) return <Redirect to="/" />;

  // if the user is logged in, but not on their dashboard, show 404
  if (user && user.uid !== userId) return <NotFound type="page" />;

  const CourseCard = ({ title, updated }) => {
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Updated {updated}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Tooltip title="Share">
            <IconButton color="inherit">
              <ShareOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="inherit">
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  };

  const courses = [
    { id: 1, title: "My Really Cool Course", updated: "June 28, 2020" },
    { id: 2, title: "My Slightly Less Cool Course", updated: "June 25, 2020" },
    { id: 3, title: "My Blah Course", updated: "September 19, 2019" },
    { id: 4, title: "My Really Cool Course", updated: "June 28, 2020" },
    { id: 5, title: "My Slightly Less Cool Course", updated: "June 25, 2020" },
    { id: 6, title: "My Blah Course", updated: "September 19, 2019" },
  ];

  return (
    <>
      <DashboardHeader setShowFeedbackModal={setShowFeedbackModal} />
      <Container className={classes.container} maxWidth="md">
        {courses.map((course) => (
          <CourseCard
            key={course.id} // todo: how to use actual course IDs?
            title={course.title}
            updated={course.updated}
          />
        ))}
      </Container>
      <FeedbackModal
        open={showFeedbackModal}
        setOpen={setShowFeedbackModal}
        sentFrom="dashboard"
      />
    </>
  );
}
