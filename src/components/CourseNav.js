import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  fabContainer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    padding: theme.spacing(0, 3, 3),
    display: "flex",
    justifyContent: "space-between",
  },
  justifyRight: {
    justifyContent: "flex-end",
  },
  fabLeftIcon: {
    marginRight: theme.spacing(1),
  },
  fabRightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function CourseNav({
  itemNumber,
  onChangeItemNumber,
  setJumpToDialogOpen,
  setOpenCompleteCourseDialog,
  disableButtons,
  onLastItem,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const notOnMobile = useMediaQuery(theme.breakpoints.up("sm"));
  // const continueRef = useRef(null);

  // useEffect(() => {
  //   // if the ref exists, create keyboard shortcut
  //   if (continueRef && continueRef.current) {
  //     const listener = (event) => {
  //       if (event.code === "Enter" || event.code === "NumpadEnter") {
  //         event.preventDefault();
  //         continueRef.current.click();
  //       }
  //     };
  //     document.addEventListener("keydown", listener);

  //     return () => {
  //       document.removeEventListener("keydown", listener);
  //     };
  //   }
  // });

  return (
    <Box className={classes.fabContainer}>
      {/* Go back button */}
      <Box minWidth={notOnMobile ? 150 : 0}>
        {itemNumber > 0 && (
          <Zoom in>
            <Fab
              onClick={() => onChangeItemNumber(itemNumber - 1)}
              variant={notOnMobile ? "extended" : "round"}
              color="primary"
              aria-label="go back"
            >
              {notOnMobile ? (
                <>
                  <ArrowBackIcon className={classes.fabLeftIcon} /> Go back
                </>
              ) : (
                <ArrowBackIcon />
              )}
            </Fab>
          </Zoom>
        )}
      </Box>

      {/* Jump to button */}
      <Box>
        {notOnMobile && (
          <Zoom in>
            <Fab
              onClick={() => setJumpToDialogOpen(true)}
              variant="extended"
              color="primary"
              disabled={disableButtons}
              aria-label="jump to..."
            >
              Jump to...
            </Fab>
          </Zoom>
        )}
      </Box>

      {/* Continue button */}
      <Box minWidth={notOnMobile ? 150 : 0}>
        <Zoom in>
          {onLastItem ? (
            <Fab
              // ref={continueRef}
              onClick={() => setOpenCompleteCourseDialog(true)}
              variant="extended"
              color="primary"
              aria-label="submit"
            >
              I'm all done!
              <ArrowForwardIcon className={classes.fabRightIcon} />
            </Fab>
          ) : (
            <Fab
              // ref={continueRef}
              onClick={() => onChangeItemNumber(itemNumber + 1)}
              variant={notOnMobile ? "extended" : "round"}
              // force user to enter email before continuing
              disabled={disableButtons}
              color="primary"
              aria-label="continue"
            >
              {notOnMobile ? (
                <>
                  Continue <ArrowForwardIcon className={classes.fabRightIcon} />
                </>
              ) : (
                <ArrowForwardIcon />
              )}
            </Fab>
          )}
        </Zoom>
      </Box>
    </Box>
  );
}
