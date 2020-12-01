import React from "react";
import UserProfileComponent from "../components/UserProfileComponent";

function UserProfile({ userInfo }) {
  return (
    <div>
      <h1>User Profile</h1>
      <UserProfileComponent userInfo={userInfo} />
    </div>
  );
}

export default UserProfile;
