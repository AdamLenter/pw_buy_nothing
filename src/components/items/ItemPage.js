import React from "react";
import ItemCard from "./ItemCard";

function ItemPage({ items }) {
    return (
      <div>
        {items.map((item) => <ItemCard key = {item.id} item = {item}/>)}
      </div>
      )
    }

export default ItemPage;