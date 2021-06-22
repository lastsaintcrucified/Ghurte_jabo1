import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../../shared/hooks/form-hook.js";
import Input from "../../../shared/uiElements/input.component.jsx";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validator.js";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Sajek",
    address: "bandarban sajek chittagong",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipMTZWalB_R23PxKdMsYaxHW7uyvmS137XzSBGkU=w408-h271-k-no",
    description:
      "This is one of the best hilltracks in Bangladesh, that is being visited by tourists",
    co_ordinantes: [23.3819926, 92.2938229],
    creator: "u1",
  },
  {
    id: "p2",
    title: "Sajek",
    address: "bandarban sajek chittagong",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipMTZWalB_R23PxKdMsYaxHW7uyvmS137XzSBGkU=w408-h271-k-no",
    description:
      "This is one of the best hilltracks in Bangladesh, that is being visited by tourists",
    co_ordinantes: [23.3819926, 92.2938229],
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [state, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true,
        },
        description: {
          value: identifiedPlace.description,
          isValid: true,
        },
      },
      true
    );
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(state);
  };

  if (!state.inputs.title.value) {
    return (
      <div className="center">
        <h1>Loading.....</h1>
      </div>
    );
  }

  return (
    <div className="form_container">
      <form className="place-form" onSubmit={submitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={state.inputs.title.value}
          initialValidity={state.inputs.description.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={state.inputs.description.value}
          initialValidity={state.inputs.description.isValid}
        />
        <CustomButton type="submit" disabled={!state.isValid}>
          UPDATE PLACE
        </CustomButton>
      </form>
    </div>
  );
};

export default UpdatePlace;
