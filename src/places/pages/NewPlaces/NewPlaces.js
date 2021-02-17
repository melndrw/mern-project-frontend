import React from 'react';
import './NewPlaces.css';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../../shared/components/util/validators/validators.js';

import { useForm } from '../../../shared/hooks/form-hooks';

import Button from '../../../shared/components/FormElements/Button/Button';
import Input from '../../../shared/components/FormElements/Input/Input';

const NewPlaces = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const addPlaceHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={addPlaceHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid Description (at least 5 characters)"
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Address"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlaces;
