import Deck from './scripts/Deck';

const deck = new Deck(document.querySelector('.gameTable'));
deck.startGame();
const movementsElement = document.querySelector('.movements');
document.addEventListener("onmovement", ({ detail }) => movementsElement.innerHTML = detail.movements);
