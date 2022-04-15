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
        // console.log(btn.classList.contains('disabled'));

        // console.log(btn);
        if (!btn || btn.classList.contains('disabled')) return;
        // if (!btn) return;

        // console.log(btn);
        // console.log(btn.classList);

        // wait(2).then(() => {
        //   btn.classList.remove('disabled');
        //   console.log(btn);
        // });
        const addedValue = btn.dataset.kcalValue;
        handler(addedValue);
        btn.classList.add('disabled');
        wait(0.2).then(() => btn.classList.remove('disabled'));
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
      <button class="take-over-kcal--btn">Speichern</button>
    </div>

    <div class="add-kcals--container">

      <div id="toggle-kcals-plus-minus--btn">
        <div class="button round">
          <p class="add-kcals-btn--text">-</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="5">
        <div class="button round">
          <p class="add-kcals-btn--text">5</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="10">
        <div class="button round">
          <p class="add-kcals-btn--text">10</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="20">
        <div class="button round">
          <p class="add-kcals-btn--text">20</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="50">
        <div class="button round">
          <p class="add-kcals-btn--text">50</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="100">
        <div class="button round">
          <p class="add-kcals-btn--text">100</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="200">
        <div class="button round">
          <p class="add-kcals-btn--text">200</p>
        </div>
      </div>

      <div class="add-kcals--btn" data-kcal-value="500">
        <div class="button round">
          <p class="add-kcals-btn--text">500</p>
        </div>
      </div>

    </div>

  </div>
    `;
  }
}

export default new CaloriesView();
