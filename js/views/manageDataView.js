import View from './View.js';

class DeleteView extends View {
  constructor() {
    super();
  }

  addHandlerDeleteAllData(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.delete-all-data--btn');

      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
    <button class="delete-all-data--btn">alles löschen</button>
    `;
  }
}

export default new DeleteView();
