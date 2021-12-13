import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Search } from 'react-feather';

import { Card } from './Card';
import EyeIcon from '../components/EyeIcon';
import { LifeItem } from './LifeItem';

import { ILifeZone, LifeGroup } from '../types';

import '../styles/zone.scss';

const initialLoadedItems = 3;
const stepLoadedItems = 3;

enum TAB_MENU {
  ALL,
  FAUNA,
  FLORA,
}

interface LifeListProps {
  lifeList: ILifeZone[];
}

const LifeList: React.FC<LifeListProps> = ({ lifeList }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [flora, setFlora] = useState(true);
  const [fauna, setFauna] = useState(true);
  const [loadedItems, setLoadedItems] = useState(initialLoadedItems);
  const [tabMenu, setTabMenu] = useState(TAB_MENU.ALL);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const tabChangeHandler = (newMenu: TAB_MENU) => {
    // Nothing to change
    if (newMenu == tabMenu) {
      return;
    }
    setTabMenu(newMenu);
    setFauna(newMenu === TAB_MENU.ALL || newMenu === TAB_MENU.FAUNA);
    setFlora(newMenu === TAB_MENU.ALL || newMenu === TAB_MENU.FLORA);
    setLoadedItems(initialLoadedItems);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const lifeSelectHandler = (life: ILifeZone) => {
    navigate(`/life/${life.life.id}`);
  };

  useEffect(() => {
    setLoadedItems(initialLoadedItems);
  }, [lifeList]);

  useEffect(() => {
    const tickHandler = () =>
      setLoadedItems((prevState) => prevState + stepLoadedItems);
    const t = setInterval(tickHandler, 5000);

    return () => clearInterval(t);
  }, [setLoadedItems]);

  let visibleLife = [...lifeList];

  if (search.length > 2) {
    visibleLife = visibleLife.filter((l) => {
      if (l.life.scientific.includes(search)) {
        return true;
      }

      return l.life.lifetranslations_set[0].description.includes(search);
    });
  }

  if (!flora) {
    visibleLife = visibleLife.filter((l) => l.life.group != LifeGroup.FLORA);
  }

  if (!fauna) {
    visibleLife = visibleLife.filter((l) => l.life.group != LifeGroup.FAUNA);
  }

  visibleLife = visibleLife.slice(0, loadedItems);

  return (
    <Card className="zone-info-content">
      <div className="zone-info-eyes">
        {showSearch ? (
          <div className="zone-info__search">
            <input
              type="text"
              placeholder="Search Name"
              value={search}
              onInput={inputChangeHandler}
            />
          </div>
        ) : (
          <div>
            <EyeIcon />
            <span> {t('Visible_life') + ':'} </span>
          </div>
        )}
        <Search
          className="action-btn"
          onClick={() => setShowSearch((p) => !p)}
        />
      </div>
      <div className="zone-info-actions">
        <ul className="zone-info-tab">
          <li
            className={tabMenu === TAB_MENU.ALL ? 'active' : ''}
            onClick={() => tabChangeHandler(TAB_MENU.ALL)}
          >
            {t('All')}
          </li>
          <li
            className={tabMenu === TAB_MENU.FAUNA ? 'active' : ''}
            onClick={() => tabChangeHandler(TAB_MENU.FAUNA)}
          >
            {t('Fauna')}
          </li>
          <li
            className={tabMenu === TAB_MENU.FLORA ? 'active' : ''}
            onClick={() => tabChangeHandler(TAB_MENU.FLORA)}
          >
            {t('Flora')}
          </li>
        </ul>
      </div>
      <div className="zone-life-list">
        {visibleLife.length > 0 &&
          visibleLife.map((life) => (
            <LifeItem
              key={life.life.id}
              backgroundStyle
              life={life}
              onSelect={lifeSelectHandler}
            />
          ))}
      </div>
    </Card>
  );
};

export default LifeList;
