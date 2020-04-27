import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Material-ui
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const backgroundImage =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
  },
  buttons: {
    marginLeft: "40%",
  },
  button: {
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  h5: {},
});

class Landing extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />;
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div id="index">
        <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="randomImage"
        />
        <Typography color="inherit" align="center" variant="h2" marked="center">
          World's Interconnective Study Experience
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
        >
          Your Personal Path To Knowledge
        </Typography>

        <div className={classes.buttons}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.button}
            href="/register"
          >
            Register
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.button}
            href="/login"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Landing));
