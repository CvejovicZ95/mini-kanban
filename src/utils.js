export const generateId = () => `_${Math.random().toString(36).substring(2, 11)}`;

export const getDragAfterElement = (container, y) => {
  const cards = [...container.querySelectorAll('.card:not(.dragging)')];

  const closest = cards.reduce((closestSoFar, card) => {
    const { top, height } = card.getBoundingClientRect();
    const offset = y - top - height / 2;

    return offset < 0 && offset > closestSoFar.offset
      ? { offset, element: card }
      : closestSoFar;
  }, { offset: Number.NEGATIVE_INFINITY });

  return closest.element;
};
