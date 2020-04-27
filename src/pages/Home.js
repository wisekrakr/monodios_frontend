import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Material/ui
import Grid from "@material-ui/core/Grid";

//Functions
import { getAllPosts } from "../actions/posts";

//Components
import Spinner from "../components/layouts/Spinner";
import Post from "../components/Post";
import Profile from "../components/Profile";

class Home extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    const {
      isAuthenticated,
      posts: { posts, loadingPosts },
    } = this.props;

    let postsGrid = !loadingPosts ? (
      <Grid item sm={8} xs={12}>
        {posts.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
      </Grid>
    ) : (
      <Spinner text={"Loading posts"} />
    );

    const profileGrid = (
      <Grid item sm={4} xs={12}>
        <Profile isAuthenticated={isAuthenticated} />
      </Grid>
    );

    return (
      <Grid container spacing={8}>
        {postsGrid}
        {profileGrid}
      </Grid>
    );
  }
}

Home.propTypes = {
  posts: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  getAllPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAllPosts })(Home);
