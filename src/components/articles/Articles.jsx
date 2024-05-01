import React, { useState } from 'react';
import ArticleList from './ArticleList';

export default function Articles() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  let searchTimeout;
  function onSearch(value) {
    // Ensures one request every 500ms to avoid API request spamming.
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(function() {
      setError(false);
      setSearch(value);
    }, 500);
  }
  return (
    <> 
      <label className="block text-gray-500 font-bold mb-1 pr-4" htmlFor="articles-search">
        Search
      </label>
      <input className="bg-white-200 appearance-none border-2 border-green-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-600" id="articles-search" name="message" type="text" onChange={(event) => onSearch(event.target.value)} />
      <ArticleList search={search} error={error} errorCallback={setError} />
    </>
  );
}
