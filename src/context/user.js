import React from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {

    const currentUser = {
        "id": 4, 
        "firstName": "Sarah", 
        "lastName": "Thompson"
    }

    
    return <UserContext.Provider value = {currentUser}>{children}</UserContext.Provider>;
  }

  export { UserContext, UserProvider };