import React from 'react';

import Articles from '../components/articles/Articles';

export default function ArticlesView() {
  return (
    <main className="p-4 text-center">
      <h1 className="mb-2 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl text-center">📚 Latest Articles</h1>
      <p className="text-xl mb-6 text-center">Learn new techniques to train and stay fit.</p>
      <Articles count="100" />
    </main>
  );
}
