import React from 'react';

interface CardProps {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  let componentClass = `p-4 border border-solid 
  border-gray-300 rounded-xl shadow-xl m-2 `;
  if (className && className.length > 0) {
    componentClass += className;
  }

  return <section className={componentClass}>{children}</section>;
};
