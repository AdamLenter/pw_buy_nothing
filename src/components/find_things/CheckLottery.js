import React from "react";
import ItemPage from "../items/ItemPage";


function CheckLottery({ userInfo, items }) {
  
  const displayedItems = items.filter((item) => item.lotteryEntries.find((entry) => entry.userId === userInfo.id))
  
  return (
    <div>
       <h1 className = "pageTitle">Check Lottery Status</h1> 
        <ItemPage items = {displayedItems} />
    </div>
    )
  }

export default CheckLottery;