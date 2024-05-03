import React, { useEffect, useState } from 'react';

export default function GymRatings({ error }) {
  const [data, setData] = useState([]);
  const places = [];
  const url = "http://localhost:3000/api?location=40.0150%2C-105.270546&radius=1000&keyword=gym&key=AIzaSyDwYKdRzM84YjBmH6QLpxFXfpRPEIbNn8k";
   
  useEffect(() => {
    let ignore = false;
    if (!error) {
      (async function() {
        //const response = (await new Request(url).background(errorCallback)).response;
        const response = await ((await fetch(url))).json();
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
