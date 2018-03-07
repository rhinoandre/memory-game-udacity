# Rhino's Memory Game

Simple memory game

## Installation guide

* `npm install`
* `npm start`
* Go to [localhost:1234](http://localhost:1234)

## Steps

### Memory Game Logic
The game randomly shuffles the cards. A user wins once all cards have successfully been matched.

- [x] Shuffle cards
- [x] Review card
- [x] Keep card reviewed if it is equal
- [x] Hide card if it is not equal
- [x] Show modal when user wins

### Congratulations Popup
When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.

* Modal
  - [x] Congratulation message
  - [x] Restart button
  - [x] Game time
  - [x] Star rating

### Restart Button - A restart button allows the player to reset the game board, the timer, and the star rating
- [x] Board
- [x] Time
- [x] Star rating

### Star Rating
The game displays a star rating (from 1-3) that reflects the player's performance. At the beginning of a game, it should display 3 stars. After some number of moves, it should change to a 2 star rating. After a few more moves, it should change to a 1 star rating.

The number of moves needed to change the rating is up to you, but it should happen at some point.

- [x] Show 3 stars
- [x] Remove star accondingly the moves
- [x] Define movements for each start
  * **0-15 moves**: 3 stars
  * **16-23 moves**: 2 stars
  * **24-31 moves**: 1 star
  * **32+ moves**: 0 stars

### Timer
When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.

- [x] Show timer
- [x] Stop timer

### Move Counter
Game displays the current number of moves a user has made.

- [x] Show moves

#### Bonus

* Add CSS animations when cards are clicked, unsuccessfully matched, and successfully matched.
  - [x] Cards clicked
  - [x] Unsuccessfully matched
  - [x] Successfully matched

* Add unique functionality beyond the minimum requirements (Implement a leaderboard, store game state using local storage, etc.)
* Implement additional optimizations that improve the performance and user experience of the game (keyboard shortcuts for gameplay, etc).
