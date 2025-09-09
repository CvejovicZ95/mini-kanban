import { deleteCard, updateCard } from './state.js';

export function renderCard(card) {
  const cardArticle = document.createElement('article');
  cardArticle.classList.add('card');
  cardArticle.dataset.cardId = card.id;

  const titleElement = document.createElement('p');
  titleElement.textContent = card.title || 'New Card';
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
    deleteCard(card.id, columnSection.dataset.columnId);
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
        if (input.value.trim() !== '') {
          updateCard(card.id, input.value.trim());
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

    } else if (editBtn.textContent === 'Save') {
      const input = cardArticle.querySelector('.edit-input');
      if (input) {
        updateCard(card.id, input.value.trim());
        cardArticle.replaceChild(titleElement, input);
      }
      editBtn.textContent = 'Edit';
      deleteBtn.style.display = '';
    }
  });


  return cardArticle;
}
