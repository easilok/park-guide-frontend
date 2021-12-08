import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import ZoneDetail from '../components/ZoneDetail';
import LifeList from '../components/LifeList';
import ZoneNavigation from '../components/ZoneNavigation';
import { AppJump } from '../components/AppJump';
import { AppContext } from '../App';

import { IZone, IImageZone, ILife } from '../types';

import '../styles/zone.scss';

// const apiUrl = process.env.REACT_APP_API_URL || '';
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
  const { t } = useTranslation();
  const [fetchingData, setFetchingData] = useState(true);
  const [zones, setZones] = useState<IZone[]>([]);
  const [zoneLife, setZoneLife] = useState<ILife[]>([]);
  const [selectedZone, setSelectedZone] = useState(0);
  const [showJump, setShowJump] = useState(false);
  const [scanError, setScanError] = useState('');
  const { apiUrl, language } = useContext(AppContext);

  useEffect(() => {
    setFetchingData(true);
    fetch(`${apiUrl}/api/zone?lang=${language}`)
      .then((res) => res.json())
      .then((zoneData: IZone[]) => {
        if (zoneData.length > 0) {
          setZones(zoneData);
          setFetchingData(false);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [setZones, setFetchingData, language]);

  useEffect(() => {
    if (zones.length <= 0) {
      return;
    }
    fetch(
      `${apiUrl}/api/zone/${zones[selectedZone].zone.id}/life?lang=${language}`
    )
      .then((res) => res.json())
      .then((lifeData: ILife[]) => {
        if (lifeData.length > 0) {
          setZoneLife(lifeData);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [zones, setZoneLife, selectedZone, language]);

  const onPreviousZoneHandler = () => {
    if (zones[selectedZone].zone.previous == null) {
      return;
    }
    const prevZoneIndex = zones.findIndex(
      (z) => z.zone.id === zones[selectedZone].zone.previous
    );
    if (prevZoneIndex >= 0) {
      setSelectedZone(prevZoneIndex);
    }
  };

  const onNextZoneHandler = () => {
    if (zones[selectedZone].zone.next == null) {
      return;
    }
    const nextZoneIndex = zones.findIndex(
      (z) => z.zone.id === zones[selectedZone].zone.next
    );
    if (nextZoneIndex >= 0) {
      setSelectedZone(nextZoneIndex);
    }
  };

  const onJumpZoneHandler = useCallback(() => {
    setScanError('');
    setShowJump(true);
  }, [setScanError, setShowJump]);

  const qrReadHandler = useCallback(
    (data: string) => {
      const qrZoneIndex = zones.findIndex((z) => z.zone.code === data);

      if (qrZoneIndex >= 0) {
        setSelectedZone(qrZoneIndex);
        setShowJump(false);
      } else {
        setScanError(t('Invalid_zone_code'));
      }
    },
    [zones, setSelectedZone, setShowJump]
  );

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
              {zoneCoverImage.imagezonetranslations_set.length > 0 && (
                <span>{zoneCoverImage.imagezonetranslations_set[0].name}</span>
              )}
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
        {!showJump && (
          <ZoneNavigation
            hasPrevious={!!zones[selectedZone].zone.previous}
            hasNext={!!zones[selectedZone].zone.next}
            onPreviousZone={onPreviousZoneHandler}
            onNextZone={onNextZoneHandler}
            onJumpZone={onJumpZoneHandler}
          />
        )}
        {showJump && (
          <AppJump
            onClose={() => setShowJump(false)}
            onQrRead={qrReadHandler}
            scanError={scanError}
          />
        )}
      </main>
    </>
  );
};

export default Guide;
