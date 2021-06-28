import React from "react";
import UserItem from "../userItem/userItem.component.jsx";

import "./userList.styles.css";

const UserList = ({items}) =>{
    if(items.length===0){
        return (
            <div className="center">
                <h1>No user has been added!</h1>
            </div>
        );
    }
    return (
        <div className="user_list"> 
            {items.map(user=>
                (<UserItem 
                    key={user.id} 
                    id={user.id}
                    image={user.image} 
                    name={user.name}
                    placeCount={user.places.length}
                />)
            )}
        </div>
    )
}

export default UserList;