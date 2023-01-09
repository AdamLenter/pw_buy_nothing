import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EnterLotteryScreen from "../find_things/EnterLotteryScreen";
import ItemSellerScreen from "../list_things/ItemSellerScreen";
import { Link } from "react-router-dom";
import LotteryEntry from "./LotteryEntry";

function Item({ userInfo, items, formatGivenDate, updateItems, changeItemStatus, createRecipientMessage, messages, enterLottery, sendSellerMessage, withdrawLotteryEntry }) {  

  const params = useParams();

  const itemId = parseInt(params.itemId, 10);
 
  const itemInfo = items.find((item) => item.id === itemId) 

  const [sendSellerMessageFormPresent, setSendSellerMessageFormPresent] = useState(false);
  const [sellerMessage, setSellerMessage] = useState("")
  const [sellerMessageSent, setSellerMessageSent] = useState(false)
  
  if(itemInfo) {    
    const listDate = new Date(itemInfo.listDate);
    const listTime = listDate.getTime();
    const lotteryTime = listTime + (60 * 60 * 24 * 1000);
    const lotteryDate = new Date(lotteryTime);

    const formattedListDate = formatGivenDate(listDate, 1);
    const formattedLotteryDate = formatGivenDate(lotteryDate, 1);
    
    const currentTime = new Date().getTime(); 
    const displayedEntries = itemInfo.lotteryEntries.filter((entry) => entry.status !== "withdrawn")
    
    function toggleActiveInactive() {
      changeItemStatus(itemInfo);
    }

    function toggleSendSellerMessageFormPresent() {
      setSendSellerMessageFormPresent(!sendSellerMessageFormPresent);
    }
    
    function updateSellerMessage(event) {
      setSellerMessage(event.target.value)
    }

    function sendMessage(event) {
      event.preventDefault();
      sendSellerMessage(userInfo, itemInfo, sellerMessage);
      setSellerMessageSent(true);
      setSellerMessage("");
    }

    return (
        <div className = "itemDiv">
          <h1>{itemInfo.name}</h1>
          <div className = "listingDiv">
            <div className = "listingColumn">
              <img src = {itemInfo.imageUrl} alt = {itemInfo.name} className = "listingImage" />
            </div>
            
            <div className = "listingColumn">
              <p>
                <strong>Description</strong>: {itemInfo.description}
                <br />
                <br />
               
                <strong>Status</strong>: {itemInfo.status}
                <br />
                <strong>Listing date</strong>: {formattedListDate}
                <br />
                <strong>Selection on or after</strong>: {formattedLotteryDate}
                <br />
                <strong>Seller</strong>: 
                  <span> </span>
                  <Link to = {`/showProfile/${itemInfo.sellerId}`}>{itemInfo.sellerFirstName} {itemInfo.sellerLastName}</Link>
                <br />

                {userInfo.id === itemInfo.sellerId ? (
                    <button onClick={toggleActiveInactive}>Make {itemInfo.status === "Active" ? "Inactive" : "Active"}</button> ) : 
                    (
                    <a href = "#" onClick = {() => toggleSendSellerMessageFormPresent()}>{sendSellerMessageFormPresent ? "Cancel message" : "Send seller message"}</a>
                    )
                  }
              </p>
            </div>
          </div>

          <div className = "lotteryDiv">
          {sendSellerMessageFormPresent && !sellerMessageSent ? (
            <form onSubmit = {(event) => sendMessage(event)}>
              <h2>Send Seller Message:</h2>
              <textarea value = {sellerMessage} onChange = {(event)=>updateSellerMessage(event)}></textarea>
              <button>Submit</button>  
              <br />     
            </form>
          ) : null}

          {sellerMessageSent ? (
            <div>
              <h2>Send Seller Message:</h2>
              <h3>Message sent</h3>
            </div>
          ) : null}
            <br />
            <h2>Lottery</h2>
            {displayedEntries.length > 0 ? displayedEntries.map((entry) => <LotteryEntry key = {entry.userId} item = {itemInfo} entry = {entry} withdrawButtonPresent = {userInfo.id === itemInfo.sellerId || userInfo.id === entry.userId} withdrawLotteryEntry = {withdrawLotteryEntry} />) : <span>(No entries yet)</span>}
          </div>
          {(userInfo.id === itemInfo.sellerId && currentTime >= lotteryTime) ? <ItemSellerScreen itemInfo = {itemInfo} eligibleEntries = {displayedEntries} updateItems = {updateItems} createRecipientMessage = {createRecipientMessage} messages = {messages} /> : null}

          {(userInfo.id !== itemInfo.sellerId) ? <EnterLotteryScreen userInfo = {userInfo} itemInfo = {itemInfo} enterLottery = {enterLottery} /> : null}


        </div>
      )
    }
  else {
    return(<div>
      <h1>No item to display</h1>
    </div>)
  }
  }

export default Item;