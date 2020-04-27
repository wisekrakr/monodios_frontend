import React, { Fragment, Component } from "react";
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
import AddIcon from "@material-ui/icons/Add";

// Functions
import { addPost } from "../actions/posts";

// Components
import CustomButton from "./layouts/CustomButton";

import React, { Component } from "react";

class AddPost extends Component {
  render() {
    return (
      <CustomButton
        onClick={() => {
          console.log("add");
        }}
        tip="Add a Post"
      >
        <AddIcon color="secondary" />
      </CustomButton>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addPost })(
  withStyles(styles)(AddPost)
);
