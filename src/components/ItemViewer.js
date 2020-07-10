import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Item from "./Item";
import NoItems from "./NoItems";
import JumpToItemDialog from "./JumpToItemDialog";
import CompleteCourseDialog from "./CompleteCourseDialog";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(3),
  },
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

export default function ItemViewer({
  items,
  answers,
  onChangeAnswer,
  showSolutions,
  setShowSolutions,
  orientation,
  itemNumber,
  setItemNumber,
  userEmail,
  setUserEmail,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const notOnMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [jumpToDialogOpen, setJumpToDialogOpen] = useState(false);
  const [openCompleteCourseDialog, setOpenCompleteCourseDialog] = useState(
    false
  );
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

  // if there are no items to show, show empty screen
  if (!items.length) return <NoItems />;

  const handleFinishCourse = () => {
    setItemNumber(items.length);
    // use timeout so progress bar has time to advance to 100%
    setTimeout(() => {
      setShowSolutions(true);
    }, 500);
  };

  const item = items[itemNumber];
  if (!item) return null;

  return (
    <>
      <Box className={classes.item}>
        <Item
          key={item.id}
          item={item}
          answer={answers && answers.filter((a) => a.itemId === item.id)[0]}
          onChangeAnswer={onChangeAnswer}
          showSolution={showSolutions}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      </Box>

      <Box className={classes.fabContainer}>
        {/* Go back button */}
        <Box minWidth={notOnMobile ? 150 : 0}>
          {itemNumber > 0 && !showSolutions && (
            <Zoom in>
              <Fab
                onClick={() => setItemNumber(itemNumber - 1)}
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
                disabled={item.type === "Email" && !userEmail}
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
            {itemNumber < items.length - 1 ? (
              <Fab
                // ref={continueRef}
                onClick={() => setItemNumber(itemNumber + 1)}
                variant={notOnMobile ? "extended" : "round"}
                // force user to enter email before continuing
                disabled={item.type === "Email" && !userEmail}
                color="primary"
                aria-label="continue"
              >
                {notOnMobile ? (
                  <>
                    Continue{" "}
                    <ArrowForwardIcon className={classes.fabRightIcon} />
                  </>
                ) : (
                  <ArrowForwardIcon />
                )}
              </Fab>
            ) : (
              <Fab
                // ref={continueRef}
                onClick={() => setOpenCompleteCourseDialog(true)}
                variant="extended"
                color="primary"
                aria-label="submit"
              >
                {showSolutions ? "Back to my score" : "I'm all done!"}
                <ArrowForwardIcon className={classes.fabRightIcon} />
              </Fab>
            )}
          </Zoom>
        </Box>
      </Box>
      <JumpToItemDialog
        items={items}
        itemNumber={itemNumber}
        setItemNumber={setItemNumber}
        open={jumpToDialogOpen}
        setOpen={setJumpToDialogOpen}
      />
      <CompleteCourseDialog
        onSubmit={handleFinishCourse}
        open={openCompleteCourseDialog}
        setOpen={setOpenCompleteCourseDialog}
      />
    </>
  );
}
