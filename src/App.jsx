import React from 'react';
import SettingsContext from './context/SettingsContext';
import Todo from './Components/Todo';

export default class App extends React.Component {
  state = {
    displayItems: 3,
    hideCompleted: true,
    sortDifficulty: 'default',
  };

  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        <Todo />
      </SettingsContext.Provider>
    );
  }
}