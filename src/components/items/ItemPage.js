import React, { useState } from "react";
import ActiveInactiveDropDown from "../find_things/ActiveInactiveDropDown";
import Search from "../find_things/Search";
import ItemCard from "./ItemCard";

function ItemPage({ items }) {

  const [activeInactiveBoth, setActiveInactiveBoth] = useState("Active");
  const [searchTerm, setSearchTerm] = useState("");
  
  let filteredActiveInactiveItems = [];

  if(activeInactiveBoth === "Both") {
    filteredActiveInactiveItems = [...items];
  }
  else {
    filteredActiveInactiveItems = items.filter((item) => item.status === activeInactiveBoth);
  }

  let displayedItems = [];
  if(searchTerm) {
    displayedItems = filteredActiveInactiveItems.filter((item) => item.name.toUpperCase().includes(searchTerm.toUpperCase()));
  }
  else {
    displayedItems = [...filteredActiveInactiveItems];
  }


    return (
      <div>
        <ActiveInactiveDropDown defaultValue = {displayedItems} setActiveInactiveBoth = {setActiveInactiveBoth} />
        <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
          
        {displayedItems.map((item) => <ItemCard key = {item.id} item = {item}/>)}
      </div>
      )
    }

export default ItemPage;