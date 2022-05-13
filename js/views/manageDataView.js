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
    <div class="manage-data-view--container">
      <button class="delete-all-data--btn button">alles löschen</button>
    </div>
    `;
  }
}

export default new DeleteView();
