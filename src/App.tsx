import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Guide from './pages/Guide';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Guide />} />
      </Routes>
    </div>
  );
};

export default App;
