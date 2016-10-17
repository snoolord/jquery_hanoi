const HanoiView = require('./hanoi-view');
const HanoiGame = require('./hanoi-game');

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
