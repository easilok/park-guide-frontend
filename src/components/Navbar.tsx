import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../App';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { setLanguage } = useContext(AppContext);

  const languageClickHandler = () => {
    setLanguage('pt');
  };

  return (
    <nav className="action-bar">
      <ul>
        <li>
          <button className="btn-transp-default">{t('Map')}</button>
        </li>
        <li>
          <button className="btn-transp-default" onClick={languageClickHandler}>
            {t('Language')}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
