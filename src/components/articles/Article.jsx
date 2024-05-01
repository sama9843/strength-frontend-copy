import React from 'react';

export default function Article({ title, url, publicationTime }) {
  return (
    <a className="block bg-white shadow hover:shadow-md transition-shadow text-black border-l-8 border-green-500 rounded-md my-4 px-3 py-2 w-full" target="_blank" href={url}>
      {title}
    </a>
  );
}
