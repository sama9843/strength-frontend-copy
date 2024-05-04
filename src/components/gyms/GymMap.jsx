import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '256px',
};

const center = {
  lat: 40.015, // default latitude
  lng: 254.7356, // default longitude
};


export default function GymMap() {

  const [marks, setMarks] = useState([]);
  const onMapClick = (e) => {
    setMarks((current) => [
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }
      ]);
    };
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}onClick={onMapClick}
    >           
      {marks.map((marker) => (
          <Marker 
            position={{ 
              lat: marker.lat,
              lng: marker.lng 
            }} />
      ))}
    </GoogleMap>
  );
}
