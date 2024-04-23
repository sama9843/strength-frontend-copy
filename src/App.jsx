import './App.css';
import Blocker from './components/Blocker';
import Error from './components/Error';
import EchoMessageView from './views/EchoMessageView';
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupView from './views/accounts/SignupView';
import LoginView from './views/accounts/LoginView';

export default function App() {
  const [blocking, setBlocking] = useState(false);
  const [error, setError] = useState(false);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <EchoMessageView blockingCallback={setBlocking} errorCallback={setError} />
    },
    {
      path: '/create-account',
      element: <SignupView />
    },
    {
      path: '/login',
      element: <LoginView />
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
