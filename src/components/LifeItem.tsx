import React, { useContext } from 'react';

import { ILifeZone } from '../types';
import { AppContext } from '../App';

import '../styles/zone.scss';

interface LifeItemProps {
  life: ILifeZone;
  backgroundStyle?: boolean;
  onSelect: (life: ILifeZone) => void;
}

export const LifeItem: React.FC<LifeItemProps> = ({
  life,
  backgroundStyle,
  onSelect,
}) => {
  const { apiUrl } = useContext(AppContext);

  const backgroundImage =
    life.life.imagelife_set.length > 0
      ? `url(${apiUrl}${life.life.imagelife_set[0].path})`
      : '';
  const bgStyle = backgroundStyle
    ? {
        backgroundImage: backgroundImage,
      }
    : {};

  return (
    <div className="zone-life-list__item">
      <div style={bgStyle} onClick={() => onSelect(life)}>
        {!backgroundStyle && (
          <img
            src={`${apiUrl}${life.life.imagelife_set[0].path}`}
            alt={life.life.scientific}
          />
        )}
        <span>{`${life.life.lifetranslations_set[0].name} (${life.life.scientific})`}</span>
      </div>
    </div>
  );
};
