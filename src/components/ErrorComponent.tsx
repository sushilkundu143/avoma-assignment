import React from "react";

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md" data-testid="errorComponent">
      <h2 className="text-xl font-semibold">Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
