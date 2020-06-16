import React, { useState, useEffect, useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RootRef from "@material-ui/core/RootRef";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useDropzone } from "react-dropzone";
import { saveCourseToFirestore } from "../services/firestore";
import Emoji from "./Emoji";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3, "auto", 10, "auto"),
  },
  title: {
    marginBottom: theme.spacing(4),
    fontSize: "2.4rem",
  },
  dropzone: {
    padding: theme.spacing(3, 0, 2, 0),
    border: "dashed",
    borderWidth: 1,
    textAlign: "center",
    cursor: "pointer",
    outline: "none",
    color: theme.palette.text.secondary,
  },
  uploadIcon: {
    fontSize: theme.typography.h3.fontSize,
  },
  preContainer: {
    padding: theme.spacing(1, 2),
  },
  pre: {
    whiteSpace: "pre-wrap",
  },
  button: {
    margin: theme.spacing(2, "auto", 4, "auto"),
  },
}));

// details here: https://react-dropzone.js.org/
// and here: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
export default function Upload() {
  const classes = useStyles();
  const inputRef = useRef();
  const [newCourse, setNewCourse] = useState();
  const [courseId, setCourseId] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (newCourse) {
      saveCourseToFirestore(newCourse)
        .then((docRef) => setCourseId(docRef.id))
        .catch((error) =>
          console.error("Error uploading course to Firestore: ", error)
        );
    }
  }, [newCourse]);

  const renderSnackbar = () => {
    return (
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
          severity="error"
        >
          Upload failed! Make sure you're uploading a JSON file.
        </MuiAlert>
      </Snackbar>
    );
  };

  // https://stackoverflow.com/a/42844911/2338922
  const handleCopy = (e) => {
    inputRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const string = reader.result;
        setNewCourse(JSON.parse(string));
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/json",
    onDropRejected: () => setSnackbarOpen(true),
  });
  const { ref, ...rootProps } = getRootProps();

  // construct url to course
  const courseURL = `https://courseflo.com/course/${courseId}`;

  return (
    <Container className={classes.container} maxWidth="sm">
      {courseId ? (
        <>
          <Typography className={classes.title} variant="h2" align="center">
            Your Course is Live <Emoji symbol="🎉" label="party popper" />
          </Typography>
          <Typography variant="h6">
            Share your course with this link:
          </Typography>
          <TextField
            variant="outlined"
            inputRef={inputRef}
            onFocus={(e) => e.target.select()}
            value={courseURL}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleCopy}>
                    <FileCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Button
            className={classes.button}
            href={courseURL}
            target="_blank"
            rel="noopener"
            variant="contained"
            color="primary"
            size="large"
          >
            Take me to my course now!
          </Button>
          <Paper className={classes.preContainer}>
            <pre className={classes.pre}>
              {JSON.stringify(newCourse, null, 2)}
            </pre>
          </Paper>
        </>
      ) : (
        <>
          <Typography className={classes.title} variant="h2" align="center">
            Upload a Course <Emoji symbol="⚡" label="high voltage" />
          </Typography>
          <RootRef rootRef={ref}>
            <Paper className={classes.dropzone} {...rootProps} elevation={0}>
              <input {...getInputProps()} />
              <Typography gutterBottom>
                Drag-and-drop your course file here, or click to select a file
              </Typography>
              <CloudUploadIcon className={classes.uploadIcon} />
            </Paper>
          </RootRef>
        </>
      )}
      {renderSnackbar()}
    </Container>
  );
}
