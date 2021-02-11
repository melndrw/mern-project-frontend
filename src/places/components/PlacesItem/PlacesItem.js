import React, { useState } from 'react';
import './PlacesItem.css';
import { Image } from '@chakra-ui/react';
import Card from '../../../shared/components/UIElements/Card/Card';
import Button from '../../../shared/components/FormElements/Button/Button';
import Modal from '../../../shared/components/UIElements/Modal/Modal';
import Map from '../../../shared/components/UIElements/Map/Map';

const PlacesItem = ({ item }) => {
  const [showMap, setShowMap] = useState(false);
  console.log(showMap);
  return (
    <>
      <Modal
        show={showMap}
        header={item.address}
        contentClass="place-item__modal-content"
        onCancel={() => setShowMap(false)}
        footerClass="place-item__modal-actions"
        footer={<Button onClick={() => setShowMap(false)}>Close</Button>}
      >
        <div className="map-container">
          <Map coordinates={item.coordinates} address={item.address} />
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <Image src={item.image} alt={item.title} />
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
            <Button to={`/places/${item.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlacesItem;
