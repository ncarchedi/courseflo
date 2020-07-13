import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FancyTable from "./FancyTable";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getUserCoursesFromFirestore } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
  },
}));

const getSubmissions = (userCourses) => {
  return (
    userCourses
      // ignore userCourses that haven't been submitted
      .filter((sub) => sub.submitted)
      .map((sub) => ({
        email: sub.userEmail || "<None>",
        submitted: moment(sub.submitted.toDate()).format("YYYY-MM-DD hh:mm a"),
        numCorrect: sub.score.numCorrect,
        numQuestions: sub.score.numTotal,
        percCorrect: sub.score.percCorrect,
      }))
  );
};

export default function Analytics({
  courses,
  initialCourseId,
  setShowAnalytics,
}) {
  const classes = useStyles();
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [userCourses, setUserCourses] = useState();

  useEffect(() => {
    const setUserCoursesAsync = async () => {
      setUserCourses(await getUserCoursesFromFirestore(selectedCourseId));
    };

    selectedCourseId && setUserCoursesAsync();
  }, [selectedCourseId]);

  // wait until userCourses is loaded before doing anything
  if (!userCourses) return null;

  const tableData = {
    columns: [
      { title: "Email", field: "email", type: "string" },
      { title: "Submitted", field: "submitted", type: "string" },
      { title: "# Correct", field: "numCorrect", type: "numeric" },
      { title: "# Questions", field: "numQuestions", type: "numeric" },
      { title: "Score (%)", field: "percCorrect", type: "numeric" },
    ],
    data: getSubmissions(userCourses),
  };

  const handleChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  return (
    <>
      <Box>
        <Button
          onClick={() => setShowAnalytics(false)}
          startIcon={<ArrowBackIcon />}
        >
          Back to my courses
        </Button>
      </Box>
      <Box mt={1} mb={2}>
        <Typography variant="h5" color="inherit">
          Analytics
        </Typography>
      </Box>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="course-select-label">Course</InputLabel>
        <Select
          labelId="course-select-label"
          value={selectedCourseId}
          onChange={handleChange}
          label="Course"
        >
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FancyTable tableData={tableData} />
    </>
  );
}
