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

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
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
