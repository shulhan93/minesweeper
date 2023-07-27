import createElement from './helpers/createElement';
import Timer from './timer';
import CountMines from './countMines';
import elements from './elements';

export default class GameHeader {
  root;

  constructor() {
    this.root = createElement('div', { className: 'game__header' });
    this.render();
  }

  render() {
    const timer = new Timer();
    const countMines = new CountMines();
    const countflags = elements.counterFlag;
    const counterClicks = elements.counterClick;

    this.root.append(
      timer.root,
      countMines.root,
      countflags.root,
      counterClicks.root,
    );
  }
}
