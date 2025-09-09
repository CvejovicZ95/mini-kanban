export function renderCard(card) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.dataset.cardId = card.id;

  const titleElement = document.createElement('p');
  titleElement.textContent = card.title || 'New Card';
  cardDiv.appendChild(titleElement);

  // TODO: dodati edit/delete i drag & drop event listenere

  return cardDiv;
}
