import { initState, onStateChange, resetState } from './src/state.js';
import { renderBoard } from './src/board.js';

const initApp = () => {
  initState();
  renderBoard();

  document.getElementById('resetBtn')
    .addEventListener('click', () => resetState());

  onStateChange(renderBoard);
};

initApp();
