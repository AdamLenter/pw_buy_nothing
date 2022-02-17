import React from "react";

function ActiveInactiveDropDown({ defaultStatus, setActiveInactiveBoth} ) {
    function handleSelect(event){
        setActiveInactiveBoth(event.target.value);
    }
    
    return(
        <div className = "activeInactiveForm">
            <label>View listings: </label>
            <select value = {defaultStatus} onChange = {(event)=>handleSelect(event)} >
                <option value = "Active">Active listings only</option>
                <option value = "Both">Active and inactive listings</option>
                <option value = "Inactive">Inactive listings only</option>
            </select>
        </div>
    )
}

export default ActiveInactiveDropDown;