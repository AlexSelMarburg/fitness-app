export default class View {
  _data;
  _parentElement = document.querySelector('.views-container');

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      // return this.renderError();
      return;

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
