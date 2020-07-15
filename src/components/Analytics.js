import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SubmissionsTable from "./SubmissionsTable";
import Review from "./Review";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getUserCoursesFromFirestore } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
  },
  reviewContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3),
    backgroundColor: "inherit",
  },
}));

const getSubmissions = (userCourses) => {
  return (
    userCourses
      // ignore userCourses that haven't been submitted
      .filter((sub) => sub.submitted)
      .map((sub) => ({
        ...sub,
        email: sub.userEmail || "<None>",
        submitted: moment(sub.submitted.toDate()).format("YYYY-MM-DD hh:mm A"),
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
  const [selectedSubmission, setSelectedSubmission] = useState();
  const [userCourses, setUserCourses] = useState();

  useEffect(() => {
    const setUserCoursesAsync = async () => {
      setUserCourses(await getUserCoursesFromFirestore(selectedCourseId));
    };

    selectedCourseId && setUserCoursesAsync();
  }, [selectedCourseId]);

  const tableData = useMemo(
    () => ({
      columns: [
        { title: "Email", field: "email", type: "string" },
        { title: "Submitted", field: "submitted", type: "string" },
        { title: "# Correct", field: "numCorrect", type: "numeric" },
        { title: "# Questions", field: "numQuestions", type: "numeric" },
        { title: "Score (%)", field: "percCorrect", type: "numeric" },
      ],
      data: userCourses && getSubmissions(userCourses),
    }),
    [userCourses]
  );

  const handleChangeCourse = (event) => {
    setSelectedSubmission(null);
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
          onChange={handleChangeCourse}
          label="Course"
        >
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <SubmissionsTable
        tableData={tableData}
        selectedSubmission={selectedSubmission}
        setSelectedSubmission={setSelectedSubmission}
      />
      {selectedSubmission && (
        <Paper className={classes.reviewContainer} variant="outlined">
          <Typography variant="h6">
            {`Detailed Review (${
              selectedSubmission.userEmail
                ? selectedSubmission.userEmail
                : selectedSubmission.submitted
            })`}
          </Typography>
          <Review
            items={selectedSubmission.course.items}
            userItems={selectedSubmission.userItems}
            hideFab
          />
        </Paper>
      )}
    </>
  );
}
