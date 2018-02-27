import { shuffle } from './scripts/shuffle';
import { isCardsMatch } from './scripts/checkClick';

const cards = [].concat(...document.querySelectorAll('.card'));
const ul = document.querySelector('ul');

let cardsSelected = [];
cards.forEach((card) => {
  card.addEventListener('click', event => {
      // TODO: Add a moviment
      cardsSelected.push(card);
      if (cardsSelected.length === 2) {
        if (isCardsMatch(...cardsSelected)) {
          // TODO: Show 'match' animation
          console.log('Cards match');
          cardsSelected = [];
        } else {
          // TODO: Remove a point
          // TODO: Show 'not match' animation
          console.log('Cards do not match');
          cardsSelected = [];
        }
      }
    }, true)
});

shuffle(cards)
  .forEach(card => {
    ul.appendChild(card);
  });

