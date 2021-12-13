import React, { useContext } from 'react';

import Navbar from '../components/Navbar';
import ZoneDetail from '../components/ZoneDetail';
import LifeList from '../components/LifeList';
import { HeaderImage } from '../components/HeaderImage';
import { AppContext } from '../App';

import { IZone, IImageZone, ILifeZone } from '../types';

import '../styles/zone.scss';

interface ZonePageProps {
  zone: IZone;
  zoneLife: ILifeZone[];
  onLifeSelect: (life: ILifeZone) => void;
}

export const ZonePage: React.FC<ZonePageProps> = ({
  zone,
  zoneLife,
  onLifeSelect,
}) => {
  const { apiUrl } = useContext(AppContext);

  const zoneCoverImage: IImageZone | undefined = zone.zone.imagezone_set.find(
    (i) => i.cover === true
  );

  return (
    <>
      <Navbar />
      <main className="zone-content">
        {zoneCoverImage &&
          zoneCoverImage.imagezonetranslations_set.length > 0 && (
            <HeaderImage
              imageSrc={`${apiUrl}${zoneCoverImage.path}`}
              imageText={zoneCoverImage.imagezonetranslations_set[0].name}
            />
          )}
        <ZoneDetail
          zone={{
            title: zone.name,
            description: zone.description,
            audio: zone.audio,
          }}
        />
        <LifeList lifeList={zoneLife} onLifeSelect={onLifeSelect} />
      </main>
    </>
  );
};
