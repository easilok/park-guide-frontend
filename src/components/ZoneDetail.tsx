import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import '../styles/zone.scss';

enum TAB_MENU {
  DESCRIPTION,
  FAUNA,
  FLORA,
}

interface ZoneDetailProps {
  zone: {
    title: string;
    description: string;
  };
}

const ZoneDetail: React.FC<ZoneDetailProps> = ({ zone }) => {
  const [tabMenu, setTabMenu] = useState(TAB_MENU.DESCRIPTION);
  const { t } = useTranslation();

  return (
    <section className="zone-info-content">
      {/* Texto a carregar da bd */}
      <h2>{zone.title}</h2>
      <div>
        <ul className="zone-info-tab">
          <li
            className={tabMenu === TAB_MENU.DESCRIPTION ? 'active' : ''}
            onClick={() => setTabMenu(TAB_MENU.DESCRIPTION)}
          >
            {t('Description')}
          </li>
          <li
            className={tabMenu === TAB_MENU.FAUNA ? 'active' : ''}
            onClick={() => setTabMenu(TAB_MENU.FAUNA)}
          >
            {t('Fauna')}
          </li>
          <li
            className={tabMenu === TAB_MENU.FLORA ? 'active' : ''}
            onClick={() => setTabMenu(TAB_MENU.FLORA)}
          >
            {t('Flora')}
          </li>
        </ul>
      </div>
      <div className="">
        {/* Texto a carregar da bd */}
        {/*
        <p style={{ whiteSpace: 'pre-line' }}>
          {zone.description} 
          */}
        {zone.description
          .split('\n')
          .map((s) => s.trim().length > 0 && <p key={s}>{s}</p>)}
        {/*
        </p>
        */}
      </div>
    </section>
  );
};

export default ZoneDetail;
