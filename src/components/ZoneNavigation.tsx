import React from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'react-feather';

import RoundedButton from './RoundedButton';

import '../styles/zone.scss';

interface ZoneNavProps {
  onPreviousZone: () => void;
  onNextZone: () => void;
  onJumpZone: () => void;
}

const ZoneNavigation: React.FC<ZoneNavProps> = ({
  onPreviousZone,
  onNextZone,
  onJumpZone,
}) => {
  return (
    <div className="zone__navigation">
      <RoundedButton onClick={onPreviousZone}>
        <ChevronLeft />
      </RoundedButton>
      <RoundedButton onClick={onJumpZone}>
        <Camera />
      </RoundedButton>
      <RoundedButton onClick={onNextZone}>
        <ChevronRight />
      </RoundedButton>
    </div>
  );
};

export default React.memo(ZoneNavigation);
