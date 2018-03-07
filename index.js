import Deck from './scripts/Deck';
import Scoreboard from './scripts/Scoreboard';

const deck = new Deck();
const scoreboard = new Scoreboard();

/**
 * Game events
 */
document.querySelector('.restart').addEventListener('click', () => deck.restartGame());

/**
 *  When user clicks on the reset button from the scoreboard
 * the action will trigger the reset on the deck
*/
scoreboard.onResetClick(() => deck.resetGame());

// Whenever the user makes another move the scoreboard will be updated
deck.onMovesChange(movements => {
  scoreboard.updateMovements(movements);
  scoreboard.updateScore(movements);
});
deck.onTimeChanges(time => scoreboard.updateTime(time));

// After all events have been configured
// Let's the game begins
deck.startGame();
