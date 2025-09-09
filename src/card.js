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

  // TODO: dodati drag & drop i inline edit funkcionalnosti

  return cardArticle;
}
