import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RootRef from "@material-ui/core/RootRef";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
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
  dropzone: {
    padding: theme.spacing(3),
    border: "dashed",
    borderWidth: 1,
    textAlign: "center",
    cursor: "pointer",
    outline: "none",
    color: theme.palette.text.secondary,
  },
  icon: {
    fontSize: theme.typography.h4.fontSize,
  },
  preContainer: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 2),
  },
  pre: {
    whiteSpace: "pre-wrap",
  },
}));

// details here: https://react-dropzone.js.org/
// and here: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
export default function Editor() {
  const classes = useStyles();
  const [newCourse, setNewCourse] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (newCourse) {
      console.log("saving course to firestore!");
      // saveCourseToFirestore(newCourse);
    }
  }, [newCourse]);

  const renderSnackbar = () => {
    return (
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography variant="h2" align="center" gutterBottom>
        Create a Course <Emoji symbol="📝" label="memo" />
      </Typography>
      {newCourse ? (
        <>
          <TextField
            variant="outlined"
            defaultValue="http://some-product.io/course/vTmus95f8o9eEdMaqbWc"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() =>
                      console.log("course link copied to clipboard!")
                    }
                  >
                    <FileCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Paper className={classes.preContainer}>
            <pre className={classes.pre}>
              {JSON.stringify(newCourse, null, 2)}
            </pre>
          </Paper>
        </>
      ) : (
        <RootRef rootRef={ref}>
          <Paper className={classes.dropzone} {...rootProps} elevation={0}>
            <input {...getInputProps()} />
            <Typography gutterBottom>
              Drag-and-drop your course file here, or click to select a file
            </Typography>
            <CloudUploadIcon className={classes.icon} />
          </Paper>
        </RootRef>
      )}
      {renderSnackbar()}
    </Container>
  );
}
