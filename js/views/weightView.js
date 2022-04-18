import View from './View.js';

class WeightView extends View {
  constructor() {
    super();
  }

  _generateMarkup() {
    return `
      
    <div class="weight-view--container">
    <div class="data--container">A</div>
    <div class="add-weight--container">
      <button class="scroll-jump-app--button button">⏫</button>
      <button class="scroll--app--button button">🔼</button>
      <button class="scroll--down--button button">🔽</button>
      <button class="add-weight-data--button button">neuer Eintrag</button>
    </div>
  </div>
    `;
  }
}

export default new WeightView();
