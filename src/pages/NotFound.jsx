import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white px-4">
      <img
        src="/404.png"
        alt="404 Not Found"
        className="max-w-md w-full mb-6"
      />
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Oops! The page you're looking for doesn't exist.
      </h1>
      <Link
        to="/"
        className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
