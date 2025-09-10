import { renderCard } from './card.js';
import { addCard, moveCard } from './state.js';
import { getDragAfterElement } from './utils.js';

export const renderColumn = ({ id: columnId, title, items }) => {
  const columnSection = document.createElement('section');
  columnSection.classList.add('column');
  columnSection.dataset.columnId = columnId;

  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  columnSection.appendChild(titleElement);

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards');

  items.forEach(card => {
    cardsContainer.appendChild(renderCard(card));
  });
  columnSection.appendChild(cardsContainer);

  cardsContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(cardsContainer, e.clientY);
    const dragging = document.querySelector('.dragging');
    if (!dragging) return;

    if (!afterElement) {
      cardsContainer.appendChild(dragging);
    } else {
      cardsContainer.insertBefore(dragging, afterElement);
    }
  });

  cardsContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const { cardId, fromColumnId } = JSON.parse(e.dataTransfer.getData('text/plain'));
    const newIndex = Array.from(cardsContainer.children).indexOf(document.querySelector('.dragging'));
    moveCard(cardId, fromColumnId, columnId, newIndex);
  });

  const separator = document.createElement('hr');
  separator.classList.add('card-separator');
  columnSection.appendChild(separator);

  const addInput = document.createElement('input');
  addInput.type = 'text';
  addInput.placeholder = `+ Add card in "${title}"`;
  addInput.classList.add('add-card-input');
  columnSection.appendChild(addInput);

  addInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && addInput.value.trim() !== '') {
      addCard(columnId, addInput.value.trim());
      addInput.value = '';
    }
  });

  return columnSection;
};
