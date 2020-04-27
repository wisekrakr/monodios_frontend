import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Material/ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Typography from "@material-ui/core/Typography";
//Icons
import KeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/LockOpen";
import TvOffIcon from "@material-ui/icons/TvOff";
import AddIcon from "@material-ui/icons/Add";
import NotificationIcon from "@material-ui/icons/NotificationImportant";

// Components
import CustomButton from "../layouts/CustomButton";
import AddPost from "../AddPost";

//Functions
import { logoutUser } from "../../actions/authentication";

class NavBar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    let showAppropriateIcons = () => {
      return isAuthenticated && user !== null ? (
        <Fragment>
          {/* <CustomButton
            onClick={() => {
              console.log("add");
            }}
            tip="Add a Post"
          >
            <AddIcon color="secondary" />
          </CustomButton> */}
          <AddPost />
          <CustomButton tip="Notifications">
            <NotificationIcon color="secondary" />
          </CustomButton>
          <CustomButton onClick={() => this.props.logoutUser()} tip="Logout">
            <TvOffIcon color="secondary" />
          </CustomButton>

          {/* <div>Welcome, {user !== null ? user.name : ""}</div> */}
        </Fragment>
      ) : (
        <Fragment>
          <Link to="/login">
            <CustomButton tip="Login">
              <KeyIcon color="secondary" />
            </CustomButton>
          </Link>
          <Link to="/register">
            <CustomButton tip="Register">
              <LockIcon color="secondary" />
            </CustomButton>
          </Link>
        </Fragment>
      );
    };
    return (
      <AppBar color="primary">
        <Toolbar>
          {" "}
          <Link to="/">
            <Typography variant="h6" color="textSecondary">
              W.I.S.E.
            </Typography>
          </Link>
          <div className="navbar">
            <Link to="/home">
              <CustomButton tip="Home">
                <HomeRoundedIcon color="secondary" />
              </CustomButton>
            </Link>

            {showAppropriateIcons()}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
