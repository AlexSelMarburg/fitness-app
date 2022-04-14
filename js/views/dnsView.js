import View from './View.js';

class DnsView extends View {
  constructor() {
    super();
  }

  _generateMarkup() {
    return `
      <p>Baustelle 2</p>
    `;
  }
}

export default new DnsView();
