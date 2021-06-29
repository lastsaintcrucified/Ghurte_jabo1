import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "../../../shared/hooks/form-hook.js";
import { useHttpClient } from "../../../shared/hooks/http-hook.js";
import Input from "../../../shared/uiElements/input.component.jsx";
import { AuthContext } from "../../../shared/context/auth-context.js";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validator.js";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";
import LoadingSpinner from "../../../shared/uiElements/LoadingSpinner.jsx";
import ErrorModal from "../../../shared/uiElements/ErrorModal.jsx";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const placeId = useParams().placeId;
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, errMsg, sendRequest, errorHandler } = useHttpClient();
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

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(data.place);
        setFormData(
          {
            title: {
              value: data.place.title,
              isValid: true,
            },
            description: {
              value: data.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!errMsg && !loadedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: state.inputs.title.value,
          description: state.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer "+auth.token
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={errMsg} onClear={errorHandler} />
      <div className="form_container">
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && loadedPlace && (
          <form className="place-form" onSubmit={submitHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
              initialValue={loadedPlace.title}
              initialValidity={true}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (min. 5 characters)."
              onInput={inputHandler}
              initialValue={loadedPlace.description}
              initialValidity={true}
            />
            <CustomButton type="submit" disabled={!state.isValid}>
              UPDATE PLACE
            </CustomButton>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default UpdatePlace;
