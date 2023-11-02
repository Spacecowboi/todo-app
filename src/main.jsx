import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from '@mantine/core';
import SettingsContext from './context/context';
import App from './App';
import { SettingsProvider } from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);

const List = ({ items }) => {
  const { hideCompleted, itemsPerPage } = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = hideCompleted ? items.filter(item => !item.completed) : items;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      {currentItems.map(item => (
        <TodoItem key ={item.id} item={item} />
      ))}
      <Pagination
        page={currentPage}
        perPage={itemsPerPage}
        total={filteredItems.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default List;