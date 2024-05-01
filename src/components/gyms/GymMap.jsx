import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '256px',
};

const center = {
  lat: 40.015, // default latitude
  lng: 255.9656, // default longitude
};

export default function GymMap() {
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}>
      <Marker position={{lat: 40.0150, lng: 255.9656}} />
    </GoogleMap>
  );
}
