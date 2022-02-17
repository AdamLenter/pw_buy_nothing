import React, { useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import ItemPage from "../items/ItemPage";
import ActiveInactiveDropDown from "./ActiveInactiveDropDown";

function BrowseCategory({ categories, items }) {
  
    const params = useParams();

    const categoryName = params.categoryName;

    const [activeInactiveBoth, setActiveInactiveBoth] = useState("Active");

    const filteredItems = items.filter((item) => item.categoryName === categoryName);

    let displayedItems = [];

    if(activeInactiveBoth === "Both") {
      displayedItems = [...filteredItems];
    }
    else {
      displayedItems = filteredItems.filter((item) => item.status === activeInactiveBoth);
    }


    return (
      <div>
        <h1>Browse Category:  {categoryName}</h1>
        <div className = "pageDiv">
          <ActiveInactiveDropDown defaultValue = {displayedItems} setActiveInactiveBoth = {setActiveInactiveBoth} />
          <ItemPage items = {displayedItems} /> 
        </div>
      </div>
      )
    }

export default BrowseCategory;