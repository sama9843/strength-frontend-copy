import './App.css';
import Blocker from './components/Blocker';
import Error from './components/Error';
import Main from './views/Main';
import { useState } from 'react';

export default function App() {
  const [blocking, setBlocking] = useState(false);
  const [error, setError] = useState(false);
  return (
    <>
      {blocking && <Blocker />}
      {error && <Error errorCallback={setError} />}
      <Main blockingCallback={setBlocking} errorCallback={setError} />
    </>
  );
}
