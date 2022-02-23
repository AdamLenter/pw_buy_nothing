import React, { useContext } from "react";
import ProfileScreen from "../ProfileScreen";
import { useParams } from "react-router-dom";



function ShowProfile({ users, formatGivenDate }) {
    const params = useParams();
    console.log(params);
    const userId = params.userId;
    

    const userInfo = users.find((user) => user.id == userId);

    return (
        userInfo ? (<ProfileScreen profileUserInfo = {userInfo} formatGivenDate = {formatGivenDate} />) : <div>Loading...</div>
        
    )
    }

export default ShowProfile;