import createElement from './helpers/createElement';

export default class CountMines {
  root;

  constructor() {
    this.root = createElement('div', {
      className: 'game__mines',
    });

    this.render();
  }

  render() {
    const icon = createElement('i', {
      className: 'mine ri-fire-fill',
    });

    const countMines = createElement('span', {
      className: 'game__count-mines',
      textContent: '10',
    });

    this.root.append(icon, countMines);
  }
}
