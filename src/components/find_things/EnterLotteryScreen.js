import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

function EnterLotteryScreen( { userInfo, itemInfo, enterLottery }){
    const [entryComment, setEntryComment] = useState("")
    
    function handleTextArea(event) {
        setEntryComment(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
        enterLottery(itemInfo, userInfo, entryComment)
    }

    let userAlreadyEntered = false;
    if(itemInfo.lotteryEntries.find((entry) => entry.userId === userInfo.id && !entry.status.includes("withdrawn")))
        {
        userAlreadyEntered = true;
        }

    return (
        <div>
            <h3>
                {itemInfo.lotteryEntries.find((entry)=>entry.status.includes("winner")) ? "Enter Waiting List" : "Enter Lottery"}
            </h3>

            <form onSubmit = {(event)=>handleSubmit(event)}>
                <label>Comment:</label>
                <br />
                <textarea disabled = {userAlreadyEntered}  value = {userAlreadyEntered ? "Thank you for your entry" : entryComment} onChange = {(event)=>handleTextArea(event)}></textarea>
                <br />
                <button disabled = {userAlreadyEntered}>Submit</button>
            </form>
        </div>
    )
}

export default EnterLotteryScreen;