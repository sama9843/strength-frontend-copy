import React, { useEffect, useState } from 'react';
import { HTTP_GET, Request } from '../../utils/api';

export default function GymRatings({ error, errorCallback }) {
  const [data, setData] = useState([]);
  const places = [];
  const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.0150%2C-105.270546&radius=1000&keyword=gym&key=AIzaSyDwYKdRzM84YjBmH6QLpxFXfpRPEIbNn8k";
   
  useEffect(() => {
    let ignore = false;
    if (!error) {
      (async function() {
        //const response = (await new Request(url).background(errorCallback)).response;
        //const response = await ((await fetch(url,{mode:'cors',headers:{'Access-Control-Allow-Origin':'*'}}))).json();
        const response = (await new Request(url, HTTP_GET).background(errorCallback)).response;
        if (!ignore) {
          for (let googlePlace of response.results) {
            var place = {};
            place['Name'] = googlePlace.name;
            place['Rating'] = googlePlace.rating;
            place['Address'] = googlePlace.vicinity;
            places.push(place);
          }
          setData(places);
        }
      })();
    }
    return () => {
      ignore = true;
    }
  }, []);
  
  return (
    <>
      {data ? <pre>{JSON.stringify(data, null, 2).replace(/"|,|{|}|\[|\]/g, "")}</pre> : 'Loading...'}
    </>
  );
}
