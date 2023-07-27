import Field from './field';
import GameHeader from './gameHeader';
import createElement from './helpers/createElement';

export default class App {
  start() {
    console.log(this);
    document.body.innerHTML = '';

    const game = createElement('div', {
      className: 'game',
    });

    const gameWrapper = createElement('div', {
      className: 'game__wrapper',
    });

    const gameHeader = new GameHeader();

    const field = new Field();

    gameWrapper.append(gameHeader.root, field.root);

    game.append(gameWrapper);

    document.body.append(game);
  }
}
