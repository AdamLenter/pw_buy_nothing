import React from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {

    const currentUser = {
        "id": 1, 
        "firstName": "Matt", 
        "lastName": "Perkins"
    }

    
    return <UserContext.Provider value = {currentUser}>{children}</UserContext.Provider>;
  }

  export { UserContext, UserProvider };