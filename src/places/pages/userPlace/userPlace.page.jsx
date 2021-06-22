import React from "react";
import {useParams} from "react-router-dom";
import PlaceList from "../../component/placeList/placeList.component.jsx";

import "./userPlace.styles.css";


const UserPlace = () =>{
    const places = [
        {
           id:"p1",
           title:"Sajek",
           address:"bandarban sajek chittagong",
           image:"https://lh5.googleusercontent.com/p/AF1QipMTZWalB_R23PxKdMsYaxHW7uyvmS137XzSBGkU=w408-h271-k-no",
           description:"This is one of the best hilltracks in Bangladesh, that is being visited by tourists",
           co_ordinantes:[23.3819926,92.2938229],
           creator:"u1"
        },
        {
            id:"p2",
            title:"Sajek",
            address:"bandarban sajek chittagong",
            image:"https://lh5.googleusercontent.com/p/AF1QipMTZWalB_R23PxKdMsYaxHW7uyvmS137XzSBGkU=w408-h271-k-no",
            description:"This is one of the best hilltracks in Bangladesh, that is being visited by tourists",
            co_ordinantes:[23.3819926,92.2938229],
            creator:"u2"
         }
    ]
    const userId = useParams().userId;
    const loadedPlace = places.filter(place=>place.creator===userId)
    return (
        <div className="user_place">
            <PlaceList items={loadedPlace}/>
        </div>
    )
}

export default UserPlace;