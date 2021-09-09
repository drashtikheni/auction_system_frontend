import React, { useState, useContext } from "react";

import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoginSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

export default function Auth() {
  const auth = useContext(AuthContext);

  console.log();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function authSubmitHandler(event) {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(responseData.token);
        auth.login(responseData.userId, responseData.token);
      } catch (error) {
        console.log(error);
      }
    } else {
      const formData = new FormData();
      console.log(formState.inputs.image.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("image", formState.inputs.image.value);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/signup`,
          "POST",
          formData
        );
        console.log(responseData.token);
        auth.login(responseData.userId, responseData.token);
      } catch (error) {
        console.log(error);
      }
    }
  }
  function switchModeHandler() {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Card className="authentication">
        {isLoading && <LoginSpinner asOverlay />}
        <h2>Login Required!</h2>
        <hr />

        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter a name."
              placeholder="Enter Your Name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please select a valid image."
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            placeholder="Enter email address"
            onInput={inputHandler}
            errorText="Please enter valid email address."
            validators={[VALIDATOR_EMAIL()]}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            placeholder="Enter Password"
            onInput={inputHandler}
            errorText="Please enter valid password."
            validators={[VALIDATOR_MINLENGTH(5)]}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "Switch to SIGN UP" : "Switch to LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
}
