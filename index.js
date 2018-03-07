import Deck from './scripts/Deck';

const deck = new Deck();
deck.startGame();
/**
 * Game events
 */
document.querySelector('.reset').addEventListener('click', () => deck.resetGame());
document.querySelector('.restart').addEventListener('click', () => deck.restartGame());

const movementsElement = document.querySelector('.movements');
deck.onMovesChange(movements => movementsElement.innerHTML = movements)
deck.gameTime(time => document.querySelector('.timer').innerHTML = time);
