import './App.css';
import Spinner from './components/Spinner';
import Error from './components/Error';
import DashboardView from './views/DashboardView';
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArticlesView from './views/ArticlesView';

export default function App() {
  const [blocking, setBlocking] = useState(false);
  const [error, setError] = useState(false);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardView blockingCallback={setBlocking} errorCallback={setError} />
    }
  ]);
  return (
    <>
      {blocking && 
          <div className="absolute flex items-center justify-center bg-white w-screen h-screen cursor-wait">
            <div class="w-16 h-16">
              <Spinner />
            </div>
          </div>}
      {error && <Error errorCallback={setError} />}
      <RouterProvider router={router} />
    </>
  );
}
