import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { Card } from '../components/Card';
import { HeaderImage } from '../components/HeaderImage';
import PageNavigation from '../components/PageNavigation';
import { AppContext } from '../App';

import { ILife, IImageLife } from '../types';

import '../styles/zone.scss';

export const LifePage: React.FC = () => {
  const { t } = useTranslation();
  const { lifeId } = useParams();
  const navigate = useNavigate();
  const { apiUrl, language } = useContext(AppContext);
  const [life, setLife] = useState<ILife>();
  const [lifeLoaded, setLoaded] = useState(false);

  useEffect(() => {
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
      lifeCoverText = `${lifeCoverImage.imagelifetranslations_set[0].name} (${life.scientific})`;
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
        {lifeCoverImage &&
          lifeCoverImage.imagelifetranslations_set.length > 0 && (
            <HeaderImage
              imageSrc={`${apiUrl}${lifeCoverImage.path}`}
              imageText={lifeCoverText}
            />
          )}
        <Card className="life-info-content">
          <h2>{life && life.lifetranslations_set[0].name}</h2>
          <div className="">
            {life &&
              life.lifetranslations_set[0].description
                .split('\n')
                .map((s) => s.trim().length > 0 && <p key={s}>{s}</p>)}
          </div>
        </Card>
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
        <PageNavigation onClose={() => navigate(-1)} />
      </main>
    </>
  );
};
