import React from "react";
import ItemPage from "../items/ItemPage";
import ActiveInactiveDropDown from "./ActiveInactiveDropDown";
import Search from "./Search";

function BrowseByDate({ categories, items }) {

    return (
      <div>
        <h1>Browse by Date:</h1>
        <div className = "pageDiv">
          <ItemPage items = {items} /> 
        </div>
      </div>
      )
    }

export default BrowseByDate;