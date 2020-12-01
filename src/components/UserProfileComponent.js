import React from "react";

function UserProfileComponent({ userInfo }) {
  return (
    <div>
      <p>
        <strong>UID:</strong>
        {userInfo.uid}
      </p>
      <p>
        <strong>Email:</strong>
        {userInfo.email}
      </p>
      {/* <p>
        <strong>Display Name:</strong>
        {userInfo.email}
      </p> */}
    </div>
  );
}

export default UserProfileComponent;
