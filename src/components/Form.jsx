import React, { useState } from 'react';
import { HTTP_POST, Request } from '../utils/api';

export default function Form({ blockingCallback, errorCallback }) {
  const [response, setResponse] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const request = await new Request('submit', HTTP_POST, { 'message': event.target.message.value }).blocking(blockingCallback, errorCallback);
    setResponse(request.getResponseValue('message'));
  }

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="md:flex md:items-center mb-4">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-message">
            Message
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="inline-message" name="message" type="text" />
        </div>
      </div>
      <div className="md:flex md:items-center mb-4">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button className="flex flex-row items-center shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
            Submit
          </button>
        </div>
      </div>
      {response  &&
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <span className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Echo</span>
          </div>
          <div className="md:w-2/3">
            <span>{response}</span>
          </div>
        </div>}
    </form>
  );
}
