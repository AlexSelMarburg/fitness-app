export default class View {
  _data;
  _parentElement = document.querySelector('.views-container');

  static initDarkLightMode(isLightModeOn) {
    const appContainer = document.querySelector('.app-container');
    isLightModeOn && appContainer.classList.add('light');
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      // return this.renderError();
      return;

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    // console.log(data);

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!curEl) return;
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🎈', curEl);
        // console.log('💥', newEl);

        if (curEl) curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (curEl && !newEl.isEqualNode(curEl)) {
        // console.log(curEl);

        Array.from(newEl.attributes).forEach(attr => {
          if (attr.name !== 'class' && attr.value !== 'hidden') {
            curEl.setAttribute(attr.name, attr.value);
          }
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
