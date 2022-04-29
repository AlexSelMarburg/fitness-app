import View from './View.js';
import * as help from '../helpers.js';

class WeightView extends View {
  constructor() {
    super();
  }

  addHandlerNewWeightEntryClick() {
    document.getElementById('add-weight-data--button').addEventListener(
      'click',
      function (e) {
        if (help.isButtonDisabled(e.target)) return;
        help.wait(0.2).then(() => {
          this._toggleAddWeightInputVisibility();
        });

        help.performUserInteractionFeedback(e.target);
      }.bind(this)
    );
  }

  addHandlerAbortClick(handler) {
    document
      .getElementById('close-weight-data-container--button')
      .addEventListener(
        'click',
        function (e) {
          // if (help.isButtonDisabled(e.target)) return;
          help.wait(0.2).then(() => {
            this._toggleAddWeightInputVisibility();
          });
          handler();
          help.performUserInteractionFeedback(e.target);
        }.bind(this)
      );
  }

  addHandlerResetWeightValueClick(handler) {
    document.querySelector('.add-weight-button--container').addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.button-reset-weight-value');
        if (!btn || help.isButtonDisabled(btn)) return;
        handler();
        help.performUserInteractionFeedback(e.target);
      }.bind(this)
    );
  }

  addHandlerAddWeightBtnClick(handler) {
    document
      .querySelector('.add-weight-button--container')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.add-kg--button');

        if (!btn || help.isButtonDisabled(btn)) return;

        const addedValue = btn.dataset.numberValue;

        help.performUserInteractionFeedback(btn);

        handler(addedValue);
      });
  }

  handleNumButtonsDisability(weightValue) {
    const resetBtn = document.querySelector('.button-reset-weight-value');
    const zeroBtn = document.querySelector('.button-0');
    const commaBtn = document.querySelector('.button-comma');
    // console.log('qqqq');
    console.log(weightValue.length);

    if (weightValue.length) {
      resetBtn.classList.remove('disabled');
    }

    if (weightValue.length >= 2 || !weightValue.includes(',')) {
      commaBtn.classList.remove('disabled');
    } else {
      commaBtn.classList.add('disabled');
    }
  }

  _toggleAddWeightInputVisibility() {
    document
      .querySelector('.add-weight-button--container')
      .classList.toggle('hidden');

    [
      'close-weight-data-container--button',
      'save-weight-data--button',
      'add-weight-data--button',
    ].forEach(id =>
      document.querySelector(`#${id}`).classList.toggle('hidden')
    );

    // [
    //   'scroll-jump-up--button',
    //   'scroll-jump-down--button',
    //   'scroll-up--button',
    //   'scroll-down--button',
    //   'close-weight-data-container--button',
    //   'save-weight-data--button',
    // ].forEach(id =>
    //   document.querySelector(`#${id}`).classList.toggle('hidden')
    // );
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

      <div class="add-weight-button--container hidden">

        <div class="current-weight-value">
          <p>${this._data.weightValue || 0}</p><span>kg</span>
        </div>

        <button class="button-secondary button button-reset-weight-value disabled">RESET</button>

        <button class="button-secondary button button-7 add-kg--button" data-number-value="7">7</button>
        <button class="button-secondary button button-8 add-kg--button" data-number-value="8">8</button>
        <button class="button-secondary button button-9 add-kg--button" data-number-value="9">9</button>
        <button class="button-secondary button button-4 add-kg--button" data-number-value="4">4</button>
        <button class="button-secondary button button-5 add-kg--button" data-number-value="5">5</button>
        <button class="button-secondary button button-6 add-kg--button" data-number-value="6">6</button>
        <button class="button-secondary button button-1 add-kg--button" data-number-value="1">1</button>
        <button class="button-secondary button button-2 add-kg--button" data-number-value="2">2</button>
        <button class="button-secondary button button-3 add-kg--button" data-number-value="3">3</button>
        <button class="button-secondary button button-0 add-kg--button disabled" data-number-value="0">0</button>
        <button class="button-secondary button button-comma add-kg--button disabled" data-number-value=",">,</button>
     
      </div>

      <button id="scroll-jump-up--button" class="button button-secondary hidden"></button>
      <button id="scroll-jump-down--button" class="button button-secondary hidden"></button>
      <button id="scroll-up--button" class="button button-secondary hidden"></button>
      <button id="scroll-down--button" class="button button-secondary hidden"></button>

      <button id="save-weight-data--button" class="button hidden">Speichern</button>
      <button id="close-weight-data-container--button" class="button hidden">Abbruch</button>

      <button id="add-weight-data--button" class="button">Neuer Eintrag</button>
    </div>
  </div>


    `;
  }
}

export default new WeightView();
