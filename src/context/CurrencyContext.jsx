import React, { createContext, useEffect, useState } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(localStorage.getItem('app_currency') || 'INR');

  const symbols = {
    INR: '₹',
    USD: '$',
    EUR: '€'
  };

  const rates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011
  };

  useEffect(() => {
    localStorage.setItem('app_currency', currency);
  }, [currency]);

  const symbol = symbols[currency] || '₹';

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
};