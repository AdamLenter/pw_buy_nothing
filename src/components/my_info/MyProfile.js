import React, { useContext } from "react";
import { UserContext } from "../../context/user";
import ProfileScreen from "../ProfileScreen";



function MyProfile({ formatGivenDate }) {
  const userInfo = useContext(UserContext);
  
  if(userInfo) {
    return (
      <ProfileScreen profileUserInfo = {userInfo} formatGivenDate = {formatGivenDate} />
    )
    }
  else {
    return(
      <div>Loading...</div>
    )
  }
}

export default MyProfile;