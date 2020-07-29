import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import UpdateIcon from "@material-ui/icons/Update";

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 190,
    height: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardActionArea: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: "space-evenly",
  },
  updateIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

export default function CourseCard({
  id,
  title,
  updated,
  onClickAnalytics,
  onShare,
  onDuplicate,
  onClickDelete,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.cardActionArea}
        component={RouterLink}
        to={`/course/${id}/edit`}
      >
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Tooltip title="Last published">
              <UpdateIcon className={classes.updateIcon} />
            </Tooltip>
            <Typography variant="body2" color="textSecondary" component="p">
              {updated}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Tooltip title="Analytics">
          <IconButton color="inherit" onClick={() => onClickAnalytics(id)}>
            <TimelineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton
            color="inherit"
            component={RouterLink}
            to={`/course/${id}`}
            target="_blank"
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton color="inherit" onClick={() => onShare(id)}>
            <ShareOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Duplicate">
          <IconButton color="inherit" onClick={() => onDuplicate(id)}>
            <FileCopyOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="inherit" onClick={() => onClickDelete(id)}>
            <DeleteOutlinedIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
