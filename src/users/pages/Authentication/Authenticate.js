import React, { useState, useContext } from 'react';

import './Authenticate.css';

import { useForm } from '../../../shared/hooks/form-hooks';
import { AuthContext } from '../../../shared/context/auth-context';

import Button from '../../../shared/components/FormElements/Button/Button';
import Input from '../../../shared/components/FormElements/Input/Input';
import Card from '../../../shared/components/UIElements/Card/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../../shared/components/util/validators/validators.js';

const Authenticate = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
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
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  const switchSignupHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
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
        },
        false
      );
    }
    setIsLoginMode((prevState) => !prevState);
  };
  return (
    <Card className="authentication">
      <h2 className="authentication__title">
        {isLoginMode ? 'Login' : 'Sign Up'} Required
      </h2>
      <hr />

      <form onSubmit={formSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Full Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter you Full Name"
            onInput={inputHandler}
          />
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
  );
};

export default Authenticate;
