import View from './View.js';

class DeleteView extends View {
  constructor() {
    super();
  }

  _generateMarkup() {
    return `
      <p>Baustelle 3</p>
    `;
  }
}

export default new DeleteView();
