import React from "react";
import ProfileScreen from "../ProfileScreen";
import { useParams } from "react-router-dom";



function ShowProfile({ userInfo, users, formatGivenDate }) {
    const params = useParams();
    console.log(params);
    const userId = params.userId;
    

    const profileUserInfo = users.find((user) => user.id == userId);

    return (
        profileUserInfo ? (<ProfileScreen loggedInUserInfo = {userInfo} profileUserInfo = {profileUserInfo} formatGivenDate = {formatGivenDate} />) : <div>Loading...</div>
    )
    }

export default ShowProfile;