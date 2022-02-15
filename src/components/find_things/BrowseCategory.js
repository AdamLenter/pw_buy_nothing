import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import ItemPage from "../items/ItemPage";

function BrowseCategory({ categories, items }) {
    const params = useParams();

    const categoryName = params.categoryName;

    const displayedItems = items.filter((item) => item.categoryName === categoryName);
    
    return (
      <div>
        <h1>Browse Category:  {categoryName}</h1>
        <div className = "pageDiv">
          <ItemPage items = {displayedItems} /> 
        </div>
      </div>
      )
    }

export default BrowseCategory;