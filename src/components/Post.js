import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";

// Material-ui
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/ChatBubbleRounded";

// Components
import CustomButton from "../components/layouts/CustomButton";
import LikeButton from "./postcard/LikeButton";
import DeleteButton from "./postcard/DeleteButton";

const styles = (theme) => ({
  card: {
    display: "flex",
    position: "relative",
    marginBottom: "1rem",
    minHeight: "150px",
    maxHeight: "150px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.dark,
    boxShadow:
      "rgba(255, 0, 0, 0.117647) 0px 1px 6px, rgba(255, 0, 0, 0.117647) 0px 1px 4px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.6em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
      outlineColor: "#eee",
    },
  },

  content: {
    padding: "0.5rem 2rem 0.5rem 2rem",
    objectFit: "cover",
  },
  avatar: {
    minWidth: 200,
    objectFit: "contain",
  },
  name: {
    fontSize: 12,
    textAlign: "inherit",
  },
});

class Post extends Component {
  render() {
    const {
      post: {
        postId,
        likes,
        userAvatar,
        genre,
        username,
        comments,
        createdAt,
        title,
        description,
      },
      classes,
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userAvatar}
          title="Profile avatar"
          className={classes.avatar}
        />
        <CardContent className={classes.content}>
          <Typography
            color="primary"
            variant="h5"
            component={Link}
            to={`/posts/${postId}`}
          >
            {title}
          </Typography>

          <br />

          <Typography
            className={classes.name}
            component={Link}
            to={`/profile/${username}`}
          >
            by {username}
          </Typography>
          {/* DeleteButton */}
          <DeleteButton post={this.props.post} user={this.props.user} />
          <Typography variant="body2" color="textSecondary">
            <Moment fromNow>{createdAt}</Moment>
          </Typography>
          <Typography variant="body1">{description}</Typography>
          {/* LikeButton */}
          <LikeButton post={this.props.post} user={this.props.user} />
          <span>{likes} Likes</span>
          {/* CommentButton */}
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{comments} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
