import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../shared/uiElements/avatar.component.jsx";
import "./userItem.styles.css";

const UserItem = (props) =>{
    return (
            <div className="user_item">
                <Link to={`/${props.id}/places`}>
                    <div className="user_item_image">
                        <Avatar image={`http://localhost:5000/${props.image}`} name={props.name}/>
                    </div>
                    <div className="user_item_info">
                        <h2>{props.name}</h2>
                        <p>{props.placeCount} {props.placeCount>1?"places":"place"}</p>
                    </div>
                </Link>
            </div>
    )
}

export default UserItem;