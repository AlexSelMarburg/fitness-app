import View from './View.js';

class WeightView extends View {
  constructor() {
    super();
  }

  _generateMarkup() {
    return `  
    <div class="weight-view--container">

    <div class="data--container">

      <div class="persisted-weight-data-heading">
        <p class="weight-heading">Gewicht</p>
        <p class="weight-difference-heading">Differ.</p>
        <p class="weight-difference-heading">&empty;&nbsp;kcals</p>
        <p class="weight-difference-heading">Datum</p>
      </div>

      <div class="persisted-weight-data">
        <div class="kg-value">109,8</div>
        <div class="kg-difference-value">-0,5</div>
        <div class="avg-kcal-value">1875</div>
        <div class="date-value">18.04.2022</div>
      </div>
      <div class="persisted-weight-data">
        <div class="kg-value">109,8</div>
        <div class="kg-difference-value">-0,5</div>
        <div class="avg-kcal-value">1875</div>
        <div class="date-value">18.04.2022</div>
      </div>
      <div class="persisted-weight-data">
        <div class="kg-value">109,8</div>
        <div class="kg-difference-value">-0,5</div>
        <div class="avg-kcal-value">1875</div>
        <div class="date-value">18.04.2022</div>
      </div>
      <div class="persisted-weight-data">
        <div class="kg-value">109,8</div>
        <div class="kg-difference-value">-0,5</div>
        <div class="avg-kcal-value">1875</div>
        <div class="date-value">18.04.2022</div>
      </div>
      <div class="persisted-weight-data">
        <div class="kg-value">109,8</div>
        <div class="kg-difference-value">-0,5</div>
        <div class="avg-kcal-value">1875</div>
        <div class="date-value">18.04.2022</div>
      </div>

    </div>

    <div class="add-weight--container">
      <button id="scroll-jump-up--button" class="button button-secondary"></button>
      <button id="scroll-jump-down--button" class="button button-secondary"></button>
      <button id="scroll-up--button" class="button button-secondary"></button>
      <button id="scroll-down--button" class="button button-secondary"></button>

      <div class="add-weight-button--container"></div>
      <button id="add-weight-data--button" class="button">Neuer Eintrag</button>
    </div>
  </div>

    `;
  }
}

export default new WeightView();
