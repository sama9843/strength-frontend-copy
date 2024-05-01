import React, { useEffect, useState } from 'react';
import { HTTP_GET, Request } from '../../utils/api';
import Error from '../Error';
import Spinner from '../Spinner';
import Article from './Article';

export default function ArticleList({ search, error, errorCallback }) {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    let ignore = false;
    if (!error) {
      (async function() {
        const response = (await new Request('v1/articles', HTTP_GET, { search }).background(errorCallback)).response;
        if (!ignore) {
          setArticles(response);
        }
      })();
    }
    return () => {
      ignore = true;
    }
  }, [search, error]);
  return (
    <>
      {error && <Error tryAgainCallback={errorCallback} errorCallback={errorCallback} />}
      {articles instanceof Array ? (
        <ul>
          {articles.map(article => (<li key={article.id}><Article title={article.title} url={article.url} publicationTime={article.publicationTime} /></li>))}
        </ul>
      ) : error ||
        <div className="text-center">
          <div className="w-10 h-10 mx-auto">
            <Spinner />
          </div>
        </div>}
    </>
  );
}
