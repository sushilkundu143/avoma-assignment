// src/components/CardComponent.tsx
import React from "react";
import { Link } from "react-router-dom";

interface CardComponentProps {
  title: string;
  body: string;
  id: number;
  linkPath?: string;
  clickable?: boolean; // New prop to determine if card is clickable
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  body,
  id,
  linkPath,
  clickable = true, // Default to true if not provided
}) => {
  const cardContent = (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{body}</p>
    </div>
  );

  return (
    <div key={id} data-testid="cardComponent">
      {clickable && linkPath ? (
        <Link to={linkPath} className="block">
          {cardContent}
        </Link>
      ) : (
        <div>{cardContent}</div>
      )}
    </div>
  );
};

export default CardComponent;
