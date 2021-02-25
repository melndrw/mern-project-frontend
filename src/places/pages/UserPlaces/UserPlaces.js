import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserPlaces.css';

import { useHttpClient } from '../../../shared/hooks/http-hook';

import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import PlaceList from '../../components/PlacesList/PlacesList';

const UserPlaces = () => {
  const userId = useParams().userId;
  const [loadedPlaces, setloadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const placesByUserId = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}api/places/user/${userId}`
        );
        setloadedPlaces(placesByUserId);
      } catch (error) {}
    };
    getUsers();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setloadedPlaces((prevPlace) =>
      prevPlace.filter((place) => place.id !== deletedPlaceId)
    );
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <PlaceList onDeletePlace={placeDeletedHandler} items={loadedPlaces} />
      )}
    </>
  );
};

export default UserPlaces;
