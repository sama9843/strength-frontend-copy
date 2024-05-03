import React, { useEffect, useState } from 'react';
import { HTTP_GET, Request } from '../../utils/api';
import Error from '../Error';
import Spinner from '../Spinner';
import Article from './Article';

export default function ArticleList({ search, count, error, errorCallback }) {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    let ignore = false;
    if (!error) {
      (async function() {
        setArticles(null);
        const response = (await new Request('v1/articles', HTTP_GET, { search, count }).background(errorCallback)).response;
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
        articles.length > 0 ?
          <ul className="article-list">
            {articles.map(article => (<li key={article.id}><Article title={article.title} url={article.url} publicationTime={article.publicationTime} /></li>))}
          </ul> : <p className="font-bold pt-4">No articles match your search.</p>
      ) : error ||
        <div className="text-center">
          <div className="w-10 h-10 mx-auto my-4">
            <Spinner />
          </div>
        </div>}
    </>
  );
}
