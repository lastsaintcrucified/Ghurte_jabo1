import React from "react";
import { Link } from "react-router-dom";
import "./customButton.styles.css";

const CustomButton = (props) => {
  if (props.to) {
    return (
      <Link to={`${props.to}`}>
        <button
          to={`${props.to}`}
          disabled={props.disabled}
          onClick={props.onClick}
          className={
            props.disabled
              ? "disabled_class"
              : `custom_button ${props.className}`
          }
        >
          {props.children}
        </button>
      </Link>
    );
  }
  return (
    <button
      to={`${props.to}`}
      disabled={props.disabled}
      onClick={props.onClick}
      className={
        props.disabled ? "disabled_class" : `custom_button ${props.className}`
      }
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
