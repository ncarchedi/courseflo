import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10%",
  },
}));

export default function NoItems({ editing }) {
  const classes = useStyles();

  return editing ? (
    <Box className={classes.container} textAlign="center">
      <Typography variant="h4" gutterBottom>
        Let's get started!
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Box
          component="span"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Use the
          <Box component="span" mx={0.25}>
            <AddCircleOutlineOutlinedIcon />
          </Box>
          button below to add your first item
        </Box>
      </Typography>
    </Box>
  ) : (
    <Box className={classes.container} textAlign="center">
      <Typography variant="h2" gutterBottom>
        ¯\_(ツ)_/¯
      </Typography>
      <Typography variant="h4" gutterBottom>
        Sorry, this course is empty!
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Please reach out to the course author if you think something is wrong.
      </Typography>
    </Box>
  );
}
