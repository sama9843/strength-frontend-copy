import React, { useState } from 'react';
import Wordcloud from './Wordcloud';

export default function Words() {
  const [error, setError] = useState(false);
  return (
    <>
      <Wordcloud error={error} errorCallback={setError}/>
    </>
  );
}
