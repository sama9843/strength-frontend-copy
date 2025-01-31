import React from 'react';

export default function Error({ tryAgainCallback, errorCallback }) {
  return (
    <div className="bg-red-100 text-center text-red-700 px-4 py-3 m-4 rounded relative" role="alert">
      <strong className="font-bold mx-1">We couldn't quite make that last rep.</strong>
      <span className="block sm:inline">Something went wrong, please {tryAgainCallback ? <a role="button" className="font-bold underline" href="#" onClick={(event) => { event.preventDefault(); errorCallback(false); }}>try again</a> : 'try again'}.</span>
      <button aria-label="Close alert" className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => { errorCallback(false); }}>
        <svg aria-hidden="true" className="fill-current h-6 w-6 text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
      </button>
    </div>
  );
}
