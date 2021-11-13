import React from 'react';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="action-bar">
      <ul>
        <li>
          <button className="btn-transp-default">{t('Map')}</button>
        </li>
        <li>
          <button className="btn-transp-default">{t('Language')}</button>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
