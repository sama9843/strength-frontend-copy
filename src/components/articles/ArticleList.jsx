import React, { useEffect, useRef, useState } from 'react';
import { HTTP_GET, Request } from '../../utils/api';
import Error from '../Error';
import Spinner from '../Spinner';
import Article from './Article';

export default function ArticleList() {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let ignore = false;
    (async function() {
      const response = (await new Request('v1/articles', HTTP_GET).background(setError)).response;
      if (!ignore) {
        setArticles(response);
      }
    })();
    return () => {
      ignore = true;
    }
  }, []);
  return (
    <>
      {error && <Error errorCallback={setError} />}
      {articles instanceof Array ? articles.map(article => (
        <Article key={article.id} title={article.title} url={article.url} publicationTime={article.publicationTime} />)) : error ||
        <div className="text-center">
          <div class="w-10 h-10 mx-auto">
            <Spinner />
          </div>
        </div>}
    </>
  );
}
