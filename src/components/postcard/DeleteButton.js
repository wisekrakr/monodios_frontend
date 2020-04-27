import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material ui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// Components
import CustomButton from "../layouts/CustomButton";

// Icons
import DeleteIcon from "@material-ui/icons/DeleteOutlineRounded";

// Functions
import { deletePost } from "../../actions/posts";

const styles = (theme) => ({
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "0%",
  },
  deleteIcon: {
    color: theme.palette.primary.danger,
  },
});

function DeleteButton({ post, user, isAuthenticated, deletePost, classes }) {
  const [open, setOpen] = useState(false);

  const deletingPost = () => {
    deletePost(post.postId);
    setOpen(false);
  };

  const checkForUserAndPost = () => {
    if (user !== null && post.username === user.name) {
      return true;
    }
  };

  return isAuthenticated && checkForUserAndPost() ? (
    <Fragment>
      <CustomButton
        tip="Delete post"
        onClick={() => setOpen(true)}
        btnClassName={classes.deleteButton}
      >
        <DeleteIcon className={classes.deleteIcon} />
      </CustomButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Deleting: {post.title}, are you sure {user.name}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={deletingPost} className={classes.deleteIcon}>
            Delete
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  ) : null;
}

DeleteButton.propTypes = {
  isAuthenticated: PropTypes.bool,
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapActionsToProps = {
  deletePost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(DeleteButton));
