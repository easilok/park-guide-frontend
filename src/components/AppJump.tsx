import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'react-feather';
import QrReader from 'react-qr-reader';

import '../styles/modal.scss';
import '../styles/app-jump.scss';

interface AppJumpProps {
  scanError?: string;
  onQrRead: (data: string) => void;
  onClose: () => void;
}

export const AppJump: React.FC<AppJumpProps> = ({
  onQrRead,
  onClose,
  scanError,
}) => {
  const { t } = useTranslation();
  const [inputData, setInputData] = useState('');

  const handleScan = (data: string | null) => {
    if (data) {
      onQrRead(data);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (err: any) => {
    // eslint-disable-next-line no-console
    console.error(err);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const submitManualHandler = (e: React.FormEvent) => {
    if (inputData.length > 2) {
      onQrRead(inputData);
    }
    e.preventDefault();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <section className="modal-header">
          <h4 className="modal-title">{t('Jump_app_title')}</h4>
        </section>
        <section className="modal-body">
          <span className="jump-camera__info">
            {t('Point_camera_to_zone_QRCode')}
          </span>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            className="jump-camera-preview"
          />
          <span className="jump-camera__error">{scanError}</span>
          <span className="jump-camera__info">
            {t('Or_manual_enter_zone_code')}
          </span>
          <div className="jump-camera__manual">
            <form onSubmit={submitManualHandler} noValidate>
              <input
                type="text"
                id="life-code"
                name="life-code"
                value={inputData}
                onChange={inputHandler}
                placeholder={t('Enter_zone_code')}
              />
              <button type="submit">
                <Check />
              </button>
            </form>
          </div>
        </section>
        <section className="modal-footer">
          <button className="jump-camera-close" onClick={onClose}>
            Close
          </button>
        </section>
      </div>
    </div>
  );
};
