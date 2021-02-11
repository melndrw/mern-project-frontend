import React from 'react';
import './PlacesList.css';
import { Button } from '@chakra-ui/react';
import Card from '../../../shared/components/UIElements/Card/Card';
import PlacesItem from '../PlacesItem/PlacesItem';

const PlacesList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list">
        <Card>
          <h2>No place found, Maybe create one?</h2>
        </Card>
        <Button>Share Places</Button>
      </div>
    );
  }
  return (
    <div className="place-list center">
      {items.map((item, idx) => (
        <PlacesItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default PlacesList;
