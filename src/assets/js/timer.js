import createElement from './helpers/createElement';

export default class Timer {
  root;

  constructor() {
    this.root = createElement('div', {
      className: 'game__time',
    });

    this.render();
  }

  render() {
    const icon = '<i class="icon ri-time-line"></i>';
    this.root.innerHTML = icon;

    const time = createElement('div', { className: 'time' });

    const minutes = createElement('div', {
      className: 'time__minutes',
      textContent: '00',
    });
    const sep = createElement('div', {
      className: 'time__sep',
      textContent: ':',
    });
    const seconds = createElement('div', {
      className: 'time__seconds',
      textContent: '00',
    });

    time.append(minutes, sep, seconds);

    this.root.append(time);
  }
}
