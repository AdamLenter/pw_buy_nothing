import React, { useContext } from "react";
import { UserContext } from "../../context/user";
import ItemPage from "../items/ItemPage";


function MyListings({ items }) {
  const userInfo = useContext(UserContext);
  const displayedItems = items.filter((item) => item.sellerId === userInfo.id);

  return (
    <div>
        <h1 className = "pageTitle">My Listings</h1>
        <ItemPage items = {displayedItems} />
    </div>
    )
  }

export default MyListings;