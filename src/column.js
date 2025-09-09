import { renderCard } from './card.js';
import { addCard } from './state.js';

export function renderColumn(column) {
  const columnDiv = document.createElement('div');
  columnDiv.classList.add('column');
  columnDiv.dataset.columnId = column.id;

  const titleElement = document.createElement('h2');
  titleElement.textContent = column.title;
  columnDiv.appendChild(titleElement);

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards');
  column.items.forEach(card => {
    cardsContainer.appendChild(renderCard(card));
  });
  columnDiv.appendChild(cardsContainer);

  const addInput = document.createElement('input');
  addInput.type = 'text';
  addInput.placeholder = '+ Add card';
  addInput.classList.add('add-card-input');
  columnDiv.appendChild(addInput);
  
  addInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && addInput.value.trim() !== '') {
      addCard(column.id, addInput.value.trim());
      addInput.value = '';
    }
  });

  return columnDiv;
}
