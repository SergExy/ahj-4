import CardValidator from './cardValidator/cardValidator';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const cardValidator = new CardValidator(body);
  cardValidator.bindToDOM();
});
