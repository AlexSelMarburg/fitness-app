import View from './View.js';

class WeightView extends View {
  constructor() {
    super();
  }

  _generateMarkup() {
    return `
      <p>Baustelle 1</p>
    `;
  }
}

export default new WeightView();
