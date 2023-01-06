import React from "react";
import ItemPage from "../items/ItemPage";


function MyListings({ userInfo, items }) {
  const displayedItems = items.filter((item) => item.sellerId === userInfo.id);

  return (
    <div>
        <h1 className = "pageTitle">My Listings</h1>
        <ItemPage items = {displayedItems} />
    </div>
    )
  }

export default MyListings;