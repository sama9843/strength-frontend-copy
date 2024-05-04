import React, { useEffect, useState } from 'react';
import { HTTP_GET, Request } from '../../utils/api';
import WordCloud from 'react-d3-cloud';
import Spinner from '../Spinner';

const fontSize = 30;
const rotate = () => 0;


export default function Wordcloud({error, errorCallback}) {
  const [tips, setTips] = useState([]);
  const words = []
  useEffect(() => {
    let ignore = false;
    if (!error) {
      (async function() {
        setTips(null);
        const response = (await new Request('v1/articles', HTTP_GET).background(errorCallback)).response;
        if (!ignore) {
          for (let article of response) {
            words.push({text: article.title});
          }
          setTips(words);
        }
      })();
    }
    return () => {
      ignore = true;
    }
  }, [error]);
  return (
    <>
      {tips instanceof Array ? (
        tips.length > 2 ?
          <ul className="article-list">
            <WordCloud
            width={1000}
            height={200}
            data={tips}
            fontSize={fontSize}
            rotate={rotate}
            padding={3}
            spiral="rectangular"
            random={Math.random}/>
          </ul> : <p className="font-bold pt-4">No current trends.</p>
      ) : error ||
        <div className="text-center">
          <div className="w-10 h-10 mx-auto my-4">
            <Spinner />
          </div>
        </div>}
    </>
  );
}
