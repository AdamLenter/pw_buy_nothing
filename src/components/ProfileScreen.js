import React, { useContext } from "react";
import { UserContext } from "../context/user";

function ProfileScreen({ profileUserInfo, formatGivenDate }) {
    const userSinceDate = new Date(profileUserInfo.memberSince);
    const userInfo = useContext(UserContext);
    return (
        <div>
            <h1 className = "pageTitle">
            {userInfo.id === profileUserInfo.id ? "My Profile" : "Profile"}
            </h1>

            <div className = "listingDiv">
                <div className = "imageColumn">
                <img src = {profileUserInfo.imageUrl} alt = {`Profile picture of ${profileUserInfo.firstName} ${profileUserInfo.lastName}`} className = "profilePicture" />
                </div>
                
                <div className = "listingColumn">
                <p>
                    <strong>First name</strong>: {profileUserInfo.firstName}
                    <br />
                    <strong>Last name</strong>: {profileUserInfo.lastName}
                    <br />
                    <strong>Member since</strong>: {formatGivenDate(userSinceDate, 0)}
                </p>
                </div>
            </div>
        </div>
        )
    }

export default ProfileScreen;