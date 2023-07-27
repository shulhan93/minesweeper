import createElement from './helpers/createElement';

export default class CountClicks {
  root;

  counter;

  #count;

  constructor() {
    this.root = createElement('div', {
      className: 'game__click',
    });

    const icon = createElement('i', {
      className: 'icon ri-mouse-line',
    });

    const counter = createElement('span', {
      className: 'game__count-clicks',
      textContent: 0,
    });

    this.counter = counter;

    this.#count = 0;

    this.root.append(icon, counter);
  }

  get count() {
    return this.#count;
  }

  addClick() {
    this.counter.textContent = this.#count + 1;
    this.#count += 1;
  }
}
