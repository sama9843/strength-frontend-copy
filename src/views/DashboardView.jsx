import React from 'react';

import Gyms from '../components/gyms/Gyms';
import Articles from '../components/articles/Articles';
import Words from '../components/words/Words';

export default function DashboardView({ blockingCallback, errorCallback }) {
  return (
    <main className="p-4">
      <h1 className="mb-2 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl text-center">Fitness Dashboard</h1>
      <p className="text-xl mb-6 text-center">Stay on top of your goals.</p>
      <div className="grid gap-4 lg:grid-cols-2 content-normal mb-4">
        <div className="bg-sky-100 border border-sky-500 rounded-xl p-6 text-center">
          <h2 className="text-3xl xl:text-4xl font-bold mb-6">🔥 Trending</h2>
          <Words />
        </div>
        <div className="bg-green-100 border border-green-500 rounded-xl p-6 text-center">
          <h2 className="text-3xl xl:text-4xl font-bold mb-6">📚 Latest Articles</h2>
          <Articles count="10" />
        </div>
      </div>
      <div className="bg-orange-100 border border-orange-500 rounded-xl p-6 text-center">
        <h2 className="text-3xl xl:text-4xl font-bold mb-6">💪 Nearby Gyms</h2>
        <Gyms />
      </div>
    </main>
  );
}

