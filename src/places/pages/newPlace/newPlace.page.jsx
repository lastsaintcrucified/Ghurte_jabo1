import React from "react";
import { useForm } from "../../../shared/hooks/form-hook.js";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validator.js";
import Input from "../../../shared/uiElements/input.component.jsx";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";

import "./newPlace.styles.css";

const NewPlace = () => {
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

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(state);
  };

  console.log(state.isValid);
  //   console.log(state.inputs);
  return (
    <div className="form_container">
      <div className="place-form">
        <Input
          type="text"
          element="input"
          id="title"
          label="Add Place"
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
  );
};

export default NewPlace;
