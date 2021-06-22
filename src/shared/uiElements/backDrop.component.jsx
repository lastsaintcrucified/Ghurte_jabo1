import React from "react";
import ReactDOM from "react-dom";

import "./backDrop.styles.css";

const BackDrop = (props) =>{
    return ReactDOM.createPortal(
        <div className="backDrop" onClick={props.onClick}></div>,
        document.getElementById("backDrop")
    ) 
}

export default BackDrop;