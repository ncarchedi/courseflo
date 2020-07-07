import React, { useState, useEffect, useRef } from "react";
import {
  Switch,
  Route,
  Link as RouterLink,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CourseHeader from "./CourseHeader";
import Item from "./Item";
import Score from "./Score";
import Review from "./Review";
import FeedbackModal from "./FeedbackModal";
import NotFound from "./NotFound";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import initializeAnswers from "../utils/initializeAnswers";
import createItem from "../utils/createItem";
import {
  saveSubmissionToFirestore,
  getCourseFromFirestore,
} from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, "auto", 12, "auto"),
  },
  item: {
    marginTop: theme.spacing(3),
  },
  fabRight: {
    margin: 0,
    position: "fixed",
    top: "auto",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    left: "auto",
  },
  fabRightIcon: {
    marginLeft: theme.spacing(1),
  },
  fabLeft: {
    margin: 0,
    position: "fixed",
    top: "auto",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
    right: "auto",
  },
  fabLeftIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Course() {
  const classes = useStyles();
  const theme = useTheme();
  let { path, url } = useRouteMatch();
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // to ID user
  const [answers, setAnswers] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [show404, setShow404] = useState(false);
  const [itemNumber, setItemNumber] = useState(0);
  const notOnMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const continueRef = useRef(null);

  useEffect(() => {
    // if the ref exists, create keyboard shortcut
    if (continueRef && continueRef.current) {
      const listener = (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          continueRef.current.click();
        }
      };
      document.addEventListener("keydown", listener);

      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  });

  useEffect(() => {
    getCourseFromFirestore(courseId)
      .then((course) => {
        if (course.exists) {
          // extract the course data
          let courseData = course.data();
          // if collecting emails, prepend Email item
          if (courseData.settings && courseData.settings.collectEmails) {
            const emailItem = createItem("Email");
            courseData = {
              ...courseData,
              items: [emailItem, ...courseData.items],
            };
          }
          // load into state
          setCourse(courseData);
          // update the browser tab title dynamically
          document.title = courseData.title;
        } else {
          setShow404(true);
        }
      })
      .catch((error) =>
        console.error("Error loading course from Firestore:", error)
      );
  }, [courseId]);

  // initialize the answers array
  useEffect(() => {
    // once the course has been loaded into state
    if (course) initializeAnswers(course, setAnswers);
  }, [course]);

  // save answers to firebase when user submits
  useEffect(() => {
    if (showSolutions && courseId) {
      saveSubmissionToFirestore(courseId, userEmail, answers, course);
    }
  }, [courseId, userEmail, answers, course, showSolutions]);

  const getSolution = (itemId) => {
    const item = course.items.filter((i) => i.id === itemId)[0];
    return item.solution;
  };

  const handleChangeAnswer = (itemId, value) => {
    // if answers is undefined, do nothing
    if (!answers) return null;

    // otherwise, update it
    const otherAnswers = answers.filter((a) => a.itemId !== itemId);
    const solution = getSolution(itemId);

    setAnswers([
      ...otherAnswers,
      {
        itemId,
        value,
        solution,
        isCorrect: isAnswerCorrect(value, solution),
      },
    ]);
  };

  const handleFinishCourse = () => {
    setItemNumber(course.items.length);
    // use timeout so progress bar has time to advance to 100%
    setTimeout(() => {
      setShowSolutions(true);
    }, 500);
  };

  // if the course isn't loaded yet, return null
  if (!course) return null;

  // if the course isn't found, show 404
  if (show404) return <NotFound type="course" />;

  // single in on the current item
  const item = course.items[itemNumber];

  // compute progress percentage
  const progress = Math.min(
    course ? Math.round((itemNumber / course.items.length) * 100) : 0,
    100
  );

  return (
    <>
      <CourseHeader
        courseTitle={course.title}
        progress={progress}
        showProgress={!showSolutions}
        setShowFeedbackModal={setShowFeedbackModal}
      />
      <Container className={classes.container}>
        <Switch>
          <Route exact path={path}>
            {showSolutions ? (
              <>
                <Review
                  items={course.items}
                  answers={answers}
                  userEmail={userEmail}
                />
                <Zoom in>
                  <Fab
                    className={classes.fabRight}
                    component={RouterLink}
                    to={`${url}/score`}
                    variant="extended"
                    color="primary"
                    aria-label="submit"
                  >
                    Back to my score
                    <ArrowForwardIcon className={classes.fabRightIcon} />
                  </Fab>
                </Zoom>
              </>
            ) : (
              <>
                {item && (
                  <>
                    <Box className={classes.item}>
                      <Item
                        key={item.id}
                        item={item}
                        answer={
                          answers &&
                          answers.filter((a) => a.itemId === item.id)[0]
                        }
                        onChangeAnswer={handleChangeAnswer}
                        userEmail={userEmail}
                        setUserEmail={setUserEmail}
                      />
                    </Box>
                    {itemNumber > 0 && (
                      <Zoom in>
                        <Fab
                          className={classes.fabLeft}
                          onClick={() => setItemNumber(itemNumber - 1)}
                          variant={notOnMobile ? "extended" : "round"}
                          color="primary"
                          aria-label="go back"
                        >
                          {notOnMobile ? (
                            <>
                              <ArrowBackIcon className={classes.fabLeftIcon} />{" "}
                              Go back
                            </>
                          ) : (
                            <ArrowBackIcon />
                          )}
                        </Fab>
                      </Zoom>
                    )}
                    <Zoom in>
                      {itemNumber < course.items.length - 1 ? (
                        <Fab
                          ref={continueRef}
                          className={classes.fabRight}
                          onClick={() => setItemNumber(itemNumber + 1)}
                          variant={notOnMobile ? "extended" : "round"}
                          disabled={item.type === "Email" && !userEmail}
                          color="primary"
                          aria-label="continue"
                        >
                          {notOnMobile ? (
                            <>
                              Continue{" "}
                              <ArrowForwardIcon
                                className={classes.fabRightIcon}
                              />
                            </>
                          ) : (
                            <ArrowForwardIcon />
                          )}
                        </Fab>
                      ) : (
                        <Fab
                          ref={continueRef}
                          className={classes.fabRight}
                          component={RouterLink}
                          to={`${url}/score`}
                          onClick={handleFinishCourse}
                          variant="extended"
                          color="primary"
                          aria-label="submit"
                        >
                          I'm all done!
                          <ArrowForwardIcon className={classes.fabRightIcon} />
                        </Fab>
                      )}
                    </Zoom>
                  </>
                )}
              </>
            )}
          </Route>
          <Route exact path={`${path}/score`}>
            <Score
              message={course.finalMessage}
              finalCta={course.finalCta}
              answers={answers}
            />
          </Route>
          <Route path={`${path}/*`}>
            <NotFound type="page" />
          </Route>
        </Switch>
      </Container>
      <FeedbackModal
        open={showFeedbackModal}
        setOpen={setShowFeedbackModal}
        sentFrom="course"
        answers={answers}
      />
    </>
  );
}
