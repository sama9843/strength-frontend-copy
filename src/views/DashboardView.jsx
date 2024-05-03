import React from 'react';

import Gyms from '../components/gyms/Gyms';
import Articles from '../components/articles/Articles';
import Words from '../components/words/Words';

export default function DashboardView({ blockingCallback, errorCallback }) {
  return (
    <main className="p-4">
      <h1 className="mb-2 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl text-center">Fitness Dashboard</h1>
      <p className="text-xl mb-6 text-center">Stay on top of your goals.</p>
      <div className="grid gap-4 lg:grid-cols-3 content-normal">
        <div className="bg-sky-200 rounded-xl p-6 text-center">
          <h2 className="text-3xl xl:text-4xl font-bold mb-2">🔥 What’s Trending</h2>
          <p className="text-lg mb-6">See what fitness topics people are talking about.</p>
          <Words />
        </div>
        <div className="bg-green-200 rounded-xl p-6 text-center">
          <h2 className="text-3xl xl:text-4xl font-bold mb-2">📚 Latest Articles</h2>
          <p className="text-lg mb-6">Learn new techniques to train and stay fit.</p>
          <Articles count="10" />
        </div>
        <div className="bg-orange-200 rounded-xl p-6 text-center">
          <h2 className="text-3xl xl:text-4xl font-bold mb-2">💪 Nearby Gyms</h2>
          <p className="text-lg mb-6">Find the highest-rated gyms in your area.</p>
          <Gyms />
        </div>
      </div>
    </main>
  );
}

