import React from "react";

function ProfileScreen({ loggedInUserInfo, profileUserInfo, formatGivenDate }) {
    
    let userSinceDate;
    if(profileUserInfo.memberSince) {
        userSinceDate = new Date(profileUserInfo.memberSince);
    }
    
    return (
        <div>
            <h1 className = "pageTitle">
            {loggedInUserInfo.id === profileUserInfo.id ? "My Profile" : "Profile"}
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
                    <strong>Member since</strong>: {userSinceDate ? formatGivenDate(userSinceDate, 0) : ""}
                </p>
                </div>
            </div>
        </div>
        )
    }

export default ProfileScreen;