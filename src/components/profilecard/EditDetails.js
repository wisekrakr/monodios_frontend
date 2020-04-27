import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material ui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

//Icons
import EditIcon from "@material-ui/icons/Edit";

// Functions
import { updateUser } from "../../actions/users";

// Components
import CustomButton from "../layouts/CustomButton";

// Component style
const styles = (theme) => ({ ...theme.spreadThis });

const EditDetails = ({
  classes,
  updateUser,
  profile: { user, loadingProfile },
}) => {
  const [userDetails, setUserDetails] = useState({
    website: "",
    location: "",
    bio: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUserDetails({
      website:
        loadingProfile || !user.credentials.website
          ? ""
          : user.credentials.website,
      location:
        loadingProfile || !user.credentials.location
          ? ""
          : user.credentials.location,
      bio: loadingProfile || !user.credentials.bio ? "" : user.credentials.bio,
    });
  }, [loadingProfile, user]);

  const { website, location, bio } = userDetails;

  const onChange = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const toggleDialog = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(userDetails);
    toggleDialog();
  };

  return (
    <Fragment>
      <CustomButton
        onClick={toggleDialog}
        className={classes.button}
        tip="Edit profile"
      >
        <EditIcon color="primary" />
      </CustomButton>
      <Dialog open={open} onClose={toggleDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit your profile</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textfield}
              value={bio}
              onChange={onChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where does your bed sleep?"
              className={classes.textfield}
              value={location}
              onChange={onChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Where can people reach you?"
              className={classes.textfield}
              value={website}
              onChange={onChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { updateUser })(
  withStyles(styles)(EditDetails)
);
