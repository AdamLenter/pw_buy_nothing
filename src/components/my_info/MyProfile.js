import React from "react";
import ProfileScreen from "../ProfileScreen";



function MyProfile({ userInfo, formatGivenDate }) {  
  if(userInfo) {
    return (
      <ProfileScreen loggedInUserInfo = {userInfo} profileUserInfo = {userInfo} formatGivenDate = {formatGivenDate} />
    )
    }
  else {
    return(
      <div>Loading...</div>
    )
  }
}

export default MyProfile;