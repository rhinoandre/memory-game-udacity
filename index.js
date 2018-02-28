import { shuffle } from './scripts/shuffle';
import { isCardsMatch } from './scripts/isCardsMatch';

const cards = [].concat(...document.querySelectorAll('.card'));
const ul = document.querySelector('ul');
let cardsSelected = [];

function selectCard(card) {
  if (!cardsSelected.some(cardSelected => cardSelected === card)) {
    card.classList.remove('unselected');
    cardsSelected.push(card);
  }
}

function hideCard(){
  cardsSelected.forEach(card => card.classList.add('unselected'));
  cardsSelected = [];
}

cards.forEach((card) => {
  card.addEventListener('click', event => {
      // TODO: Add a moviment
      selectCard(card);
      if (cardsSelected.length === 2) {
        if (isCardsMatch(...cardsSelected)) {
          // TODO: Show 'match' animation
          // TODO: Remove this event listener
          console.log('Cards match');
          cardsSelected = [];
        } else {
          // TODO: Remove a point
          // TODO: Show 'not match' animation
          console.log('Cards do not match');
          setTimeout(hideCard, 3000);
        }
      }
    }, true)
});

shuffle(cards)
  .forEach(card => {
    ul.appendChild(card);
  });

