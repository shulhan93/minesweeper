import Cell from './cell';
import elements from './elements';
import createElement from './helpers/createElement';

export default class Field {
  root;

  constructor() {
    this.root = createElement('div', { className: 'game__field' });
    this.root.addEventListener('click', this.#handleClick.bind(this));
    this.root.addEventListener('contextmenu', this.toggleFlag.bind(this));
    this.render();
  }

  #handleClick(e) {
    const cell = e.target.closest('.cell');

    if (
      !cell ||
      cell.classList.contains('flag') ||
      cell.classList.contains('open')
    )
      return;

    if (elements.counterClick.count === 0 && cell.classList.contains('mine')) {
      this.render();
      elements.counterClick.addClick();
    }
    elements.counterClick.addClick();
    cell.classList.add('open');
  }

  toggleFlag(e) {
    e.preventDefault();
    const cell = e.target.closest('.cell');

    if (
      !cell ||
      elements.counterClick.count === 0 ||
      cell.classList.contains('open') ||
      elements.counterFlag.count === 0
    )
      return;
    if (cell.classList.contains('flag')) {
      console.log('yes');
      cell.classList.remove('flag');
      elements.counterFlag.removeFlag();
      return;
    }

    cell.classList.add('flag');
    elements.counterFlag.addFlag();
  }

  render() {
    this.root.innerHTML = '';

    const cells = this.createMatrix().flat();

    cells.forEach((el) => {
      const cell = new Cell(el);
      this.root.append(cell.root);
    });
  }

  createMatrix() {
    const arrayWithMine = new Array(10 * 10).fill('').map((el, idx) => {
      if (idx < 10) {
        return 'm';
      }
      return el;
    });
    arrayWithMine.sort(() => Math.random() - 0.5);

    const matrix = [];
    let index = 0;
    for (let i = 0; i < 10; i += 1) {
      matrix[i] = [];
      for (let j = 0; j < 10; j += 1) {
        matrix[i][j] = arrayWithMine[index];
        index += 1;
      }
    }

    function getCount(row, column) {
      let count = 0;
      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          if (!matrix[row + i] || !matrix[column + j]) continue;
          if (matrix[row + i][column + j] === 'm') {
            count += 1;
          }
        }
      }
      return count;
    }

    // fill matrix
    for (let row = 0; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        if (matrix[row][column] === 'm') {
          continue;
        }
        matrix[row][column] = getCount(row, column);
      }
    }
    return matrix;
  }
}
