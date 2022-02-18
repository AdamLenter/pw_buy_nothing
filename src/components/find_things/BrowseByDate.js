import React, { useState } from "react";
import ItemPage from "../items/ItemPage";
import ActiveInactiveDropDown from "./ActiveInactiveDropDown";

function BrowseByDate({ categories, items }) {
  
    const [activeInactiveBoth, setActiveInactiveBoth] = useState("Active");

    let displayedItems = [];

    if(activeInactiveBoth === "Both") {
      displayedItems = [...items];
    }
    else {
      displayedItems = items.filter((item) => item.status === activeInactiveBoth);
    }
console.log(displayedItems);

    return (
      <div>
        <h1>Browse by Date:</h1>
        <div className = "pageDiv">
          <ActiveInactiveDropDown defaultValue = {displayedItems} setActiveInactiveBoth = {setActiveInactiveBoth} />
          <ItemPage items = {displayedItems} /> 
        </div>
      </div>
      )
    }

export default BrowseByDate;