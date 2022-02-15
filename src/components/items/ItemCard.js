import React from "react";
import { useHistory } from "react-router-dom";


function ItemCard({ item, updateItems }) {
  const history = useHistory();
  
    return (
        <div className = "itemDiv">
          <img src = {item.imageUrl} alt = {item.name} className = "itemCardImage" />
          <br />       
          <strong>{item.name}</strong>
          <br />
          {item.description}
          <br />
          <button className = "detailsButton" onClick = {(() => history.push(`/showItem/${item.id}`))}>See Details</button>
        </div>
    )
    }

export default ItemCard;