import React from "react";
import { Link } from "react-router-dom";

// Material-ui
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function EmptyProfile({ classes }) {
  return (
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
        No Profile Found, please login or register
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </div>
    </Paper>
  );
}

export default EmptyProfile;
