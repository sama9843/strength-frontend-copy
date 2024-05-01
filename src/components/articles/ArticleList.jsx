import React, { useEffect, useState } from 'react';
import { HTTP_GET, Request } from '../../utils/api';
import Error from '../Error';
import Spinner from '../Spinner';
import Article from './Article';

export default function ArticleList({ search }) {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let ignore = false;
    (async function() {
      const response = (await new Request('v1/articles', HTTP_GET, { search }).background(setError)).response;
      if (!ignore) {
        setArticles(response);
      }
    })();
    return () => {
      ignore = true;
    }
  }, [search]);
  return (
    <>
      {error && <Error errorCallback={setError} />}
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
