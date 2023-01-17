import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";



function ListItem( { userInfo, categories, addItem } ) {
  const history = useHistory();
  
  const startingFormData = {
    itemName: "", 
    categoryName: "",  
    imageUrl: "", 
    description: ""
  }

  const [formData, setFormData] = useState(startingFormData);

  useEffect(()=>{
    setFormData({
      itemName: "", 
      categoryName: categories[0] ? categories[0].name : "",  
      imageUrl: "", 
      description: ""
    })
  }, [categories])

  function handleFormData(event, fieldToUpdate) {
    let updatedFormData = {...formData};
    updatedFormData[fieldToUpdate] = event.target.value;
    setFormData(updatedFormData);
  }

    function handleSubmit(event) {
      event.preventDefault();
      addItem(userInfo, formData);
      history.push(`/myListings`)
    }

    if(formData) {
      return (
        <div>
          <h1 className = "pageTitle">List Item</h1>
          <form onSubmit = {(event)=>handleSubmit(event)}>
            <label>Item name: </label>
            <input value = {formData.itemName} onChange = {(event)=>handleFormData(event, "itemName")} />
            <br />
            
            <label>Category: </label>
            <select value = {formData.categoryName} onChange = {(event)=>handleFormData(event, "categoryName")}>
                {categories.map((category) => <option key = {category.id} value = {category.name}>{category.name}</option>)}
            </select>
            <br />

            <label>Image URL: </label>
            <input value = {formData.imageUrl} onChange = {(event)=>handleFormData(event, "imageUrl")}/>
            <br />

            <label>Description: </label> 
            <textarea value = {formData.description} onChange = {(event)=>handleFormData(event, "description")}/>
            <button>Submit</button>
          </form> 
        </div>
        )
      }
    else {
      return(<div>Loading...</div>)

    }
}

export default ListItem;