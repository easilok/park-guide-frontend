import React from 'react';
import { X } from 'react-feather';

import RoundedButton from './RoundedButton';

import '../styles/navigation.scss';

interface PageNavProps {
  onClose: () => void;
}

const PageNavigation: React.FC<PageNavProps> = ({ onClose }) => {
  return (
    <div className="page__navigation">
      <RoundedButton onClick={onClose} className="mx-auto">
        <X />
      </RoundedButton>
    </div>
  );
};

export default React.memo(PageNavigation);
