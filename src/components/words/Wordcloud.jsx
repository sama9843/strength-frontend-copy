import React, { useEffect, useState } from 'react';
import { HTTP_GET, Request } from '../../utils/api';
import WordCloud from 'react-d3-cloud';

const testwords = [
  { text: "strength"},
  { text: "weights"},
  { text: "arms"},
  { text: "legs"},
  { text: "back"},
  { text: "exercise"},
  { text: "supplements"},
  { text: "workout"},
  { text: "conditioning"}
];
const fontSize = 30;
const rotate = () => 0;


export default function Wordcloud({error, errorCallback}) {
  const [tips, setTips] = useState(null);
  useEffect(() => {
    let ignore = false;
    if (!error) {
      (async function() {
        setTips(null);
        const response = (await new Request('v1/articles', HTTP_GET).background(errorCallback)).response;
        if (!ignore) {
          setTips(response);
        }
      })();
    }
    return () => {
      ignore = true;
    }
  }, [error]);
  return (
    <>
      <WordCloud
      width={1000}
      height={200}
      //data={testwords}
      data={JSON.stringify(tips, null, 2)}
      fontSize={fontSize}
      rotate={rotate}
      padding={3}
      spiral="rectangular"
      random={Math.random}
  />
    </>
  );
}
