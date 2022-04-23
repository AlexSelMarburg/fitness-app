import { wait } from './helpers.js';

class NavigationBar {
  _parentElement = document.querySelector('.navigation');
  _navigationLinks = document.querySelectorAll('.list');
  _toggleModeSwitch = document.querySelector('.switch');

  constructor() {}

  init() {
    document.querySelector('.navigation ul li').click();
  }

  _toggleActiveLink(btn) {
    this._navigationLinks.forEach(li => {
      li.classList.remove('active');
    });
    btn.classList.add('active');
  }

  addHandlerDarkLightMode(handler) {
    this._toggleModeSwitch.addEventListener(
      'click',
      function (e) {
        const appContainer = document.querySelector('.app-container');
        const indicator = document.querySelector('.indicator');

        handler(appContainer.classList.toggle('light'));
        indicator.style.transition = '0s';

        wait(0.1).then(() => {
          indicator.style.transition = '0.5s';
        });
      }.bind(this)
    );
  }

  addHandlerKcalClick(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.render-kcal-view--btn');
        if (!btn || btn.classList.contains('active')) return;
        this._toggleActiveLink(btn);
        handler();
      }.bind(this)
    );
  }

  addHandlerWeightClick(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.render-weight-view--btn');
        if (!btn || btn.classList.contains('active')) return;
        this._toggleActiveLink(btn);
        handler();
      }.bind(this)
    );
  }

  addHandlerDnsClick(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.render-dns-view--btn');
        if (!btn || btn.classList.contains('active')) return;
        this._toggleActiveLink(btn);
        handler();
      }.bind(this)
    );
  }

  addHandlerDeleteClick(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.render-delete-view--btn');
        if (!btn || btn.classList.contains('active')) return;
        this._toggleActiveLink(btn);
        handler();
      }.bind(this)
    );
  }

  addHandlerDarkLightToggle(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.render-delete-view--btn');
      if (!btn) return;
      handler();
    });
  }
}

export default new NavigationBar();
