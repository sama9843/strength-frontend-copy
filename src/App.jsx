import './App.css';
import Blocker from './components/Blocker';
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
      {blocking && <Blocker />}
      {error && <Error errorCallback={setError} />}
      <RouterProvider router={router} />
    </>
  );
}
