import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Moment from "react-moment";

// Material ui
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

function ProfileDetails({ userCredentials }) {
  return (
    <div className="profile-details">
      <MuiLink
        component={Link}
        to={`/users/${userCredentials.name}`}
        color="primary"
        variant="h5"
      >
        @{userCredentials.name}
      </MuiLink>
      <hr />
      {userCredentials.bio && (
        <Typography variant="body2">{userCredentials.bio}</Typography>
      )}
      <hr />
      {userCredentials.location && (
        <Fragment>
          <LocationOnIcon color="primary" />{" "}
          <span>{userCredentials.location}</span>
          <hr />
        </Fragment>
      )}
      {userCredentials.website && (
        <Fragment>
          <LinkIcon color="primary" />
          <a
            href={userCredentials.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"  "}
            {userCredentials.website}
          </a>
          <hr />
        </Fragment>
      )}
      <CalendarTodayIcon color="primary" />
      {"  "}
      <span>
        Joined {<Moment format="MMM YYYY">{userCredentials.createdAt}</Moment>}
      </span>
    </div>
  );
}

export default ProfileDetails;
