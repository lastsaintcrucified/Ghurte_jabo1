import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../../shared/hooks/form-hook.js";
import { useHttpClient } from "../../../shared/hooks/http-hook.js";
import ErrorModal from "../../../shared/uiElements/ErrorModal.jsx";
import LoadingSpinner from "../../../shared/uiElements/LoadingSpinner.jsx";
import { AuthContext } from "../../../shared/context/auth-context.js";
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
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("state-->", state);
    try {
      const data = await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: state.inputs.title.value,
          description: state.inputs.description.value,
          address: state.inputs.address.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(data);
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
