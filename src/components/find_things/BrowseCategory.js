import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import ItemPage from "../items/ItemPage";
import ActiveInactiveDropDown from "./ActiveInactiveDropDown";
import Search from "./Search";

function BrowseCategory({ items }) {
  
    const params = useParams();

    const categoryName = params.categoryName;

    const filteredByCategoryItems = items.filter((item) => item.categoryName === categoryName);

    return (
      <div>
        <h1>Browse Category:  {categoryName}</h1>
        <div className = "pageDiv">
          <ItemPage items = {filteredByCategoryItems} /> 
        </div>
      </div>
      )
    }

export default BrowseCategory;