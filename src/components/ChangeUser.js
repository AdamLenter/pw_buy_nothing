import React, {useState} from "react";

function ChangeUser({ userInfo, users, setUserInfo }) {
    
    const [newUserId, setNewUserID] = useState(null);
    const [userChanged, setUserChanged] = useState(false);

    if(userInfo && userInfo.id && !newUserId) {
        setNewUserID(userInfo.id); 
    }
    
    function updateUserId(event) {
        setNewUserID(event.target.value);

        if(event.target.value != userInfo.id) {
            setUserChanged(true);
            setUserInfo(users.find((user)=>user.id == event.target.value));
        }
        
    }
    
    return (
        <div>
            <h1 className = "pageTitle">Switch User</h1>

            {newUserId ? (
                <form>
                <label>New User: </label>
                <select value = {newUserId} onChange = {updateUserId}>
                    {users.map((user) => <option key = {user.id} value = {user.id}>{user.firstName} {user.lastName}</option>)}
                </select>

                {userChanged ? (
                    <div>
                        <br />
                        <span className = "changeUserMessage">Congratulations! You are now... </span>
                        <h2 className = "changeUserMessage">{userInfo.firstName} {userInfo.lastName}</h2>
                        <span className = "changeUserMessage">Enjoy your new identity.</span>
                    </div>
                    ) : null}
    
            </form>
            ) :
            <span>Loading...</span>
            }
        </div>
        )
    }

export default ChangeUser;