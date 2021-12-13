import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import ZoneNavigation from '../components/ZoneNavigation';
import { AppJump } from '../components/AppJump';
import { ZonePage } from './ZonePage';
import { LifePage } from './LifePage';
import { AppContext } from '../App';

import { IZone, ILifeZone, ILife } from '../types';

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
  const { apiUrl, language } = useContext(AppContext);
  const navigate = useNavigate();
  const { zoneId } = useParams();
  // State data
  const [fetchingData, setFetchingData] = useState(true);
  const [zones, setZones] = useState<IZone[]>([]);
  const [zoneLife, setZoneLife] = useState<ILifeZone[]>([]);
  const [selectedZone, setSelectedZone] = useState(0);
  const [scanError, setScanError] = useState('');
  const [showJump, setShowJump] = useState(false);
  const [viewLife, setViewLife] = useState<ILife | null>(null);

  useEffect(() => {
    setFetchingData(true);
    fetch(`${apiUrl}/api/zone/?lang=${language}`)
      .then((res) => res.json())
      .then((zoneData: IZone[]) => {
        if (zoneData.length > 0) {
          if (zoneId) {
            const selectedZoneIndex = zoneData.findIndex(
              (z) => z.zone.id.toString() === zoneId
            );
            if (selectedZoneIndex >= 0) {
              setSelectedZone(selectedZoneIndex);
            }
          }
          setZones(zoneData);
          setFetchingData(false);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [setZones, setFetchingData, language, zoneId]);

  useEffect(() => {
    if (zones.length <= 0) {
      return;
    }
    fetch(
      `${apiUrl}/api/zone/${zones[selectedZone].zone.id}/life?lang=${language}`
    )
      .then((res) => res.json())
      .then((lifeData: ILifeZone[]) => {
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
      navigate(`/zone/${zones[prevZoneIndex].zone.id}`);
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
      navigate(`/zone/${zones[nextZoneIndex].zone.id}`);
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
        navigate(`/zone/${zones[qrZoneIndex].zone.id}`);
        setShowJump(false);
      } else {
        setScanError(t('Invalid_zone_code'));
      }
    },
    [zones, setSelectedZone, setShowJump]
  );

  const lifeSelectHandler = (life: ILifeZone) => {
    setViewLife(life.life);
  };

  if (fetchingData) {
    return null;
  }

  if (viewLife) {
    return (
      <LifePage selectedLife={viewLife} onClose={() => setViewLife(null)} />
    );
  }

  return (
    <>
      <ZonePage
        zone={zones[selectedZone]}
        zoneLife={zoneLife}
        onLifeSelect={lifeSelectHandler}
      />
      <section>
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
      </section>
    </>
  );
};

export default Guide;
