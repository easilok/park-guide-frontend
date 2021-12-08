import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../App';
import StartModal from '../components/StartModal';

import { IPark } from '../types';

import '../styles/main.scss';

// const apiUrl = process.env.REACT_APP_API_URL || '';
const inititialParkState: IPark = {
  name: '',
  welcome: '',
  park: {
    address: '',
  },
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [fetchingData, setFetchingData] = useState(true);
  const [park, setPark] = useState<IPark>(inititialParkState);
  const { apiUrl, language } = useContext(AppContext);

  useEffect(() => {
    fetch(`${apiUrl}/api/park?lang=${language}`)
      .then((res) => res.json())
      .then((parkData: IPark[]) => {
        // eslint-disable-next-line no-console
        if (parkData.length > 0) {
          setPark(parkData[0]);
          setFetchingData(false);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [setPark]);

  if (fetchingData) {
    return null;
  }

  return (
    <div className="home">
      <div className="home-header">
        <div className="welcome-message">
          <h1 className="title">{t('Welcome')}</h1>
          <h3 className="subtitle">
            {t('Online guide from')} <br />
            {park.name}
          </h3>
        </div>
      </div>
      <StartModal park={park} startHref="/start" />
    </div>
  );
};

export default Home;
