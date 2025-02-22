import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax'; 
import Header from './components/Header';
import CurrencyBlock from './components/Currencyblock';
import MortgageCalculator from './components/MortgageCalculator';
import Main from './components/Main';
import Trecker from './components/Trecker';

function App() {
  return (
    <ParallaxProvider>  
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mortgage" element={<MortgageCalculator />} />
          <Route path="/converter" element={<CurrencyBlock />} />
          <Route path="/trecker" element={<Trecker />} />
        </Routes>
      </Router>
    </ParallaxProvider>
  );
}

export default App;
