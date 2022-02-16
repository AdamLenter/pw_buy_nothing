import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user";

function MyMessages({ messages, items, formatGivenDate, generateResponseMessage }) {
  const [displayedMessageId, setDisplayedMessage] = useState(null);

  const userInfo = useContext(UserContext);

  function Message ({ message, formatGivenDate }) {
   
    function handleMouseOver() {
      setDisplayedMessage(message.id);
    }

    function ResponseForm () {
      const [responseFormText, setResponseFormText] = useState("");
  
      function processTextArea(event) {
        setResponseFormText(event.target.value);
      }
  
      function handleSubmit(event) {
        event.preventDefault();
        generateResponseMessage(message, responseFormText)
        setResponseFormText("");
        setDisplayedMessage(null);
      }
  
      if(message.id === displayedMessageId && message.recipientUserId === userInfo.id) {
        return(
          <form onSubmit = {(event)=>handleSubmit(event)}>
            <textarea value = {responseFormText} onChange = {(event) => processTextArea(event)} />
            <button>Submit</button>
          </form>
        )}
      else {
        return(<p></p>)
      }
    }
    
    return(
      <div className = "message" onMouseOver = {handleMouseOver}>
        <p >
          <br />
          <span className = {message.senderUserId == userInfo.id ? "userMessageSender" : "userMessageRecipient"}>
            {message.senderUserId == userInfo.id ? "To: " + message.recipientFirstName + " " + message.recipientLastName : "From: " + message.senderFirstName + " " + message.senderLastName} ({formatGivenDate(new Date(message.messageSentDate), 1)}):
          </span>
          <br />
          {message.itemId ? (
            <>
              <span>
                  <strong>In re: {items.find((item) => item.id === message.itemId).name}</strong>
              </span>
              <br />
            </>) : null}
          <span>{message.messageContent}</span>
          <br />
        </p>
        {message.id === displayedMessageId && message.recipientUserId === userInfo.id ? <ResponseForm key = {message.id} /> : <></>}
      </div>
    )
  }
  

  const filteredMessages = messages.filter((message) => (message.senderUserId == userInfo.id && message.recipientUserId) || (message.recipientUserId == userInfo.id && message.senderUserId));

  const sortedMessages = filteredMessages.sort((a, b)=> {
    if(a.messageSentDate > b.messageSentDate){
      return -1;
      }
    else {
      return 1;
    }
  })

    return (
      <div>
        <h1>My Messages</h1>
        {sortedMessages.map((message) => <Message key = {message.id} message = {message} formatGivenDate = {formatGivenDate} />)}
      </div>
      )
    }

export default MyMessages;