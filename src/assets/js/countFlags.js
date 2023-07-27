import createElement from './helpers/createElement';

export default class CountFlag {
  root;

  counter;

  #count;

  constructor() {
    this.#count = 10;
    this.root = createElement('div', {
      className: 'game__flag',
    });

    const icon = createElement('i', {
      className: 'icon ri-flag-2-line',
    });

    const counter = createElement('span', {
      className: 'game__count-flags',
      textContent: '10',
    });

    this.counter = counter;
    this.root.append(icon, counter);
  }

  get count() {
    return this.#count;
  }

  addFlag() {
    this.#count -= 1;
    this.counter.textContent = this.#count;
  }

  removeFlag() {
    this.#count += 1;
    this.counter.textContent = this.#count;
  }
}
