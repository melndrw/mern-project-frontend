import React, { useState, useContext } from 'react';
import './PlacesItem.css';
import { Image } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import Card from '../../../shared/components/UIElements/Card/Card';
import Button from '../../../shared/components/FormElements/Button/Button';
import Modal from '../../../shared/components/UIElements/Modal/Modal';
import Map from '../../../shared/components/UIElements/Map/Map';
import { AuthContext } from '../../../shared/context/auth-context';

const PlacesItem = ({ item, onDelete }) => {
  console.log(item);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BASE_URL}api/places/${item.id}`,
        'DELETE',
        null,
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (error) {}
    onDelete(item.id);
  };
  return (
    <>
      {isLoading && <LoadingSpinner asOverLay />}
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        header={item.address}
        contentClass="place-item__modal-content"
        onCancel={() => setShowMap(false)}
        footerClass="place-item__modal-actions"
        footer={<Button onClick={() => setShowMap(false)}>Close</Button>}
      >
        <div className="map-container">
          <Map coordinates={item.location} address={item.address} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={cancelDeleteHandler} inverse>
              Cancel
            </Button>
            <Button onClick={confirmDeleteHandler} danger>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place. Please note that you
          can't undo this event.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <Image
              src={`http://localhost:5000/${item.placeImage}`}
              alt={item.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{item.title}</h2>
            <h3>{item.address}</h3>
            <p>{item.description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={() => setShowMap(true)} inverse>
              VIEW ON MAP
            </Button>
            {item.creator === auth.userId && (
              <>
                <Button to={`/places/${item.id}`}>EDIT</Button>
                <Button onClick={showDeleteWarningHandler} danger>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlacesItem;
