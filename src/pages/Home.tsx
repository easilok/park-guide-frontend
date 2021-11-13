import React from 'react';
import { useTranslation } from 'react-i18next';

import StartModal from '../components/StartModal';

import '../styles/main.scss';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <div className="home-header">
        <div className="welcome-message">
          <h1 className="title">{t('Welcome')}</h1>
          <h3 className="subtitle">
            {t('Online guide from')} <br />
            {t('Parque Biológico de Gaia')}
          </h3>
        </div>
      </div>
      <StartModal startHref="/start" />
    </div>
  );
};

export default Home;
