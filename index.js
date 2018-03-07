import Deck from './scripts/Deck';

const deck = new Deck();
deck.startGame();
const movementsElement = document.querySelector('.movements');
/**
 * Game events
 */
document.addEventListener('onmovement', ({ detail }) => movementsElement.innerHTML = detail.movements);
document.querySelector('.reset').addEventListener('click', () => deck.resetGame());
document.querySelector('.restart').addEventListener('click', () => deck.restartGame());
deck.gameTime(time => document.querySelector('.timer').innerHTML = time);