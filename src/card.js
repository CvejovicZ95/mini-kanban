import { deleteCard, updateCard } from './state.js';

export const renderCard = ({ id, title: cardTitle }) => {
  const cardArticle = document.createElement('article');
  cardArticle.classList.add('card');
  cardArticle.dataset.cardId = id;
  cardArticle.setAttribute('draggable', 'true');

  cardArticle.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      cardId: id,
      fromColumnId: cardArticle.closest('.column').dataset.columnId
    }));
    cardArticle.classList.add('dragging');
  });

  cardArticle.addEventListener('dragend', () => {
    cardArticle.classList.remove('dragging');
  });

  const titleElement = document.createElement('p');
  titleElement.textContent = cardTitle || 'New Card';
  cardArticle.appendChild(titleElement);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');

  cardArticle.append(editBtn, deleteBtn);

  deleteBtn.addEventListener('click', () => {
    const columnSection = cardArticle.closest('.column');
    if (!columnSection) return;
    deleteCard(id, columnSection.dataset.columnId);
  });

  editBtn.addEventListener('click', () => {
    const columnSection = cardArticle.closest('.column');
    if (!columnSection) return;

    if (editBtn.textContent === 'Edit') {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = titleElement.textContent;
      input.classList.add('edit-input');
      cardArticle.replaceChild(input, titleElement);

      deleteBtn.style.display = 'none';
      input.focus();
      editBtn.textContent = 'Save';
      editBtn.classList.add('save');

      const finishEdit = () => {
        if (input.value.trim()) {
          updateCard(id, input.value.trim());
        } else {
          cardArticle.replaceChild(titleElement, input);
        }
        editBtn.textContent = 'Edit';
        editBtn.classList.remove('save');
        deleteBtn.style.display = '';
      };

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') finishEdit();
        if (e.key === 'Escape') {
          cardArticle.replaceChild(titleElement, input);
          editBtn.textContent = 'Edit';
          deleteBtn.style.display = '';
        }
      });

      input.addEventListener('blur', finishEdit);
    } else {
      const input = cardArticle.querySelector('.edit-input');
      if (input) {
        updateCard(id, input.value.trim());
        cardArticle.replaceChild(titleElement, input);
      }
      editBtn.textContent = 'Edit';
      deleteBtn.style.display = '';
    }
  });

  return cardArticle;
};
