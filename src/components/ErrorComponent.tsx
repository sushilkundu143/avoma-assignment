import React from "react";

interface ErrorComponentProps {
  title?: string;
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ title = 'Error', message }) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md" data-testid="errorComponent">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
