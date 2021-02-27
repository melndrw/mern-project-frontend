import React, { useState, useContext } from 'react';

import './Authenticate.css';

import { useForm } from '../../../shared/hooks/form-hooks';
import { AuthContext } from '../../../shared/context/auth-context';

import ImageUpload from '../../../shared/components/UIElements/ImageUpload/ImageUpload';
import Button from '../../../shared/components/FormElements/Button/Button';
import Input from '../../../shared/components/FormElements/Input/Input';
import Card from '../../../shared/components/UIElements/Card/Card';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';

import { useHttpClient } from '../../../shared/hooks/http-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../../shared/components/util/validators/validators.js';

const Authenticate = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/user/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.user.userId, responseData.user.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/user/signup`,
          'POST',
          formData
        );
        auth.login(responseData.user.userId, responseData.user.token);
      } catch (error) {}
    }
  };

  const switchSignupHandler = () => {
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
            value: '',
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
    setIsLoginMode((prevState) => !prevState);
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="authentication__title">
          {isLoginMode ? 'Login' : 'Sign Up'} Required
        </h2>
        <hr />

        <form onSubmit={formSubmitHandler}>
          {!isLoginMode && (
            <>
              <Input
                element="input"
                id="name"
                type="text"
                label="Full Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter you Full Name"
                onInput={inputHandler}
              />
              <ImageUpload
                id="image"
                center
                onInput={inputHandler}
                errorText="Please Upload a valid image format"
              />
            </>
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a strong password at least 8 characters"
            onInput={inputHandler}
          />
          <Button disabled={!formState.isValid} type="submit">
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchSignupHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </>
  );
};

export default Authenticate;
