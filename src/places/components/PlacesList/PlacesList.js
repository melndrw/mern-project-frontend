import React from 'react';
import './PlacesList.css';
import Card from '../../../shared/components/UIElements/Card/Card';
import Button from '../../../shared/components/FormElements/Button/Button';
import PlacesItem from '../PlacesItem/PlacesItem';

const PlacesList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No place found, Maybe create one?</h2>
          <Button to="/places/new">Share Places</Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="place-list center">
      {items.map((item, idx) => (
        <PlacesItem onDelete={onDeletePlace} key={idx} item={item} />
      ))}
    </div>
  );
};

export default PlacesList;
