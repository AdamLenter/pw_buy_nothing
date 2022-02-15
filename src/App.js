import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SearchListings from './components/SearchListings';
import BrowseCategories from './components/find_things/BrowseCategories';
import BrowseCategory from './components/find_things/BrowseCategory';
import CheckLottery from './components/find_things/CheckLottery';
import ListItem from './components/list_things/ListItem';
import MyCurrentListings from './components/list_things/MyCurrentListings';
import MyPastListings from './components/list_things/MyPastListings';
import Item from './components/items/Item';
import { UserProvider } from './context/user';

function App() {

  function formatGivenDate(givenDate, displayTimeYes1No0) {
    const dateArray = givenDate.toString().split(' ');
    let amPm;
    let displayedDate = dateArray[1] + " ";

    if(dateArray[2] > 9) {
        displayedDate += dateArray[2];
    }
    else {

        displayedDate += dateArray[2].substr(1);
    }

    displayedDate += ", " + dateArray[3] + " - ";

    if(displayTimeYes1No0 === 1) {
        const hour = parseInt(dateArray[4].substr(0, 2));

        if(hour >= 13) {
            displayedDate += (hour - 12);
            amPm = "PM";
        }
        else {
            displayedDate += hour;

            if(hour === 12) {
                amPm = "PM";
            }
            else {
                amPm = "AM"
            }
        }
        displayedDate += dateArray[4].substr(2, 3) + " " + amPm; 
    }
    
    return displayedDate;
}

  function findMaxFieldID(currentValue, newValue) {
    return Math.max(currentValue, newValue.id);
  }

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:3001/categories")
      .then((r)=>r.json())
      .then((categoryList) => setCategories(categoryList))

      .then(() =>fetch("http://localhost:3001/items"))
      .then((r)=>r.json())
      .then((itemList) => setItems(itemList)) 

      .then(() =>fetch("http://localhost:3001/messages"))
      .then((r)=>r.json())
      .then((messageList) => setMessages(messageList))
      }, [])


  const maxItemID = items.reduce(findMaxFieldID, 0);
  const maxMessageID = messages.reduce(findMaxFieldID, 0);


  function updateItems(itemToUpdate) {
    const updatedItems = items.map((item)=> {
      if(item.id === itemToUpdate.id) {
        return itemToUpdate;
      }
      else {
        return item;
      }
    })
    setItems(updatedItems);

    fetch(`http://localhost:3001/items/${itemToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(itemToUpdate)
      })
  }

  function createRecipientMessage(itemInfo, message, ) {
    
    const lotteryWinner = itemInfo.lotteryEntries.find((entry) => entry.status.includes("winner"));

    const newMessage = {
      "id": (maxMessageID + 1), 
      "senderUserId": itemInfo.sellerId,
      "senderFirstName": itemInfo.sellerFirstName, 
      "senderLastName": itemInfo.sellerLastName, 
      "recipientUserID": lotteryWinner.userId,
      "recipientFirstName": lotteryWinner.userFirstName, 
      "recipientLastName": lotteryWinner.userLastName,
      "itemId": itemInfo.id,
      "messageSentDate": new Date()
    }

    console.log(newMessage);
  }
      
  return (
  <UserProvider>
    <BrowserRouter>
      <NavBar />
        <Switch>
          <Route path = "/browseCategories">
            <BrowseCategories categories = {categories} />
          </Route>

          <Route path = "/browseCategory/:categoryName">
            <BrowseCategory categories = {categories} items = {items} />
          </Route>

          <Route path = "/searchListings">
            <SearchListings />
          </Route>

          <Route path = "/checkLottery">
            <CheckLottery />
          </Route>

          <Route path = "/listItem">
            <ListItem />
          </Route>
          
          <Route path = "/myCurrentListings">
            <MyCurrentListings />
          </Route>

          <Route path = "/myPastListings">
            <MyPastListings />
          </Route>

          <Route path = "/showItem/:itemId">
            <Item items = {items} updateItems = {updateItems} createRecipientMessage = {createRecipientMessage} />
          </Route>

          <Route path = "/">
            <h1>Home</h1>
          </Route>
          
        </Switch>
    </BrowserRouter>
  </UserProvider>
  );
}

export default App;
