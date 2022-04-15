import { wait } from './helpers.js';

class NavigationBar {
  _parentElement = document.querySelector('.navigation');
  _navigationLinks = document.querySelectorAll('.list');
  _toggleModeSwitch = document.querySelector('.switch');

  constructor() {
    this._addHandlerActiveLink();
    this._addHandlerDarkLightMode();
  }

  init() {
    document.querySelector('.navigation ul li').click();
  }

  _addHandlerActiveLink() {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.list');
        if (!btn) return;

        this._navigationLinks.forEach(li => {
          li.classList.remove('active');
        });
        btn.closest('.list').classList.add('active');
      }.bind(this)
    );
  }

  _addHandlerDarkLightMode() {
    this._toggleModeSwitch.addEventListener(
      'click',
      function (e) {
        const appContainer = document.querySelector('.app-container');
        const indicator = document.querySelector('.indicator');

        indicator.style.transition = '0s';
        appContainer.classList.toggle('light');

        wait(0.1).then(() => {
          indicator.style.transition = '0.5s';
        });
      }.bind(this)
    );
  }

  addHandlerKcalClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.render-kcal-view--btn');
      if (!btn) return;
      handler();
    });
  }

  addHandlerWeightClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.render-weight-view--btn');
      if (!btn) return;
      handler();
    });
  }

  addHandlerDnsClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.render-dns-view--btn');
      if (!btn) return;
      handler();
    });
  }

  addHandlerDeleteClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.render-delete-view--btn');
      if (!btn) return;
      handler();
    });
  }
}

export default new NavigationBar();
