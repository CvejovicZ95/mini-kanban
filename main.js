import { initState, onStateChange, resetState } from './src/state.js';
import { renderBoard } from './src/board.js';

function initApp() {
  initState();

  renderBoard();

  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', () => {
    resetState();
    renderBoard();
  });

  onStateChange(renderBoard);
}

initApp();
