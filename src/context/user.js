import React from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {

    const currentUser = {
        "id": 2, 
        "firstName": "Stephanie", 
        "lastName": "Ames"
    }

    
    return <UserContext.Provider value = {currentUser}>{children}</UserContext.Provider>;
  }

  export { UserContext, UserProvider };