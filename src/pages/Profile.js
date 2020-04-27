import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Functions
import { getUserByName } from "../actions/users";

// Components
import Spinner from "../components/layouts/Spinner";
import Post from "../components/Post";

// Material ui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

const Profile = ({
  getUserByName,
  profile: { profile, loadingProfile },
  match,
  classes,
}) => {
  useEffect(() => {
    getUserByName(match.params.name);
  }, [getUserByName, match.params.name]);

  return !loadingProfile && profile !== null ? (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={8}>
          {profile.posts.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Grid>
      </Grid>
    </div>
  ) : (
    <Spinner text={"Loading Profile..."} />
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getUserByName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getUserByName })(
  withStyles(styles)(Profile)
);
