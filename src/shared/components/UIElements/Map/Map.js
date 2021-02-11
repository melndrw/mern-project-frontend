import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';
// import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  return (
    <div className={`map ${props.className}`} style={props.style}>
      <MapContainer
        center={[props.coordinates.lat, props.coordinates.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          accessToken={process.env.REACT_APP_MAP_TOKEN}
        />
        <Marker position={[props.coordinates.lat, props.coordinates.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
