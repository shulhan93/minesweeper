import createElement from './helpers/createElement';

export default class Cell {
  root;

  constructor(content, id) {
    this.content = content;
    this.id = id;
    this.root = createElement('div', { className: 'cell', id });
    this.render();
  }

  render() {
    switch (this.content) {
      case 'm': {
        this.root.classList.add('mine');
        this.root.innerHTML += '<i class="mine ri-fire-fill"></i>';
        break;
      }
      case 0: {
        this.root.textContent += '';
        break;
      }
      default: {
        this.root.classList.add(`color-${this.content}`);
        this.root.textContent += this.content;
        break;
      }
    }
    this.root.innerHTML += '<i class="cell__flag ri-flag-2-line"></i>';
  }
}
