import { getState } from './state.js';
import { renderColumn } from './column.js';

export function renderBoard() {
  const app = document.getElementById('app');
  app.innerHTML = ''; 

  const state = getState();

  state.columns.forEach(column => {
    const columntElement = renderColumn(column);
    app.appendChild(columntElement);
  });
}
