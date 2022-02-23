import React from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {

    const currentUser = {
        "id": 9,
        "firstName": "Catherine",
        "lastName": "Hendricks",
        "memberSince": "2022-01-24", 
        "imageUrl": "https://st.depositphotos.com/1008303/1316/i/600/depositphotos_13161087-stock-photo-asian-indian-businesswoman.jpg"
      }

    
    return <UserContext.Provider value = {currentUser}>{children}</UserContext.Provider>;
  }

  export { UserContext, UserProvider };