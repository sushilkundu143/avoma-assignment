import React from "react";

const LoadingIcon: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen" data-testid="loader">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingIcon;
