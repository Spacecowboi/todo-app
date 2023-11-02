import React from 'react';
import { render, act } from '@testing-library/react';
import { SettingsProvider } from './context';

describe('SettingsProvider', () => {
  it('provides default settings', () => {
    let result;
    render(
      <SettingsProvider>
        {value => {
          result = value;
          return null;
        }}
      </SettingsProvider>
    );

    expect(result).toEqual({
      hideCompleted: false,
      itemsPerPage: 10,
      sortField: 'default',
      difficulty: 1,
      setHideCompleted: expect.any(Function),
      setItemsPerPage: expect.any(Function),
      setSortField: expect.any(Function),
      setDifficulty: expect.any(Function),
      saveSettings: expect.any(Function),
    });
  });

  it('saves and loads settings from localStorage', () => {
    const settings = {
      hideCompleted: true,
      itemsPerPage: 20,
      sortField: 'custom',
      difficulty: 2,
    };

    localStorage.setItem('settings', JSON.stringify(settings));

    let result;
    render(
      <SettingsProvider>
        {value => {
          result = value;
          return null;
        }}
      </SettingsProvider>
    );

    expect(result).toEqual({
      ...settings,
      setHideCompleted: expect.any(Function),
      setItemsPerPage: expect.any(Function),
      setSortField: expect.any(Function),
      setDifficulty: expect.any(Function),
      saveSettings: expect.any(Function),
    });

    act(() => {
      result.setHideCompleted(false);
      result.setItemsPerPage(30);
      result.setSortField('new');
      result.setDifficulty(3);
      result.saveSettings();
    });

    expect(JSON.parse(localStorage.getItem('settings'))).toEqual({
      hideCompleted: false,
      itemsPerPage: 30,
      sortField: 'new',
      difficulty: 3,
    });
  });
});
