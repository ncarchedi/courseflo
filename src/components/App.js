import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Course from "./Course";
import Score from "./Score";
import FeedbackModal from "../components/FeedbackModal";
import NotFound from "../components/NotFound";
import isAnswerCorrect from "../utils/isAnswerCorrect";
import countItemsRemaining from "../utils/countItemsRemaining";
import createItem from "../utils/createItem";
import {
  saveSubmissionToFirestore,
  getCourseFromFirestore,
  updateCourseItemsInFirestore,
} from "../services/firestore";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, "auto", 12, "auto"),
    maxWidth: theme.breakpoints.values.sm + 75,
  },
}));

export default function App() {
  const classes = useStyles();
  let { path } = useRouteMatch();
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [show404, setShow404] = useState(false);

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

  // initialize the answers array
  useEffect(() => {
    // once the course has been loaded into state
    if (course) {
      let a = [];
      course.items.forEach((item) => {
        // for each item type that requires a response
        if (!["Text", "Video", "Image"].includes(item.type)) {
          a.push({
            itemId: item.id,
            value: item.type === "MultiSelect" ? [] : "",
            solution: item.solution,
            isCorrect: false,
          });
        }
      });
      setAnswers(a);
    }
  }, [course]);

  // save answers to firebase when user submits
  useEffect(() => {
    if (showSolutions && courseId) {
      saveSubmissionToFirestore(courseId, answers);
    }
  }, [courseId, answers, showSolutions]);

  const getSolution = (itemId) => {
    const item = course.items.filter((i) => i.id === itemId)[0];
    return item.solution;
  };

  const handleChangeAnswer = (itemId, value) => {
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

  const handleSaveItemChange = (itemId, updatedItem) => {
    const updatedItems = [...course.items];
    const index = updatedItems.findIndex((item) => item.id === itemId);
    updatedItems[index] = updatedItem;
    setCourse({ ...course, items: updatedItems });
    updateCourseItemsInFirestore(courseId, updatedItems);
  };

  const handleAddItem = (type) => {
    const items = [...course.items];
    const newItem = createItem(type);
    items.push(newItem);
    setCourse({ ...course, items: items });
    updateCourseItemsInFirestore(courseId, items);
  };

  const handleDeleteItem = (itemId) => {
    const items = [...course.items];
    const updatedItems = items.filter((item) => item.id !== itemId);
    setCourse({ ...course, items: updatedItems });
    updateCourseItemsInFirestore(courseId, updatedItems);
  };

  // generic function for updating items (e.g. for reordering them)
  const handleUpdateItems = (updatedItems) => {
    setCourse({ ...course, items: updatedItems });
    updateCourseItemsInFirestore(courseId, updatedItems);
  };

  // if the course isn't found, show 404
  if (show404) return <NotFound type="course" />;

  return (
    course && (
      <>
        <Header
          courseTitle={course.title}
          numRemaining={countItemsRemaining(answers)}
          showSolutions={showSolutions}
          setShowFeedbackModal={setShowFeedbackModal}
        />
        <FeedbackModal
          open={showFeedbackModal}
          setOpen={setShowFeedbackModal}
          courseId={courseId}
          answers={answers}
        />
        <Container className={classes.container}>
          <Switch>
            <Route exact path={path}>
              <Course
                items={course.items}
                answers={answers}
                onChangeAnswer={handleChangeAnswer}
                showSolutions={showSolutions}
                setShowSolutions={setShowSolutions}
              />
            </Route>
            <Route exact path={`${path}/edit`}>
              <Course
                items={course.items}
                answers={answers}
                onChangeAnswer={handleChangeAnswer}
                showSolutions={showSolutions}
                setShowSolutions={setShowSolutions}
                editable
                onSaveItemChange={handleSaveItemChange}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
                onUpdateItems={handleUpdateItems}
              />
            </Route>
            <Route exact path={`${path}/score`}>
              <Score message={course.finalMessage} answers={answers} />
            </Route>
            <Route path={`${path}/*`}>
              <NotFound type="page" />
            </Route>
          </Switch>
        </Container>
      </>
    )
  );
}
