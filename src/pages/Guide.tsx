import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import ZoneDetail from '../components/ZoneDetail';
import LifeList from '../components/LifeList';
import ZoneNavigation from '../components/ZoneNavigation';

import { IZone, IImageZone, ILife } from '../types';

import '../styles/zone.scss';

const apiUrl = process.env.REACT_APP_API_URL || '';
// const seeMoreImages = [
//   {
//     filepath: '/media/images/sapo-comum-1.png',
//     caption: 'Sapo Comum (bufo bufo)',
//   },
//   {
//     filepath: '/media/images/salamandra-comum-1.png',
//     caption: 'Salamandra-comum (Salamandra salamandra)',
//   },
//   {
//     filepath: '/media/images/licranco-1.png',
//     caption: 'Licranço (Anguis fragilis)',
//   },
//   {
//     filepath: '/media/images/cobra-de-escada-1.png',
//     caption: 'Cobra-de-escada (Elaphe scalaris)',
//   },
// ];

// const ZoneTest: Zone = {
//   coverImage: {
//     filepath: '/media/images/vida-num-muro-1.png',
//     caption: 'Muro do engenho das buchas. Outono',
//   },
//   title: 'A vida num muro',
//   description: `
//     Em muitas áreas do Parque o terreno foi armado em socalcos para dar origem a campos agrícolas.

//     A consolidação desses terrenos planos, redutores da erosão, fez-se aplicando muros de pedra. Sem demora, vieram a tornar-se excelentes suportes de vida.

//     Nas fendas desses muros alojaram-se plantas diversas, típicas desse nicho ecológico, e também animais, como Sardaniscas e Sapos, aves de porte reduzido e pequenos mamíferos.
//   `,
// };

const Guide: React.FC = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [zones, setZones] = useState<IZone[]>([]);
  const [zoneLife, setZoneLife] = useState<ILife[]>([]);
  const [selectedZone, setSelectedZone] = useState(0);


  useEffect(() => {
    fetch(`${apiUrl}/api/zone?lang=pt`)
      .then((res) => res.json())
      .then((zoneData: IZone[]) => {
        if (zoneData.length > 0) {
          setZones(zoneData);
          setFetchingData(false);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [setZones, setFetchingData]);

  useEffect(() => {
    if (zones.length <= 0) {
      return;
    }
    fetch(`${apiUrl}/api/zone/${zones[selectedZone].zone.id}/life?lang=pt`)
      .then((res) => res.json())
      .then((lifeData: ILife[]) => {
        if (lifeData.length > 0) {
          setZoneLife(lifeData);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [zones, setZoneLife, selectedZone]);

  const onPreviousZoneHandler = () => {
    if (zones[selectedZone].zone.previous == null) {
      return;
    }
    const prevZoneIndex = zones.findIndex(z =>
      z.zone.id === zones[selectedZone].zone.previous
    );
    if (prevZoneIndex >= 0) {
      setSelectedZone(prevZoneIndex);
    }
  };

  const onNextZoneHandler = () => {
    if (zones[selectedZone].zone.next == null) {
      return;
    }
    const nextZoneIndex = zones.findIndex(z =>
      z.zone.id === zones[selectedZone].zone.next
    );
    if (nextZoneIndex >= 0) {
      setSelectedZone(nextZoneIndex);
    }
  };

  const onJumpZoneHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Jump Zone');
  };

  if (fetchingData) {
    return null;
  }

  const zoneCoverImage: IImageZone | undefined = zones[
    selectedZone
  ].zone.imagezone_set.find((i) => i.cover === true);

  return (
    <>
      <Navbar />
      <main className="zone-content">
        <div className="zone-header">
          {zoneCoverImage && (
            <>
              <img src={`${apiUrl}${zoneCoverImage.path}`} />
              {/* Texto a carregar da bd */}
              <span>{zoneCoverImage.imagezonetranslations_set[0].name}</span>
            </>
          )}
        </div>
        <ZoneDetail
          zone={{
            title: zones[selectedZone].name,
            description: zones[selectedZone].description,
            audio: zones[selectedZone].audio,
          }}
        />
        <LifeList mediaPath={apiUrl} lifeList={zoneLife} />
        <ZoneNavigation
          hasPrevious={!!zones[selectedZone].zone.previous}
          hasNext={!!zones[selectedZone].zone.next}
          onPreviousZone={onPreviousZoneHandler}
          onNextZone={onNextZoneHandler}
          onJumpZone={onJumpZoneHandler}
        />
      </main>
    </>
  );
};

export default Guide;
