import React, { useState } from "react";

function ItemSellerScreen({ itemInfo, eligibleEntries, updateItems, createRecipientMessage, messages }) {
    const lotteryWinner = itemInfo.lotteryEntries.find((entry) => entry.status.includes("winner"));

    const [winnerMessage, setWinnerMessage] = useState(lotteryWinner ? `Hi ${lotteryWinner.userFirstName}. You have been selected to receive my ${itemInfo.name}. Here is the best way to get it...` : "");
    const [lotteryConducted, setLotteryConducted] = useState(lotteryWinner ? true : false); 

    function conductLottery(){
        const winningEntryIndex = Math.floor(Math.random() * eligibleEntries.length);
        let updatedEntries = [...eligibleEntries];
        updatedEntries[winningEntryIndex].status = "winner not contacted";

        let updatedItem = {...itemInfo};
        updatedItem.lotteryEntries = updatedEntries;  
        updateItems(updatedItem);  

        setWinnerMessage(`Hi ${updatedEntries[winningEntryIndex].userFirstName}. You have been selected to receive my ${itemInfo.name}. Here is the best way to get it...`);
        setLotteryConducted(true);
        }

    function handleTextArea(event) {
        setWinnerMessage(event.target.value);
    }
    
    function handleSendMessageSubmit(event) {
        event.preventDefault();
        createRecipientMessage(itemInfo, winnerMessage);
    }

    if(!lotteryConducted) {
        return(
            <div>
                <button className = "conductLottery" onClick = {conductLottery} disabled = {itemInfo.lotteryEntries.length > 0 ? false : true}>CONDUCT LOTTERY</button>
            </div>
        )
    }
    else {
        
        if(!itemInfo.winnerContactedMessageId) {
            return (
                <form onSubmit = {(event)=>handleSendMessageSubmit(event)}>
                    <label>Recipient Selection Message:</label>
                    <br />
                    <textarea value = {winnerMessage} onChange = {handleTextArea}/>
                    <br />
                    <button>Send Message</button>
                </form>
            )
        }
        else {
            
            return(
            <div>
                <strong>Message Sent:</strong>
                <p>{winnerMessage}</p>
            </div>)
        }
    }
}

export default ItemSellerScreen;