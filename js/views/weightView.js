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

      <div class="add-weight-button--container">

        <div class="current-weight-value">
          <p>109,3</p><span>kg</span>
        </div>

        <button class="button-secondary button button-reset-weight-value ">RESET</button>

        <button class="button-secondary button button-7" data-number-value="7">7</button>
        <button class="button-secondary button button-8" data-number-value="8">8</button>
        <button class="button-secondary button button-9" data-number-value="9">9</button>
        <button class="button-secondary button button-4" data-number-value="4">4</button>
        <button class="button-secondary button button-5" data-number-value="5">5</button>
        <button class="button-secondary button button-6" data-number-value="6">6</button>
        <button class="button-secondary button button-1" data-number-value="1">1</button>
        <button class="button-secondary button button-2" data-number-value="2">2</button>
        <button class="button-secondary button button-3" data-number-value="3">3</button>
        <button class="button-secondary button button-0" data-number-value="0">0</button>
        <button class="button-secondary button button-comma" data-number-value="10">,</button>
      </div>

      <button id="scroll-jump-up--button" class="button button-secondary hidden"></button>
      <button id="scroll-jump-down--button" class="button button-secondary hidden"></button>
      <button id="scroll-up--button" class="button button-secondary hidden"></button>
      <button id="scroll-down--button" class="button button-secondary hidden"></button>


      <button id="add-weight-data--button" class="button">Neuer Eintrag</button>
    </div>
  </div>


    `;
  }
}

export default new WeightView();
