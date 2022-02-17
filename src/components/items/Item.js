import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/user";
import EnterLotteryScreen from "../find_things/EnterLotteryScreen";
import ItemSellerScreen from "../list_things/ItemSellerScreen";

function WinnerMessage() {
  return (
    <>
      <strong>WINNER:</strong>
      <br />
    </>
  )
}
function LotteryEntry({ entry }) {
  return(
    <div>
      <p className={entry.status.includes("winner") ? "lotteryEntry lotteryWinner" : "lotteryEntry"}>
        {entry.status.includes("winner") ? <WinnerMessage /> : null}
        <strong>{entry.userFirstName} {entry.userLastName}</strong>
        <span>: {entry.comment}</span>
      </p>
      <br />
    </div>
  )
}

function Item({ items, formatGivenDate, updateItems, createRecipientMessage, messages, enterLottery }) {  
  const userInfo = useContext(UserContext);

  const params = useParams();

  const itemId = parseInt(params.itemId, 10);
 
  const itemInfo = items.find((item) => item.id === itemId) 
  
  if(itemInfo) {    
    const listDate = new Date(itemInfo.listDate);
    const listTime = listDate.getTime();
    const lotteryTime = listTime + (60 * 60 * 24 * 1000);
    const lotteryDate = new Date(lotteryTime);

    const formattedListDate = formatGivenDate(listDate, 1);
    const formattedLotteryDate = formatGivenDate(lotteryDate, 1);
    
    const currentTime = new Date().getTime(); 
    const displayedEntries = itemInfo.lotteryEntries.filter((entry) => entry.status !== "withdrawn")  
  
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
                <strong>Seller</strong>: {itemInfo.sellerFirstName} {itemInfo.sellerLastName}        
              </p>
            </div>
          </div>

          <div className = "lotteryDiv">
            <h2>Lottery</h2>
            {displayedEntries ? displayedEntries.map((entry) => <LotteryEntry key = {entry.userId} entry = {entry} />) : <strong>None</strong>}
          </div>
          {(userInfo.id === itemInfo.sellerId && currentTime >= lotteryTime) ? <ItemSellerScreen itemInfo = {itemInfo} eligibleEntries = {displayedEntries} updateItems = {updateItems} createRecipientMessage = {createRecipientMessage} messages = {messages} /> : null}

          {(userInfo.id !== itemInfo.sellerId) ? <EnterLotteryScreen itemInfo = {itemInfo} enterLottery = {enterLottery} /> : null}


        </div>
      )
    }
  else {
    return(<div>Loading...</div>)
  }
  }

export default Item;