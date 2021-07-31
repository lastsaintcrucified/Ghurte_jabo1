import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../../shared/hooks/form-hook.js";
import { useHttpClient } from "../../../shared/hooks/http-hook.js";
import ImageUpload from "../../../shared/uiElements/imageUpload.component.jsx";
import ErrorModal from "../../../shared/uiElements/ErrorModal.jsx";
import LoadingSpinner from "../../../shared/uiElements/LoadingSpinner.jsx";
import { AuthContext } from "../../../shared/context/auth-context.js";
import axios from "axios";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validator.js";
import Input from "../../../shared/uiElements/input.component.jsx";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";

import "./newPlace.styles.css";

const NewPlace = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isLoading, errMsg, sendRequest, errorHandler } = useHttpClient();
  const [state, inputHandler] = useForm(
    {
      title: {
        vlaue: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  // const uploadImage = (img) => {
  //   let body = new FormData();
  //   body.set("key", "ca81e881015680cdcde5d4b160f8ef4d");
  //   body.append("image", img);

  //   return axios({
  //     method: "post",
  //     url: "https://api.imgbb.com/1/upload",
  //     data: body,
  //   });
  // };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log("state-->", state);
    try {
      // const imbb = await uploadImage(state.inputs.image.value);
      const formData = new FormData();
      formData.append("title", state.inputs.title.value);
      formData.append("description", state.inputs.description.value);
      formData.append("address", state.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append("image", state.inputs.image.value);
      const data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      history.push("/");
    } catch (err) {}
  };

  // console.log(state.isValid);
  //   console.log(state.inputs);
  return (
    <React.Fragment>
      <ErrorModal error={errMsg} onClear={errorHandler} />
      <div className="form_container">
        <div className="place-form">
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            type="text"
            element="input"
            id="title"
            label="Title"
            errorText="Please give a valid title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            center
            onInput={inputHandler}
            errorText="please provide an image"
          />
          <Input
            type="text"
            element="textarea"
            id="description"
            label="Add Description"
            rows={4}
            errorText="Please give a valid description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />
          <Input
            type="text"
            element="textarea"
            id="address"
            label="Address"
            errorText="Please give a valid address"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <CustomButton
            onClick={submitHandler}
            type="submit"
            disabled={!state.isValid}
          >
            Add Place
          </CustomButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewPlace;
