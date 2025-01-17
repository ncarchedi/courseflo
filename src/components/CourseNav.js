import React, { useEffect, useRef } from "react";
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
  setShowCompleteCourseDialog,
  onLastItem,
  disableContinue,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const notOnMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const backRef = useRef(null);
  const continueRef = useRef(null);

  // keyboard shortcut: shift + enter to go back
  useEffect(() => {
    // if the ref exists, create keyboard shortcut
    if (backRef && backRef.current) {
      const listener = (event) => {
        if (
          event.shiftKey &&
          (event.code === "Enter" || event.code === "NumpadEnter")
        ) {
          event.preventDefault();
          backRef.current.click();
        }
      };
      document.addEventListener("keydown", listener);

      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, []);

  // keyboard shortcut: enter (no shift) to continue
  useEffect(() => {
    // if the ref exists, create keyboard shortcut
    if (continueRef && continueRef.current) {
      const listener = (event) => {
        if (
          !event.shiftKey &&
          (event.code === "Enter" || event.code === "NumpadEnter")
        ) {
          event.preventDefault();
          continueRef.current.click();
        }
      };
      document.addEventListener("keydown", listener);

      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, []);

  return (
    <Box className={classes.fabContainer}>
      {/* Go back button */}
      <Box minWidth={notOnMobile ? 150 : 0}>
        <Zoom in>
          <Fab
            ref={backRef}
            onClick={() => onChangeItemNumber(itemNumber - 1)}
            variant={notOnMobile ? "extended" : "round"}
            color="primary"
            aria-label="go back"
            disabled={itemNumber === 0}
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
      </Box>

      {/* Jump to button */}
      <Box>
        {notOnMobile && (
          <Zoom in>
            <Fab
              onClick={() => setJumpToDialogOpen(true)}
              variant="extended"
              color="primary"
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
              ref={continueRef}
              onClick={() => setShowCompleteCourseDialog(true)}
              variant="extended"
              color="primary"
              aria-label="submit"
              disabled={disableContinue}
            >
              I'm all done!
              <ArrowForwardIcon className={classes.fabRightIcon} />
            </Fab>
          ) : (
            <Fab
              ref={continueRef}
              onClick={() => onChangeItemNumber(itemNumber + 1)}
              variant={notOnMobile ? "extended" : "round"}
              color="primary"
              aria-label="continue"
              disabled={disableContinue}
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
