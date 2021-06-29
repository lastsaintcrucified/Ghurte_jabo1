import React, { useState, useEffect } from "react";
import {history} from "react-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook.js";
import ErrorModal from "../../../shared/uiElements/ErrorModal.jsx";
import LoadingSpinner from "../../../shared/uiElements/LoadingSpinner.jsx";
import { useParams } from "react-router-dom";
import PlaceList from "../../component/placeList/placeList.component.jsx";

import "./userPlace.styles.css";

const UserPlace = () => {
  const userId = useParams().userId;
  const { isLoading, errMsg, sendRequest, errorHandler } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlace(data.places);
        // console.log(data);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest]);

  const placeDeleteHandler = (deletedPlaceId) =>{
      setLoadedPlace(prevPlaces=>prevPlaces.filter(place=>place.id!==deletedPlaceId))
  }
  
  return (
    <React.Fragment>
      <ErrorModal error={errMsg} onClear={errorHandler} />
      <div className="user_place">
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && loadedPlace && <PlaceList items={loadedPlace} onDeletePlace={placeDeleteHandler}/>}
        
      </div>
    </React.Fragment>
  );
};

export default UserPlace;
