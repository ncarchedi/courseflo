import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
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

// https://material-ui-pickers.dev/getting-started/installation
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles((theme) => ({
  filtersContainer: {
    marginBottom: theme.spacing(2),
  },
  overviewContainer: {
    padding: theme.spacing(2, 3),
    marginBottom: theme.spacing(2),
  },
  overviewStat: {
    marginRight: theme.spacing(1),
  },
  reviewContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3),
    backgroundColor: "inherit",
  },
}));

export default function Analytics({
  courses,
  initialCourseId,
  setShowAnalytics,
}) {
  const classes = useStyles();
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [selectedSubmission, setSelectedSubmission] = useState();
  const [userCourses, setUserCourses] = useState();
  const [startDate, setStartDate] = useState(moment().subtract(30, "days"));
  const [endDate, setEndDate] = useState(moment());

  useEffect(() => {
    selectedCourseId &&
      getUserCoursesFromFirestore(selectedCourseId)
        .then((allUserCourses) => {
          const cleanUserCourses = allUserCourses
            // ignore userCourses that don't have a userItems field (legacy issue)
            .filter((uc) => uc.userItems)
            // format created and submitted dates properly
            .map((uc) => ({
              ...uc,
              created: moment(uc.created.toDate()),
              submitted: uc.submitted ? moment(uc.submitted.toDate()) : null,
            }))
            // filter by start and end dates (inclusive)
            .filter(
              (uc) =>
                uc.created.isSameOrAfter(startDate.startOf("day")) &&
                uc.created.isSameOrBefore(endDate.endOf("day"))
            );
          setUserCourses(cleanUserCourses);
        })
        .catch((error) =>
          console.error("Error loading user courses from Firestore:", error)
        );
  }, [selectedCourseId, startDate, endDate]);

  // get all relevant submissions
  const submissions = useMemo(
    () =>
      userCourses &&
      // submitted before the specified end date
      userCourses.filter(
        (uc) => uc.submitted && uc.submitted.isSameOrBefore(endDate)
      ),
    [userCourses, endDate]
  );

  // construct data for overview pane
  const numStarts = userCourses && userCourses.length;
  const numSubmissions = submissions && submissions.length;

  // construct data for submissions table
  const tableData = useMemo(
    () =>
      submissions && {
        columns: [
          { title: "Email", field: "email", type: "string" },
          { title: "Started", field: "started", type: "string" },
          {
            title: "Submitted",
            field: "submitted",
            type: "string",
            defaultSort: "desc",
          },
          { title: "# Correct", field: "numCorrect", type: "numeric" },
          { title: "# Graded", field: "numQuestions", type: "numeric" },
          { title: "Score (%)", field: "percCorrect", type: "numeric" },
        ],
        data: submissions.map((sub) => ({
          ...sub,
          email: sub.userEmail || "<None>",
          started: sub.created.format("YYYY-MM-DD hh:mm A"),
          submitted: sub.submitted.format("YYYY-MM-DD hh:mm A"),
          numCorrect: sub.score.numCorrect,
          numQuestions: sub.score.numTotal,
          percCorrect: sub.score.numTotal > 0 ? sub.score.percCorrect : "N/A",
        })),
      },
    [submissions]
  );

  const handleChangeCourse = (event) => {
    setSelectedSubmission(null);
    setSelectedCourseId(event.target.value);
  };

  const handleChangeStartDate = (date) => {
    setStartDate(date);
  };

  const handleChangeEndDate = (date) => {
    setEndDate(date);
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
        <Typography variant="h5" component="h2" color="inherit">
          Analytics
        </Typography>
      </Box>

      {/* top-level filters */}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid className={classes.filtersContainer} container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="course-select-label">Course</InputLabel>
              <Select
                labelId="course-select-label"
                value={selectedCourseId || ""}
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
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={handleChangeStartDate}
              inputVariant="outlined"
              format="YYYY-MM-DD"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              label="End date"
              value={endDate}
              onChange={handleChangeEndDate}
              inputVariant="outlined"
              format="YYYY-MM-DD"
              fullWidth
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>

      {/* overview */}
      {userCourses && (
        <Paper className={classes.overviewContainer}>
          <Typography variant="h6" component="h3" gutterBottom>
            Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box display="flex" alignItems="baseline">
                <Typography
                  className={classes.overviewStat}
                  variant="h2"
                  component="h4"
                >
                  {numStarts}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  starts
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="baseline">
                <Typography
                  className={classes.overviewStat}
                  variant="h2"
                  component="h4"
                >
                  {numSubmissions}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  submissions
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* submissions table */}
      <SubmissionsTable
        tableData={tableData}
        selectedSubmission={selectedSubmission}
        setSelectedSubmission={setSelectedSubmission}
      />

      {/* submission details */}
      {selectedSubmission && (
        <Paper className={classes.reviewContainer} variant="outlined">
          <Typography variant="h6" component="h3">
            {`Submission Details (${
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
