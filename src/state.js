import { renderBoard } from './board.js';
import { generateId } from './utils.js';

const defaultState = {
  columns: [
    { id: 'todo', title: 'To Do', items: [] },
    { id: 'in-progress', title: 'In Progress', items: [] },
    { id: 'done', title: 'Done', items: [] },
  ]
};

let state = JSON.parse(JSON.stringify(defaultState));

const stateListeners = [];

export function initState() {
  const saved = localStorage.getItem('kanbanState');
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch (error) {
      console.warn('LocalStorage error', error);
      state = { ...defaultState };
    }
  }
}

const saveState = () => localStorage.setItem('kanbanState', JSON.stringify(state));

export const onStateChange = listener => stateListeners.push(listener);

const updateListeners = () => stateListeners.forEach(fn => fn());

export function resetState() {
  state = JSON.parse(JSON.stringify(defaultState));
  saveState();
  updateListeners();
}

export const getState = () => JSON.parse(JSON.stringify(state));

export const addCard = (columnId, title) => {
  const column = state.columns.find(column => column.id === columnId);
  if (!column) return;

  const newCard = { id: generateId(), title };
  column.items.push(newCard);
  saveState();
  updateListeners();
};

export const deleteCard = (cardId, columnId) => {
  const column = state.columns.find(column => column.id === columnId);
  if (!column) return;

  column.items = column.items.filter(card => card.id !== cardId);

  saveState();
  renderBoard();
};

export const updateCard = (cardId, newTitle) => {
  state.columns.forEach(column => {
    const card = column.items.find(card => card.id === cardId);
    if (card) card.title = newTitle;
  });

  saveState();
  renderBoard();
};

export const moveCard = (cardId, fromColumnId, toColumnId, newIndex) => {
  const fromColumn = state.columns.find(column => column.id === fromColumnId);
  const toColumn = state.columns.find(column => column.id === toColumnId);
  if (!fromColumn || !toColumn) return;

  const cardIndex = fromColumn.items.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return;

  const [movingCard] = fromColumn.items.splice(cardIndex, 1);
  toColumn.items.splice(newIndex, 0, movingCard);

  saveState();
  renderBoard();
};
