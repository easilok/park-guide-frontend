import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from './Card';

import '../styles/zone.scss';

const apiUrl = process.env.REACT_APP_API_URL || '';

interface ZoneDetailProps {
  zone: {
    title: string;
    description: string;
    audio: string;
  };
}

const ZoneDetail: React.FC<ZoneDetailProps> = ({ zone }) => {
  const { t } = useTranslation();
  const audioRef =
    useRef<HTMLAudioElement>() as React.MutableRefObject<HTMLAudioElement>;

  useEffect(() => {
    if (audioRef.current != null) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [zone, audioRef]);

  return (
    <Card className="zone-info-content">
      {/* Texto a carregar da bd */}
      <h2>{zone.title}</h2>
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
      {zone.audio.length > 0 && (
        <div className="zone-info__audio">
          <h5>{t('Audio_guide')}</h5>
          <audio controls ref={audioRef}>
            <source src={`${apiUrl}${zone.audio}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </Card>
  );
};

export default ZoneDetail;
