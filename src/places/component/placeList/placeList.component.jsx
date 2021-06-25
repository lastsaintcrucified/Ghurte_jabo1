import React from "react";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";
import PlaceItem from "../placeItem/placeItem.component.jsx";

import "./placeList.styles.css";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h1>No Place has been added, Maybe create One?</h1>
        <CustomButton to="/places/new">Share Places</CustomButton>
      </div>
    );
  }
  console.log(props.items)
  return (
    <div className="placeList">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          image={place.image}
          id={place.id}
          creatorId={place.creator}
          address={place.address}
          title={place.title}
          description={place.description}
          co_ordinates={place.co_ordinates}
          onDelete = {props.onDeletePlace}
        />
      ))}
    </div>
  );
};

export default PlaceList;
