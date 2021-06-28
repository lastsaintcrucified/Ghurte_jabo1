import React from "react";
import "./avatar.styles.css";

const Avatar = props =>{
    return (
        <div className={`avatar ${props.className}`}>
            <img 
                src={props.image}
                alt={props.name} 
                style={{width:props.width,height:props.height}}/>
        </div>
    )
}

export default Avatar;