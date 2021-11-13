import React from 'react';

import Navbar from '../components/Navbar';
import ZoneDetail from '../components/ZoneDetail';
import SeeMore from '../components/SeeMore';
import ZoneNavigation from '../components/ZoneNavigation';

import '../styles/zone.scss';

const mediaPath = process.env.REACT_APP_MEDIA_URL || '';
const seeMoreImages = [
  {
    filepath: '/media/images/sapo-comum-1.png',
    caption: 'Sapo Comum (bufo bufo)',
  },
  {
    filepath: '/media/images/salamandra-comum-1.png',
    caption: 'Salamandra-comum (Salamandra salamandra)',
  },
  {
    filepath: '/media/images/licranco-1.png',
    caption: 'Licranço (Anguis fragilis)',
  },
  {
    filepath: '/media/images/cobra-de-escada-1.png',
    caption: 'Cobra-de-escada (Elaphe scalaris)',
  },
];

interface Zone {
  coverImage: {
    filepath: string;
    caption: string;
  };
  title: string;
  description: string;
}

const ZoneTest: Zone = {
  coverImage: {
    filepath: '/media/images/vida-num-muro-1.png',
    caption: 'Muro do engenho das buchas. Outono',
  },
  title: 'A vida num muro',
  description: `
    Em muitas áreas do Parque o terreno foi armado em socalcos para dar origem a campos agrícolas.

    A consolidação desses terrenos planos, redutores da erosão, fez-se aplicando muros de pedra. Sem demora, vieram a tornar-se excelentes suportes de vida.

    Nas fendas desses muros alojaram-se plantas diversas, típicas desse nicho ecológico, e também animais, como Sardaniscas e Sapos, aves de porte reduzido e pequenos mamíferos.
  `,
};

const Guide: React.FC = () => {
  const onPreviousZoneHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Previous Zone');
  };

  const onNextZoneHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Next Zone');
  };

  const onJumpZoneHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Jump Zone');
  };

  return (
    <>
      <Navbar />
      <main className="zone-content">
        <div className="zone-header">
          <img src={`${mediaPath}${ZoneTest.coverImage.filepath}`} />
          {/* Texto a carregar da bd */}
          <span>{ZoneTest.coverImage.caption}</span>
        </div>
        <ZoneDetail
          zone={{
            title: ZoneTest.title,
            description: ZoneTest.description,
          }}
        />
        <SeeMore mediaPath={mediaPath} slideshowImages={seeMoreImages} />
        <ZoneNavigation
          onPreviousZone={onPreviousZoneHandler}
          onNextZone={onNextZoneHandler}
          onJumpZone={onJumpZoneHandler}
        />
      </main>
    </>
  );
};

export default Guide;
