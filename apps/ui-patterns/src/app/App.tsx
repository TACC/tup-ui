import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UIPatterns from './UIPatterns';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UIPatterns />} />
      </Routes>
    </Router>
  );
};

export default App;
