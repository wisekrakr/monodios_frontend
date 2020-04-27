import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import CustomButton from "../layouts/CustomButton";

// Icons
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";

// Functions
import { likePost, unlikePost } from "../../actions/likes";

function LikeButton({ post, user, isAuthenticated, likePost, unlikePost }) {
  const likedPost = () => {
    let likes = user !== null ? user.likes : [];
    if (likes && likes.find((like) => like.postId === post.postId)) return true;
    else return false;
  };

  return !isAuthenticated ? (
    <CustomButton tip="Like">
      <Link to="/login">
        <FavoriteBorderIcon color="primary" />
      </Link>
    </CustomButton>
  ) : likedPost() ? (
    <CustomButton tip="Dislike" onClick={() => unlikePost(post.postId)}>
      <FavoriteIcon color="primary" />
    </CustomButton>
  ) : (
    <CustomButton tip="Like" onClick={() => likePost(post.postId)}>
      <FavoriteBorderIcon color="primary" />
    </CustomButton>
  );
}

LikeButton.propTypes = {
  isAuthenticated: PropTypes.bool,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
