import Deck from './scripts/Deck';

const deck = new Deck(document.querySelector('.game-table'));
deck.startGame();
const movementsElement = document.querySelector('.movements');

/**
 * Game events
 */
document.addEventListener('onmovement', ({ detail }) => movementsElement.innerHTML = detail.movements);
document.querySelector('.reset').addEventListener('click', () => deck.resetGame());
