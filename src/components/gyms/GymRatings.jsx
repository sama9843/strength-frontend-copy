import React, { useState } from 'react';

export default function GymRatings() {
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

  return (
    <>
      {data ? <pre>{JSON.stringify(data, null, 2).replace(/"|,|{|}|\[|\]/g, "")}</pre> : 'Loading...'}
    </>
  );
}
