import React from 'react';

import '../styles/RoundedButton.scss';

interface RoundedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button className={`rounded-button ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default React.memo(RoundedButton);
