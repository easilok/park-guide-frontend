import React, { createContext, useState, useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Home from './pages/Home';
import Guide from './pages/Guide';

interface IContext {
  apiUrl: string;
  language: string;
  setLanguage: (l: string) => void;
}

const apiUrl = process.env.REACT_APP_API_URL || '';

export const AppContext = createContext<IContext>({
  apiUrl,
  language: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLanguage: (_: string) => {},
});

const App: React.FC = () => {
  const [language, setLanguage] = useState('pt');
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  const setLanguageHandler = (_l: string) => {
    if (language === 'pt') {
      setLanguage('en');
      i18n.changeLanguage('en');
      localStorage.setItem('i18nextLng', 'en');
    } else {
      setLanguage('pt');
      i18n.changeLanguage('pt');
      localStorage.setItem('i18nextLng', 'pt');
    }
  };

  const contextValue = useMemo(
    () => ({ apiUrl, language, setLanguage: setLanguageHandler }),
    [language]
  );

  return (
    <div className="App">
      <AppContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Guide />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
};

export default App;
