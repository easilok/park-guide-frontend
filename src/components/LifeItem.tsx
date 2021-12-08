import React from 'react';

import { ILife } from '../types';

import '../styles/zone.scss';

interface LifeItemProps {
  mediaPath: string;
  life: ILife;
  backgroundStyle?: boolean;
}

export const LifeItem: React.FC<LifeItemProps> = ({
  mediaPath,
  life,
  backgroundStyle,
}) => {
  const backgroundImage =
    life.life.imagelife_set.length > 0
      ? `url(${mediaPath}${life.life.imagelife_set[0].path})`
      : '';
  const bgStyle = backgroundStyle
    ? {
        backgroundImage: backgroundImage,
      }
    : {};

  return (
    <div className="zone-life-list__item">
      <div style={bgStyle}>
        {!backgroundStyle && (
          <img
            src={`${mediaPath}${life.life.imagelife_set[0].path}`}
            alt={life.life.scientific}
          />
        )}
        <span>{`${life.life.lifetranslations_set[0].name} (${life.life.scientific})`}</span>
      </div>
    </div>
  );
};
