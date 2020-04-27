import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  progress: {
    margin: "auto",
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    padding: "1rem",
    color: "fff",
    display: "flex",
  },
  text: {
    paddingLeft: "1rem",
    alignText: "center",
  },
});

const Spinner = ({ classes, text }) => {
  return (
    <Card className={classes.progress}>
      <CircularProgress className={classes.circle} variant="indeterminate" />
      <Typography className={classes.text} variant="body2">
        {text}
      </Typography>
    </Card>
  );
};

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);
