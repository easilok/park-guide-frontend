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
      {hasPrevious ? (
        <RoundedButton onClick={onPreviousZone}>
          <ChevronLeft />
        </RoundedButton>
      ) : (
        <div></div>
      )}
      <RoundedButton onClick={onJumpZone}>
        <Camera />
      </RoundedButton>
      {hasNext ? (
        <RoundedButton onClick={onNextZone}>
          <ChevronRight />
        </RoundedButton>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default React.memo(ZoneNavigation);
