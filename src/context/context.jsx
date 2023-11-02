import React, { useState, useEffect } from 'react';

const SettingsContext = React.createContext();

export const SettingsProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState(1);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('default');

  const saveSettings = () => {
    const settings = {
      hideCompleted,
      itemsPerPage,
      sortField,
      difficulty,
    };
    console.log('Saving settings:', settings);
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  useEffect(() => {
    console.log('Make sure settings are here!');
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const { hideCompleted, itemsPerPage, sortField, difficulty } = JSON.parse(savedSettings);
      console.log('Found saved settings:', { hideCompleted, itemsPerPage, sortField, difficulty });
      setHideCompleted(hideCompleted);
      setItemsPerPage(itemsPerPage);
      setSortField(sortField);
      setDifficulty(difficulty);
    } else {
      console.log('No settings. For shame.');
    }
  }, []);


  return (
    <SettingsContext.Provider value={{ hideCompleted, itemsPerPage, sortField, difficulty, setHideCompleted, setItemsPerPage, setSortField, setDifficulty, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;