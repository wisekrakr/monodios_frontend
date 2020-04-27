import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

// Components
import Spinner from "./layouts/Spinner";
import ProfileAvatar from "./profilecard/ProfileAvatar";
import ProfileDetails from "./profilecard/ProfileDetails";
import EmptyProfile from "./profilecard/EmptyProfile";
import EditDetails from "./profilecard/EditDetails";

// Functions
import { getCurrentUser } from "../actions/users";

// Page style
const styles = (theme) => ({
  paper: {
    padding: 20,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "contain",
      margin: "auto",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

const Profile = ({
  getCurrentUser,
  profile: { loadingProfile, user },
  isAuthenticated,
  classes,
}) => {
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const userCredentials = () => {
    if (user !== null && user !== undefined) {
      if (user.credentials !== null && user.credentials !== undefined) {
        return user.credentials;
      }
    }
  };

  let markUp = !loadingProfile ? (
    isAuthenticated && userCredentials() !== undefined ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <ProfileAvatar avatarUrl={userCredentials().avatarUrl} />
          <hr />
          <ProfileDetails userCredentials={userCredentials()} />
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <EmptyProfile classes={classes} />
    )
  ) : (
    <Spinner text={"Reload page please..."} />
  );

  return markUp;
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapActionsToProps = {
  getCurrentUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
