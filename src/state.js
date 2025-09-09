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

const stateListeners  = [];

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

function saveState() {
  localStorage.setItem('kanbanState', JSON.stringify(state));
}

export function onStateChange(listener) {
  stateListeners.push(listener);
}

function updateListeners() {
  stateListeners.forEach(fn => fn());
}

export function resetState() {
  state = JSON.parse(JSON.stringify(defaultState)); 
  saveState();
  updateListeners();
}

export function getState() {
  return JSON.parse(JSON.stringify(state));
}

export function addCard(columnId, title) {
  const column = state.columns.find(c => c.id === columnId);
  if (!column) return;

  const newCard = {
    id: generateId(),
    title
  };

  column.items.push(newCard);
  saveState();
  updateListeners();
}

export function deleteCard(cardId, columnId) {
  const column = state.columns.find(column => column.id === columnId);
  if (!column) return; 

  column.items = column.items.filter(card => card.id !== cardId);

  saveState();
  renderBoard();
}

export function updateCard(cardId, newTitle) {
  state.columns.forEach(column => {
    const cardToUpdate = column.items.find(card => card.id === cardId);
    if (cardToUpdate) {
      cardToUpdate.title = newTitle;
    }
  });

  saveState();
  renderBoard();
}