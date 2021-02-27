import React, { useContext } from 'react';
import './NewPlaces.css';
import { useHistory } from 'react-router-dom';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../../shared/components/util/validators/validators.js';

import { useForm } from '../../../shared/hooks/form-hooks';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';

import ImageUpload from '../../../shared/components/UIElements/ImageUpload/ImageUpload';
import Button from '../../../shared/components/FormElements/Button/Button';
import Input from '../../../shared/components/FormElements/Input/Input';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';

const NewPlaces = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
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
      placeImage: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const addPlaceHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('placeImage', formState.inputs.placeImage.value);
      formData.append('creator', auth.userId);
      await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/places`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push('/');
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={addPlaceHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          id="placeImage"
          center
          onInput={inputHandler}
          errorText="Please Upload a valid image format"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlaces;
