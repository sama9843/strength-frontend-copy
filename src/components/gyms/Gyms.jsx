import React, { useState } from 'react';
import GymMap from './GymMap';
import GymRatings from './GymRatings';
import { useLoadScript } from '@react-google-maps/api';
import Spinner from '../Spinner';

const libraries = ['places'];

export default function Gyms() {
  const [error, setError] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwYKdRzM84YjBmH6QLpxFXfpRPEIbNn8k',
    libraries,
  });
  return (
    <>
        {isLoaded ?
          <div className="shadow">
            <GymMap />
          </div> : loadError ? <div>Error loading maps</div> :
          <div className="text-center">
            <div className="w-10 h-10 mx-auto">
              <Spinner />
            </div>
          </div>}
      <GymRatings error={error} />
    </>
  );
}
