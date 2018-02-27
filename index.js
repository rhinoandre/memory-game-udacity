import { shuffle } from './scripts/shuffle';
const cards = [].concat(...document.querySelectorAll('.card'));
const ul = document.querySelector('ul');

shuffle(cards)
  .forEach(card => {
    ul.appendChild(card);
  });