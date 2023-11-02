import React from 'react';
import { SettingsProvider} from './context/context';
import Todo from './components/index';

export default class App extends React.Component {
  state = {
    displayItems: 3,
    hideCompleted: true,
    sortDifficulty: 'default',
  };

  render() {
    return (
      <SettingsProvider>
        <Todo />
      </SettingsProvider>
    );
  }
}