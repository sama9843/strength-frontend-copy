import './App.css';
import Spinner from './components/Spinner';
import Error from './components/Error';
import Home from './views/Home';
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function App() {
  const [blocking, setBlocking] = useState(false);
  const [error, setError] = useState(false);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home blockingCallback={setBlocking} errorCallback={setError} />
    }
  ]);
  return (
    <>
      {blocking && 
          <div className="absolute flex items-center justify-center bg-white w-screen h-screen cursor-wait">
            <Spinner />
          </div>}
      {error && <Error errorCallback={setError} />}
      <RouterProvider router={router} />
    </>
  );
}
