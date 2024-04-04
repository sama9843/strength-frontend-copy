import React, { useState } from 'react';
import { HTTP_POST, request } from '../lib/endpoint';

function SubmitButton({ name, submitting }) {
  return submitting ? (
    <button className="flex flex-row items-center shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-not-allowed" type="submit" disabled>
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Submit
    </button>
  ) : (
    <button className="flex flex-row items-center shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
      Submit
    </button>
  );
}

export default function Form() {
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting)
      return;
    setSubmitting(true);
    setResponse((await request('submit', HTTP_POST, { message: event.target.message.value })).message);
    setSubmitting(false);
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
          <SubmitButton submitting={submitting} />
        </div>
      </div>
      {response && !submitting &&
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
