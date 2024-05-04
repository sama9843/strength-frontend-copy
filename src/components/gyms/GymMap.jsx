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
  const gyms = [
    {lat:40.0164221,lng:-105.279267},
    {lat:40.01543360000001,lng:-105.2612796},
    {lat:40.01421,lng:-105.2626733},
    {lat:40.0226344,lng:-105.261516},
    {lat:40.0195165,lng:-105.2599253},
    {lat:40.01533269999999,lng:-105.2597696},
    {lat:40.02096362989273,lng:-105.2664713201073}];

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
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}onClick={onMapClick}>
      {gyms.map((marker) => (
          <Marker 
            position={{ 
              lat: marker.lat,
              lng: marker.lng 
            }} icon={"http://maps.google.com/mapfiles/ms/icons/purple-dot.png"} />
      ))}         
      {marks.map((marker) => (
          <Marker 
            position={{ 
              lat: marker.lat,
              lng: marker.lng 
            }}  />
      ))}
    </GoogleMap>
  );
}
