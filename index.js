import { isCardsMatch } from './scripts/isCardsMatch';
import Deck from './scripts/classes/Deck';

const deck = new Deck(document.querySelector('.gameTable'));
deck.startGame();