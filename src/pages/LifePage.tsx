import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { Card } from '../components/Card';
import { HeaderImage } from '../components/HeaderImage';
import PageNavigation from '../components/PageNavigation';
import { AppContext } from '../App';

import { ILife, IImageLife } from '../types';

import '../styles/zone.scss';

interface LifePageProps {
  selectedLife?: ILife | null;
  onClose: () => void;
}

export const LifePage: React.FC<LifePageProps> = ({
  selectedLife,
  onClose,
}) => {
  const { t } = useTranslation();
  const { lifeId } = useParams();
  const { apiUrl, language } = useContext(AppContext);
  const [life, setLife] = useState<ILife>();
  const [lifeLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // If received life through properties, don't fetch it
    if (selectedLife) {
      setLife(selectedLife);
      setLoaded(true);

      return;
    }
    fetch(`${apiUrl}/api/life/${lifeId}?lang=${language}`)
      .then((res) => res.json())
      .then((lifeData: ILife[]) => {
        if (lifeData.length > 0) {
          setLife(lifeData[0]);
          setLoaded(true);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [lifeId, setLife, language]);

  let lifeCoverImage: IImageLife | null = null;
  let lifeCoverText = '';
  if (life) {
    lifeCoverImage =
      life.imagelife_set.length > 0 ? life.imagelife_set[0] : null;
    if (lifeCoverImage) {
      if (lifeCoverImage.imagelifetranslations_set.length > 0) {
        lifeCoverText = `${lifeCoverImage.imagelifetranslations_set[0].name} (${life.scientific})`;
      } else {
        lifeCoverText = `${life.scientific}`;
      }
    }
  }

  if (!lifeLoaded) {
    return (
      <main className="life-content">
        <div>Loading</div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="life-content">
        {/* Timered Slideshow of images */}
        {lifeCoverImage && (
          <HeaderImage
            imageSrc={`${apiUrl}${lifeCoverImage.path}`}
            imageText={lifeCoverText}
          />
        )}
        {life && life.lifetranslations_set.length > 0 && (
          <Card className="life-info-content">
            <h2>{life && life.lifetranslations_set[0].name}</h2>
            <div className="">
              {life &&
                life.lifetranslations_set[0].description
                  .split('\n')
                  .map((s) => s.trim().length > 0 && <p key={s}>{s}</p>)}
            </div>
          </Card>
        )}
        {/* Card of fun facts */}
        {life && life.lifetranslations_set[0].funFacts.length > 0 && (
          <Card className="life-info-content">
            <h2>{t('Fun_facts')}</h2>
            <div className="">
              {life &&
                life.lifetranslations_set[0].funFacts
                  .split('\n')
                  .map((s) => s.trim().length > 0 && <p key={s}>{s}</p>)}
            </div>
          </Card>
        )}
        {/* Card of habitat */}
        {life && life.lifetranslations_set[0].habitat.length > 0 && (
          <Card className="life-info-content">
            <h2>{t('Habitat')}</h2>
            <div className="">
              {life &&
                life.lifetranslations_set[0].habitat
                  .split('\n')
                  .map((s) => s.trim().length > 0 && <p key={s}>{s}</p>)}
            </div>
          </Card>
        )}
        {/* Bottom close button to navigate back */}
        <PageNavigation onClose={onClose} />
      </main>
    </>
  );
};
