import React from 'react';

import '../styles/RoundedButton.scss';

interface RoundedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disable?: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  children,
  className,
  onClick,
  disable,
}) => {
  let bClass = 'rounded-button';
  if (className) {
    bClass += ' ' + className;
  }
  if (disable) {
    bClass += ' disabled';
  }

  return (
    <button className={bClass} onClick={() => !disable && onClick()}>
      {children}
    </button>
  );
};

export default React.memo(RoundedButton);
