export default function Scoreboard () {
  // Event listeners
  this._resetListeners = [];

  // HTML elements
  this.gameInfo = document.querySelector('.game-info');
  this.movementsElement = document.querySelector('.movements');
  this.timer = document.querySelector('.timer');
  this.resetButton = document.querySelector('.reset');

  // HTML event listeners
  this.resetButton.addEventListener('click', () => this._resetListeners.forEach(listener => listener()));
}

Scoreboard.prototype.updateMovements = function (movements) {
  this.movementsElement.innerHTML = movements;
};

Scoreboard.prototype.updateScore = function (moves) {
  // TODO: I think this logic is ugly. It should be improved
  if (moves === 0) {
    [...document.querySelectorAll('.full-star')].forEach(star => star.classList.remove('hide-star'));
    [...document.querySelectorAll('.empty-star')].forEach(star => star.classList.add('hide-star'))
  } else if (moves >= 16 && moves < 24 ) {
    document.querySelectorAll('.full-star')[2].classList.add('hide-star');
    document.querySelectorAll('.empty-star')[0].classList.remove('hide-star');
  } else if (moves >= 24 && moves < 32) {
    document.querySelectorAll('.full-star')[1].classList.add('hide-star');
    document.querySelectorAll('.empty-star')[1].classList.remove('hide-star');
  } else if (moves >= 32 ) {
    document.querySelectorAll('.full-star')[0].classList.add('hide-star');
    document.querySelectorAll('.empty-star')[2].classList.remove('hide-star');
  }
};

Scoreboard.prototype.updateTime = function (time) {
  this.timer.innerHTML = time
}

Scoreboard.prototype.onResetClick = function (listener) {
  this._resetListeners.push(listener);
}
