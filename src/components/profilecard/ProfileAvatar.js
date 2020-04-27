import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Icons
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";

// Components
import CustomButton from "../layouts/CustomButton";

// Functions
import { uploadUserAvatar } from "../../actions/users";

function ProfileAvatar({ avatarUrl, uploadUserAvatar }) {
  const handleAvatarChange = (event) => {
    const avatar = event.target.files[0];
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);
    uploadUserAvatar(formData);
  };

  const handleUploadButton = () => {
    const fileInput = document.getElementById("avatarInput");
    fileInput.click();
  };

  return (
    <div className="image-wrapper">
      <img src={avatarUrl} alt="profile" className="profile-image" />
      <input
        type="file"
        id="avatarInput"
        hidden="hidden"
        onChange={handleAvatarChange}
      />
      <CustomButton
        onClick={handleUploadButton}
        btnClassName="button"
        tip="Edit profile avatar"
      >
        <AddPhotoIcon color="primary" />
      </CustomButton>
    </div>
  );
}

ProfileAvatar.propTypes = {
  uploadUserAvatar: PropTypes.func.isRequired,
};

export default connect(null, { uploadUserAvatar })(ProfileAvatar);
