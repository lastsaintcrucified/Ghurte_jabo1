import React, { useState, useContext } from "react";
import Avatar from "../../../shared/uiElements/avatar.component.jsx";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";
import Modal from "../../../shared/uiElements/modal.component.jsx";
import Map from "../../../shared/uiElements/map.component.jsx";
import { AuthContext } from "../../../shared/context/auth-context.js";
import "./placeItem.styles.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setSHowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const openMapModal = () => {
    setSHowMap(true);
  };

  const closeMapModal = () => setSHowMap(false);

  const openDeleteModal = () => {
    setShowDelete(true);
  };

  const closeDeleteModal = () => {
    setShowDelete(false);
  };

  const handleDelete = () => {
    setShowDelete(false);
    console.log("deleted");
  };
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        close={closeMapModal}
        headerClass="header"
        contentClass="content"
        footerClass="footer"
        header={props.address}
        footer={
          <CustomButton className="ft_btn" onClick={closeMapModal}>
            Close
          </CustomButton>
        }
      >
        <div className="map_container">
          <Map center={props.co_ordinates} />
        </div>
      </Modal>
      <Modal
        show={showDelete}
        close={closeDeleteModal}
        headerClass="header"
        contentClass="content"
        footerClass="footer_delete"
        header="Delete"
        footer={
          <React.Fragment>
            <CustomButton onClick={closeDeleteModal} className="edit">
              Cancel
            </CustomButton>
            <CustomButton onClick={handleDelete} className="delete">
              Delete
            </CustomButton>
          </React.Fragment>
        }
      >
        <div className="delete_container">
          <p>Do you want to delete this item for sure?</p>
        </div>
      </Modal>
      <div className="place_item">
        <Avatar
          className="place_image"
          image={props.image}
          name={props.title}
        />
        <div className="place_item_info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place_item_button">
          <CustomButton onClick={openMapModal}>View On Map</CustomButton>
          {auth.isLoggedIn && (
            <CustomButton to={`/places/${props.id}`} className="edit">
              Edit
            </CustomButton>
          )}
          {auth.isLoggedIn && (
            <CustomButton onClick={openDeleteModal} className="delete">
              Delete
            </CustomButton>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlaceItem;
