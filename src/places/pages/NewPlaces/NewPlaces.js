import React from 'react';
import './NewPlaces.css';
import Input from '../../../shared/components/FormElements/Input/Input';
import { VALIDATOR_REQUIRE } from '../../../shared/components/util/validators/validators.js';

const NewPlaces = () => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Title"
      />
    </form>
  );
};

export default NewPlaces;
