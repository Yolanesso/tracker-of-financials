import React, { useState, useEffect } from 'react';
import '../scss/currencyblock.scss';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export default function CurrencyBlock() {
  const [currencies] = useState(['RUB', 'USD', 'EUR', 'GBP']);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const [rates, setRates] = useState({});
  const [isFromInput, setIsFromInput] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.error('Ошибка получения данных:', err));
  }, [fromCurrency]);

  useEffect(() => {
    if (!rates[toCurrency]) return;

    if (isFromInput) {
      const newAmountTo = amountFrom * rates[toCurrency];
      setAmountTo(parseFloat(newAmountTo.toFixed(4)));
    } else {
      const newAmountFrom = amountTo / rates[toCurrency];
      setAmountFrom(parseFloat(newAmountFrom.toFixed(4)));
    }
  }, [amountFrom, amountTo, rates, toCurrency, isFromInput]);

  const handleAmountFromChange = (e) => {
    setAmountFrom(e.target.value);
    setIsFromInput(true);
  };

  const handleAmountToChange = (e) => {
    setAmountTo(e.target.value);
    setIsFromInput(false);
  };

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
          value={amountFrom}
          onChange={handleAmountFromChange}
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
        <input
          className="currency__input"
          type="number"
          value={amountTo}
          onChange={handleAmountToChange}
        />
      </div>
    </div>
  );
}
