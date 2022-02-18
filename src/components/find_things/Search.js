import React from "react";

function Search({ searchTerm, setSearchTerm } ) {
    function handleSearch(event){
        setSearchTerm(event.target.value);
    }
    
    return(
        <div className = "activeInactiveForm">
            <label>Search: </label>
            <input value = {searchTerm} onChange = {(event)=>handleSearch(event)}/>
        </div>
    )
}

export default Search;