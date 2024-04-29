import React, { useState ,useEffect} from 'react';
import { HTTP_POST, Request } from '../utils/api';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
//import ReactWordcloud from 'react-wordcloud';


const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '256px',
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

  const [data, setData] = useState([]);
  const places = [];
  const url = "http://localhost:3000/api?location=40.0150%2C-105.270546&radius=1000&keyword=gym&key=AIzaSyDwYKdRzM84YjBmH6QLpxFXfpRPEIbNn8k";
  fetch(url)
      .then(res => res.json())
      .then(res => {
          for (let googlePlace of res.results) {
          var place = {};
          var myLat = googlePlace.geometry.location.lat;
          var myLong = googlePlace.geometry.location.lng;
          var coordinate = {
              lat: myLat,
              lng: myLong,
          };
          //place['coordinate'] = coordinate;
          place['Name'] = googlePlace.name;
          place['Rating'] = googlePlace.rating;
          place['Address'] = googlePlace.vicinity;
          places.push(place);
          }
          return (places)//.map(nearbyPlaces => nearbyPlaces.placeName))
      })
      .then(info => setData(info))
      .catch(error => { 
          console.log(error);
      });

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
    <main class="p-4">
      <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl text-center">Fitness Dashboard</h1>
      <p className="text-xl mb-6 text-center">Stay on top of your goals.</p>
      {/*<div className="mx-auto">
        <Form blockingCallback={blockingCallback} errorCallback={errorCallback} />
      </div>*/}
      <div className="grid lg:grid-cols-3 gap-4 content-normal">
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-6 text-center">
          <h2 className="text-3xl xl:text-4xl font-extrabold mb-2">🔥 What’s Trending</h2>
          <p className="text-lg mb-6">See what fitness topics people are talking about.</p>
          <div>
            {/*<ReactWordcloud words={testwords}></ReactWordcloud>*/}
          </div>
        </div>
        <div className="bg-green-100 border border-green-300 rounded-xl p-6 text-center">
          <h2 className="text-3xl xl:text-4xl font-extrabold mb-2">📚 Latest Articles</h2>
          <p className="text-lg mb-6">Learn new techniques to train and stay fit.</p>
          <div className="flex flex-row flex-wrap gap-4 xl:pl-4 xl:pr-4 justify-center text-lg font-serif">
            <a className="bg-white shadow hover:shadow-md transition-shadow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full" href="#">
                Stretches to Maximize Workout
            </a>
            <a className="bg-white shadow hover:shadow-md transition-shadow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full" href="#">
                Meals to Eat Before Working Out
            </a>
            <a className="bg-white shadow hover:shadow-md transition-shadow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full" href="#">
                Best Exercises for Building Arms
            </a>
          </div>
        </div>
        <div className="bg-orange-100 border border-orange-300 rounded-xl p-6 text-center">
          <h2 className="text-3xl xl:text-4xl font-extrabold mb-2">💪 Nearby Gyms</h2>
          <p className="text-lg mb-6">Find the highest-rated gyms in your area.</p>
          <div className="border border-orange-300">
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}>
            <Marker position={{lat: 40.0150, lng: 255.9656}} />
            </GoogleMap>
          </div>
        {data ? <pre>{JSON.stringify(data, null, 2).replace(/"|,|{|}|\[|\]/g,"")}</pre> : 'Loading...'}
        </div>
      </div>
     
    </main>
  );
}

