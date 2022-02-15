import React from "react";
import { useHistory } from "react-router-dom";

function Category({ category } ) {

  const history = useHistory();

  return (
    <div className = "categoryDiv" onClick = {(() =>history.push(`/browseCategory/${category.name}`))}>
      <img src = {category.imageUrl} alt={category.name} className = "category_image" />
      <br />
      <strong>{category.name}</strong>
      <br />
      <br />
    </div>
    )
}

function BrowseCategories( {categories} ) {
  const displayedCategories = categories.sort((a, b)=> {
    if(a.name < b.name){
      return -1;
      }
    else {
      return 1;
    }
  }
  )

    return (
      <div> 
        <h1 className = "pageTitle">Browse Listings</h1>
        <div className = "pageDiv">
          {displayedCategories.map((category) => <Category key = {category.id} category = {category} />)}
        </div>
      </div>
      )
    }

export default BrowseCategories;