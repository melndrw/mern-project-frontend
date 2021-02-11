import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../../shared/components/util/validators/validators.js';
import './UpdatePlace.css';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import { useForm } from '../../../shared/hooks/form-hooks';
import Card from '../../../shared/components/UIElements/Card/Card';

const items = [
  {
    id: 1,
    title: 'Jose Rizal Monument',
    description: 'The National Hero of the Philippines',
    image:
      'https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/dd/05/24/frontal-del-monumento.jpg',
    address: 'Rizal Monument, Burgos Street, Calamba, Laguna',
    coordinates: {
      lat: 14.2126296,
      lng: 121.1652271,
    },
    creator: 1,
  },
  {
    id: 2,
    title: 'Andres Bonifacio Monument',
    description: 'The Father of Philippine Revolutionary',
    image:
      'https://thumbs.dreamstime.com/b/manila-ph-oct-andres-bonifacio-shrine-october-philippines-shows-life-story-philippine-hero-his-childhood-to-181008649.jpg',
    address: 'Liwasang Bonifacio, Ermita, Maynila',
    coordinates: {
      lat: 14.5945523,
      lng: 120.979409,
    },
    creator: 2,
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = items.find((item) => item.id == placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: false,
          },
          description: {
            value: identifiedPlace.description,
            isValid: false,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return <Card className="center">Could not find a place!</Card>;
  }

  const updatePlaceHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={updatePlaceHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Desctiption"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (minimum of 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
