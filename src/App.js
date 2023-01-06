import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

import BrowseCategories from './components/find_things/BrowseCategories';
import BrowseCategory from './components/find_things/BrowseCategory';
import BrowseByDate from './components/find_things/BrowseByDate';

import CheckLottery from './components/find_things/CheckLottery';
import ListItem from './components/list_things/ListItem';
import MyListings from './components/list_things/MyListings';
import MyMessages from './components/my_info/MyMessages';
import Item from './components/items/Item';
import logo from './buy_nothing_logo.jpg';
import MyProfile from './components/my_info/MyProfile';
import ShowProfile from './components/my_info/ShowProfile';

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

    displayedDate += ", " + dateArray[3]

    if(displayTimeYes1No0 === 1) {
        displayedDate += " - ";
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

  function convertDateToJSON(givenDate) {
    const offset = givenDate.getTimezoneOffset();
    
    givenDate = new Date(givenDate.getTime() - (offset*60*1000));
    
    return givenDate.toISOString().split('T')[0] + " " + givenDate.toISOString().split('T')[1];
  }

  function findMaxFieldId(currentValue, newValue) {
    return Math.max(currentValue, newValue.id);
  }

  const [userInfo, setUserInfo] = useState({});

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:3001/categories")
      .then((r)=>r.json())
      .then((categoryList) => setCategories(categoryList));

    fetch("http://localhost:3001/items")
      .then((r)=>r.json())
      .then((itemList) => setItems(itemList));

    fetch("http://localhost:3001/messages")
      .then((r)=>r.json())
      .then((messageList) => setMessages(messageList));

    fetch("http://localhost:3001/users")
      .then((r)=>r.json())
      .then((userList) => setUsers(userList))
      }, [])

  const maxItemId = items.reduce(findMaxFieldId, 0);
  const maxMessageId = messages.reduce(findMaxFieldId, 0);

  if(users && users[0] && !userInfo.id) {
    setUserInfo(users[0]);
    console.log(userInfo)
  }

  function addItem(userInfo, formData) {
    const newItem = {
      "id": (maxItemId + 1),
      "name": formData.itemName,
      "status": "Active",
      "sellerId": userInfo.id,
      "sellerFirstName": userInfo.firstName,
      "sellerLastName": userInfo.lastName,
      "categoryName": formData.categoryName,
      "description": formData.description,
      "imageUrl": formData.imageUrl,
      "listDate": convertDateToJSON(new Date()),
      "lotteryEntries": [], 
      "winnerContactedMessageId": null
    } 

    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    
    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(newItem)
      })
  }

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

  function changeItemStatus(itemToChange) {
    if(itemToChange.status === "Active") {
      itemToChange.status = "Inactive";
    }
    else {
      itemToChange.status = "Active";
    }
    updateItems(itemToChange);
  }

  function enterLottery(itemInfo, userInfo, entryComment) {
    const newLotteryEntry = {
      "userId": userInfo.id,
      "userFirstName": userInfo.firstName,
      "userLastName": userInfo.lastName,
      "entryDate": convertDateToJSON(new Date()), 
      "comment": entryComment,
      "status": "pending"
    }

    const updatedLotteryEntries = [...itemInfo.lotteryEntries, newLotteryEntry];

    itemInfo.lotteryEntries = updatedLotteryEntries;

    updateItems(itemInfo);
  }

  function postMessage(message) {
    fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(message)
      })

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
  } 

  function createRecipientMessage(itemInfo, message, ) {
    
    let lotteryWinner = itemInfo.lotteryEntries.find((entry) => entry.status.includes("winner"));
    lotteryWinner.status = "winner contacted";

    const newMessage = {
      "id": (maxMessageId + 1), 
      "senderUserId": itemInfo.sellerId,
      "senderFirstName": itemInfo.sellerFirstName, 
      "senderLastName": itemInfo.sellerLastName, 
      "recipientUserId": lotteryWinner.userId,
      "recipientFirstName": lotteryWinner.userFirstName, 
      "recipientLastName": lotteryWinner.userLastName,
      "itemId": itemInfo.id,
      "messageContent": message, 
      "messageSentDate": convertDateToJSON(new Date())
    }

    postMessage(newMessage);

    //Add the message to the item info:
    const updatedItemInfo = {...itemInfo};
    const updatedLotteryEntries = itemInfo.lotteryEntries;
    updatedItemInfo.winnerContactedMessageId = (maxMessageId + 1);

    updatedItemInfo.lotteryEntries = updatedLotteryEntries.map((entry)=> {
      if(entry.userId === lotteryWinner.userId && entry.status.includes("winner")) {
        return lotteryWinner;
      }
      else {
        return entry;
      }
    })

    updateItems(updatedItemInfo);
  }

  function generateResponseMessage(message, responseText) {
    const newMessage = {
      "id": (maxMessageId + 1), 
      "senderUserId": message.recipientUserId,
      "senderFirstName": message.recipientFirstName, 
      "senderLastName": message.recipientLastName, 
      "recipientUserId": message.senderUserId,
      "recipientFirstName": message.senderFirstName, 
      "recipientLastName": message.senderLastName,
      "itemId": message.itemId,
      "messageContent": responseText, 
      "messageSentDate": convertDateToJSON(new Date())
    }
    postMessage(newMessage);
  }

  function sendSellerMessage(userInfo, itemInfo, sellerMessage) {
    const newMessage = {
      "id": (maxMessageId + 1), 
      "senderUserId": userInfo.id,
      "senderFirstName": userInfo.firstName, 
      "senderLastName": userInfo.lastName, 
      "recipientUserId": itemInfo.sellerId,
      "recipientFirstName": itemInfo.sellerFirstName, 
      "recipientLastName": itemInfo.sellerLastName,
      "itemId": itemInfo.id,
      "messageContent": sellerMessage, 
      "messageSentDate": convertDateToJSON(new Date())
    }
    postMessage(newMessage);
  }

  function withdrawLotteryEntry(item, entryToUpdate) {
    let updatedEntry = {...entryToUpdate};
    updatedEntry.status = "withdrawn";

    let updatedEntries = item.lotteryEntries.map((entry) => {
      if(entry.userId === entryToUpdate.userId) {
        return updatedEntry;
      }
      else {
        return entry;
      }
    })
    
    let updatedItem = {...item};

    updatedItem.lotteryEntries = updatedEntries;
    
    if(item.winnerContactedMessageId) {
      const winnerMessageInfo = messages.find((message) => message.id === item.winnerContactedMessageId);
      if(winnerMessageInfo.recipientUserId === updatedEntry.userId) {
        updatedItem.winnerContactedMessageId = null;
      }
    }
    updateItems(updatedItem);
  }

  const sortedItems = items.sort((a, b)=> {
    if(a.listDate > b.listDate){
      return -1;
      }
    else {
      return 1;
    }
  }
  )

  return (
  
  <BrowserRouter>
    <NavBar />
      <Switch>
        <Route path = "/browseCategories">
          <BrowseCategories categories = {categories} />
        </Route>

        <Route path = "/browseCategory/:categoryName">
          <BrowseCategory categories = {categories} items = {items} />
        </Route>
        
        <Route path = "/browseByDate/">
          <BrowseByDate items = {sortedItems} />
        </Route>
        
        <Route path = "/checkLottery">
          <CheckLottery userInfo = {userInfo} items = {sortedItems} />
        </Route>

        <Route path = "/listItem">
          <ListItem userInfo = {userInfo} categories = {categories} addItem = {addItem} />
        </Route>
        
        <Route path = "/myListings">
          <MyListings userInfo = {userInfo} categories = {categories} items = {sortedItems} />
        </Route>

        <Route path = "/showItem/:itemId">
          <Item userInfo = {userInfo} items = {sortedItems} formatGivenDate = {formatGivenDate} updateItems = {updateItems} changeItemStatus = {changeItemStatus} createRecipientMessage = {createRecipientMessage} messages = {messages} enterLottery = {enterLottery} sendSellerMessage = {sendSellerMessage} withdrawLotteryEntry = {withdrawLotteryEntry} />
        </Route>

        <Route path = "/myProfile">
          <MyProfile userInfo = {userInfo} formatGivenDate = {formatGivenDate} />
        </Route>

        <Route path = "/showProfile/:userId">
          <ShowProfile userInfo = {userInfo} users = {users} formatGivenDate = {formatGivenDate} />
        </Route>

        <Route path = "/myMessages">
          <MyMessages userInfo = {userInfo} messages = {messages} items = {sortedItems} formatGivenDate = {formatGivenDate} generateResponseMessage = {generateResponseMessage} />
        </Route>

        <Route path = "/">
          <div className = "itemDiv">
            <img className = "logo" src = {logo} alt = "Buy Nothing Logo" />
          </div>
        </Route>
        
      </Switch>
  </BrowserRouter>
  );
}

export default App;
