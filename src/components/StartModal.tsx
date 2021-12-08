import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play } from 'react-feather';
import { Link } from 'react-router-dom';

import { IPark } from '../types';

import '../styles/start-modal.scss';

interface StartModalProps {
  startHref: string;
  park: IPark;
}

const StartModal: React.FC<StartModalProps> = ({ startHref, park }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const modalClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'welcome-modal') {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button
        className="welcome-button btn-green"
        onClick={() => setIsOpen(true)}
      >
        {t('Visit')}
      </button>
      {isOpen && (
        <div
          className="welcome-modal"
          id="welcome-modal"
          onClick={modalClickHandler}
        >
          <div className="welcome-modal__content">
            <div className="header">
              <h3>{t('Park_visit_guide')}</h3>
            </div>
            <hr />
            <div className="main">
              {park.welcome
                .split('\n')
                .map((s) => s.trim().length > 0 && <p key={s}>{s}</p>)}
            </div>
            <div className="footer">
              <Link className="" to={startHref}>
                <Play />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartModal;
