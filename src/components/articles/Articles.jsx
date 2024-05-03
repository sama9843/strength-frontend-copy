import React, { useState } from 'react';
import ArticleList from './ArticleList';

export default function Articles({ search: initialSearch, count }) {
  const [search, setSearch] = useState(initialSearch || '');
  const [error, setError] = useState(false);
  let searchTimeout;
  function onSearch(value, delay) {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    if (delay) {
      // Ensures one request every 500ms to avoid API request spamming from
      // someone typing into the search field.
      searchTimeout = setTimeout(function() {
        setError(false);
        setSearch(value);
      }, 500);
    } else {
      setError(false);
      setSearch(value);
    }
  }
  return (
    <>
      <form className="relative block w-full search-articles" onSubmit={(event) => { event.preventDefault(); onSearch(event.target.search.value, false); }}>
        <input
          placeholder="Search articles"
          className="bg-white-200 text-center appearance-none border-2 border-green-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
          type="text"
          name="search"
          onChange={(event) => onSearch(event.target.value, true)} />
          {search &&
            <button aria-label="Clear search" className="absolute block top-0 right-0 text-green-700 w-6 h-6 box-content pr-3 py-2" onClick={(event) => event.currentTarget.parentElement.search.value = ''}>
              <svg aria-hidden="true" className="block w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>}
      </form>
      <ArticleList search={search} count={count} error={error} errorCallback={setError} />
    </>
  );
}
