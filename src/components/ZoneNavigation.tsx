import React from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'react-feather';

import RoundedButton from './RoundedButton';

import '../styles/zone.scss';

interface ZoneNavProps {
  hasPrevious: boolean;
  hasNext: boolean;
  onPreviousZone: () => void;
  onNextZone: () => void;
  onJumpZone: () => void;
}

const ZoneNavigation: React.FC<ZoneNavProps> = ({
  onPreviousZone,
  onNextZone,
  onJumpZone,
  hasPrevious,
  hasNext,
}) => {
  return (
    <div className="zone__navigation">
      <RoundedButton onClick={onPreviousZone} disable={!hasPrevious}>
        <ChevronLeft />
      </RoundedButton>
      <RoundedButton onClick={onJumpZone}>
        <Camera />
      </RoundedButton>
      <RoundedButton onClick={onNextZone} disable={!hasNext}>
        <ChevronRight />
      </RoundedButton>
    </div>
  );
};

export default React.memo(ZoneNavigation);
