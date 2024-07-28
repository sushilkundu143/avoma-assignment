// src/pages/PageNotFound.tsx
import React from 'react';

const PageNotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <a
          href="/"
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
