import View from './View.js';
import { wait, blockingWait } from '../helpers.js';

class CaloriesView extends View {
  constructor() {
    super();
  }

  //TODO: btn-rerender makes  disabled-class go away
  //update method needed
  addHandlerAddKcalClick(handler) {
    document
      .querySelector('.add-kcals--container')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.add-kcals--btn');

        if (!btn || btn.classList.contains('disabled')) return;

        const addedValue = Number(btn.dataset.kcalValue);
        handler(addedValue);
        btn.classList.add('disabled');
        btn.querySelector('p').classList.add('user-interaction-feedback');

        wait(0.15).then(() => {
          btn.classList.remove('disabled');
          btn.querySelector('p').classList.remove('user-interaction-feedback');
        });
      });
  }

  addHandlerResetKcalValueClick(handler) {
    document
      .querySelector('.add-kcals--container')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('#delete-kcals-acc--btn');

        if (!btn) return;

        handler();

        btn
          .querySelector('.button-round')
          .classList.add('user-interaction-feedback');
        btn
          .querySelector('.button-round p')
          .classList.add('user-interaction-feedback');

        wait(0.25).then(() => {
          btn
            .querySelector('.button-round')
            .classList.remove('user-interaction-feedback');
          btn
            .querySelector('.button-round p')
            .classList.remove('user-interaction-feedback');
        });
      });
  }

  addHandlerTakeOverKcalsClick(handler) {
    document
      .querySelector('.take-over-kcal--btn')
      .addEventListener('click', function (e) {
        const btn = e.target;

        if (!btn) return;

        handler();

        btn.classList.add('disabled');
        btn.classList.add('user-interaction-feedback');

        wait(0.15).then(() => {
          btn.classList.remove('disabled');
          btn.classList.remove('user-interaction-feedback');
        });
      });
  }

  _generateMarkup() {
    return `
    <div class="kcal-view--container">

    <div class="data--container">

      <div class="persisted-kcal-data--container">

        <div class="persisted-kcal-value last-week-kcal">
          <div class="kcal-value">${this._data.lastWeek ?? 'k.A'}</div>
          <div class="kcal-description">
            letzte Woche<span>&nbsp;&empty;</span>
          </div>
        </div>

        <div class="persisted-kcal-value current-week-kcal">
          <div class="kcal-value">${this._data.currentWeek ?? 'k.A'}</div>
          <div class="kcal-description">
            diese Woche<span>&nbsp;&empty;</span>
          </div>
        </div>

        <div class="persisted-kcal-value yesterday-kcal">
          <div class="kcal-value">${this._data.yesterday ?? 'k.A'}</div>
          <div class="kcal-description">
            gestern
          </div>
        </div>

        <div class="persisted-kcal-value today-kcal">
          <div class="kcal-value">${this._data.today ?? 0}</div>
          <div class="kcal-description">
            heute
          </div>
        </div>

      </div>

      <div class="current-kcal-value">
        <p>${this._data.kcalsAccumulator || 0}</p><span>kcal</span>
      </div>
      <button class="take-over-kcal--btn button">Speichern</button>
    </div>

    <div class="add-kcals--container">

      <div id="delete-kcals-acc--btn">
        <div class="button-round">
          <p class="add-kcals-btn--text">🗑</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="5">
        <div class="button-round">
          <p class="add-kcals-btn--text">5</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="10">
        <div class="button-round">
          <p class="add-kcals-btn--text">10</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="20">
        <div class="button-round">
          <p class="add-kcals-btn--text">20</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="50">
        <div class="button-round">
          <p class="add-kcals-btn--text">50</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="100">
        <div class="button-round">
          <p class="add-kcals-btn--text">100</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="200">
        <div class="button-round">
          <p class="add-kcals-btn--text">200</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="500">
        <div class="button-round">
          <p class="add-kcals-btn--text">500</p>
        </div>
      </div>

    </div>

  </div>
    `;
  }
}

export default new CaloriesView();
