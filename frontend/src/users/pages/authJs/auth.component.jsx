import React, { useState, useContext, useEffect } from "react";
import Input from "../../../shared/uiElements/input.component.jsx";
import axios from "axios";
import { useForm } from "../../../shared/hooks/form-hook.js";
import { useHttpClient } from "../../../shared/hooks/http-hook.js";
import ImageUpload from "../../../shared/uiElements/imageUpload.component.jsx";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";
import LoadingSpinner from "../../../shared/uiElements/LoadingSpinner.jsx";
import ErrorModal from "../../../shared/uiElements/ErrorModal.jsx";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validator.js";
import { AuthContext } from "../../../shared/context/auth-context.js";

import "./auth.styles.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [loginMode, setLoginMode] = useState(true);
  const { isLoading, errMsg, sendRequest, errorHandler } = useHttpClient();
  const [state, inputHandler, setFormData] = useForm(
    {
      email: {
        vlaue: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const uploadImage = (img) => {
    let body = new FormData();
    body.set("key", "ca81e881015680cdcde5d4b160f8ef4d");
    body.append("image", img);

    return axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(state.inputs);

    if (loginMode) {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: state.inputs.email.value,
            password: state.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        // console.log(data);
        auth.login(data.userId, data.token);
      } catch (error) {}

      // console.log(loginData)
    } else {
      try {
        const imbb = await uploadImage(state.inputs.image.value);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: state.inputs.name.value,
              email: state.inputs.email.value,
              password: state.inputs.password.value,
              image: imbb.data.data.display_url,
            }),
          }
        );
        // const formData = new FormData();
        // formData.append("email", state.inputs.email.value);
        // formData.append("name", state.inputs.name.value);
        // formData.append("password", state.inputs.password.value);
        // // console.log(imbb.data.data.display_url);
        // formData.append("image", imbb.data.data.display_url);
        // const data = await sendRequest(
        //   `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        //   "POST",
        //   formData
        // );
        const responseData = await response.json();
        // console.log(responseData);
        auth.login(responseData.userId, responseData.token);

        // console.log(imbb.data.data.display_url);
      } catch (err) {}
    }
  };
  const switchModeToggle = (event) => {
    event.preventDefault();

    if (!loginMode) {
      setFormData(
        {
          ...state.inputs,
          name: undefined,
          image: undefined,
        },
        state.inputs.email.isValid && state.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...state.inputs,
          name: {
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
    }
    setLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={errMsg} onClear={errorHandler} />
      <div className="form_container">
        {isLoading && <LoadingSpinner asOverlay />}
        <form className="place-form" onSubmit={submitHandler}>
          {!loginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
            />
          )}
          {!loginMode && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="please provide an image"
            />
          )}
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password (min. 6 characters)."
            onInput={inputHandler}
          />
          <div className="form-footer">
            <CustomButton type="submit" disabled={!state.isValid}>
              {loginMode ? "Log in" : "Sign up"}
            </CustomButton>
            <CustomButton className="delete" onClick={switchModeToggle}>
              Switch To {loginMode ? "SignUp" : "LogIn"}
            </CustomButton>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
