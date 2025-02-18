import React, { useState, useEffect } from 'react';
import '../scss/currencyblock.scss';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export default function CurrencyBlock() {
  const [currencies, setCurrencies] = useState(['RUB', 'USD', 'EUR', 'GBP']);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(`${API_URL}${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.error('Error fetching currency data:', err));
  }, [fromCurrency]);

  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
    }
  }, [amount, rates, toCurrency]);

  return (
    <div className="currency__container">
      <div className="currency__block">
        <div className="currency__list">
          {currencies.map((curr) => (
            <button
              key={curr}
              className={`currency__name ${fromCurrency === curr ? 'active' : ''}`}
              onClick={() => setFromCurrency(curr)}
            >
              {curr}
            </button>
          ))}
        </div>
        <input
          className="currency__input"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="currency__block">
        <div className="currency__list">
          {currencies.map((curr) => (
            <button
              key={curr}
              className={`currency__name ${toCurrency === curr ? 'active' : ''}`}
              onClick={() => setToCurrency(curr)}
            >
              {curr}
            </button>
          ))}
        </div>
        <input className="currency__input" type="number" value={convertedAmount} readOnly />
      </div>
    </div>
  );
}
