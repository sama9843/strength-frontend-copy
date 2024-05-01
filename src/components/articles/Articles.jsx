import React, { useState } from 'react';
import ArticleList from './ArticleList';

export default function Articles() {
  const [search, setSearch] = useState('');
  return (
    <>
      <ArticleList search={search} />
    </>
  );
}
