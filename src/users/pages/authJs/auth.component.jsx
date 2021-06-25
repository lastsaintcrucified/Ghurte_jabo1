import React, { useState, useContext, useEffect } from "react";
import Input from "../../../shared/uiElements/input.component.jsx";
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
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(state.inputs)

    if (loginMode) {
      try {
        const data = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: state.inputs.email.value,
            password: state.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(data);
        auth.login(data.user.id);
      } catch (error) {}

      // console.log(loginData)
    } else {
      try {
        const data = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            name: state.inputs.name.value,
            email: state.inputs.email.value,
            password: state.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(data);
        auth.login(data.user.id);
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
          image:undefined
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
          image:{
            value:null,
            isValid:false
          }
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
          {!loginMode && <ImageUpload id="image" center onInput={inputHandler}/>}
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
