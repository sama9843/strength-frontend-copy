import React, { useState } from 'react';
import { HTTP_POST, Request } from '../utils/api';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import ReactWordcloud from 'react-wordcloud';


const libraries = ['places'];
const mapContainerStyle = {
  width: '32vw',
  height: '70vh',
};
const center = {
  lat: 40.015, // default latitude
  lng: 255.9656, // default longitude
};


const testwords = [
  { text: "strength", value: 1000 },
  { text: "weights", value: 500 },
  { text: "arms", value: 200 },
  { text: "legs", value: 400 },
  { text: "back", value: 100 },
  { text: "exercise", value: 2000 },
  { text: "supplements", value: 700 },
  { text: "workout", value: 1500 },
  { text: "conditioning", value: 400 }
];


export default function Main({ blockingCallback, errorCallback }) {


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwYKdRzM84YjBmH6QLpxFXfpRPEIbNn8k',
    libraries,
  });


  if (loadError) {
    return <div>Error loading maps</div>;
  }


  if (!isLoaded) {
    return <div>Loading maps</div>;
  }


  return (
    <main className="flex justify-top gap-4 flex-col min-h-screen h-56 ">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Fitness Tips</h1>
      {/*<div className="mx-auto">
        <Form blockingCallback={blockingCallback} errorCallback={errorCallback} />
      </div>*/}
      <div class = "grid grid-cols-3 gap-4 content-normal">
        <div class="bg-slate-100 dark:bg-gray-900">
          <h2 class="text-4xl font-extrabold dark:text-white">Tips</h2>
          <div style={{ height: 700, width: 600 }}>
            <ReactWordcloud words={testwords} />
          </div>
        </div>
        <div class="bg-teal-100 dark:bg-gray-900">
          <h2 class="text-4xl font-extrabold dark:text-white">Articles</h2>
          <div class="flex flex-wrap gap-4 p-6 justify-center text-lg font-serif">
            <a href="#"
                class="bg-gray-100 flex-grow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12">
                Stretches to Maximize Workout
            </a>
            <a class="bg-gray-100 flex-grow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
                href="#">
                Meals to Eat Before Working Out
            </a>
            <a class="bg-gray-100 flex-grow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12"
                href="#">
                Best Exercises for Building Arms
            </a>
          </div>
        </div>
        <div class="bg-slate-100 dark:bg-gray-900">
          <h2 class="text-4xl font-extrabold dark:text-white">Nearby Gyms</h2>
          <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          >
          <Marker position={center} />
        </GoogleMap>
        </div>
      </div>
     
    </main>
  );
}

