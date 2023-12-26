import React, { useState } from 'react';

const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [newCurrency, setNewCurrency] = useState('');
  const [newSymbol, setNewSymbol] = useState('');
  const [newExchangeRate, setNewExchangeRate] = useState('');

  const handleCurrencyChange = (event) => {
    setNewCurrency(event.target.value);
  };

  const handleSymbolChange = (event) => {
    setNewSymbol(event.target.value);
  };

  const handleExchangeRateChange = (event) => {
    setNewExchangeRate(event.target.value);
  };

  const handleAddCurrency = () => {
    if (newCurrency.trim() !== '' && newSymbol.trim() !== '' && newExchangeRate.trim() !== '') {
      const newCurrencyObject = {
        currency: newCurrency,
        symbol: newSymbol,
        exchangeRate: parseFloat(newExchangeRate),
      };

      setCurrencies((prevCurrencies) => [...prevCurrencies, newCurrencyObject]);
      setNewCurrency('');
      setNewSymbol('');
      setNewExchangeRate('');
    }
  };

  const handleDeleteCurrency = (currency) => {
    setCurrencies((prevCurrencies) => prevCurrencies.filter((c) => c.currency !== currency));
  };

  const calculateExchange = (exchangeRate) => {
    const mainCurrencyExchangeRate = currencies.find((currency) => currency.currency === 'USD')?.exchangeRate || 1;
    return exchangeRate / mainCurrencyExchangeRate;
  };

  return (
    <div>
      <h1>Currency Management</h1>
      <div>
        <input type="text" value={newCurrency} onChange={handleCurrencyChange} placeholder="Currency" />
        <input type="text" value={newSymbol} onChange={handleSymbolChange} placeholder="Symbol" />
        <input type="text" value={newExchangeRate} onChange={handleExchangeRateChange} placeholder="Exchange Rate" />
        <button onClick={handleAddCurrency}>Add Currency</button>
      </div>
      <ul>
        {currencies.map((currency) => (
          <li key={currency.currency}>
            {currency.currency} ({currency.symbol}) - Exchange Rate: {calculateExchange(currency.exchangeRate).toFixed(2)} USD
            <button onClick={() => handleDeleteCurrency(currency.currency)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Currency;
