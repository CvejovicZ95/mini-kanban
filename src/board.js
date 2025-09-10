import { getState } from './state.js';
import { renderColumn } from './column.js';

export const renderBoard = () => {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const { columns } = getState();

  columns.forEach(column => {
    const columnElement = renderColumn(column);
    app.appendChild(columnElement);
  });
};
