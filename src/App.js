import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CurrencyBlock from './components/Currencyblock';
import MortgageCalculator from './components/MortgageCalculator';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mortgage" element={<MortgageCalculator />} />
        <Route path="/converter" element={<CurrencyBlock />} />
      </Routes>
    </Router>
  );
}

export default App;
