import React, { createContext, useEffect, useState } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(localStorage.getItem('app_currency') || 'INR');

  const symbols = {
    INR: '₹',
    USD: '$',
    EUR: '€'
  };

  useEffect(() => {
    localStorage.setItem('app_currency', currency);
  }, [currency]);

  const symbol = symbols[currency] || '₹';

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};