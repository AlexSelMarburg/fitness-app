import { wait } from './helpers.js';

class NavigationBar {
  _parentElement = document.querySelector('.navigation');
  _navigationLinks = document.querySelectorAll('.list');
  _toggleModeSwitch = document.querySelector('.switch');

  constructor() {
    this._addHandlerActiveLink();
    this._addHandlerDarLightMode();
  }

  _addHandlerActiveLink() {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.list');
        // const btn = e.target.closest('img.nav_svg');

        if (!btn) return;

        this._navigationLinks.forEach(li => {
          li.classList.remove('active');
        });
        btn.closest('.list').classList.add('active');
      }.bind(this)
    );
  }

  _addHandlerDarLightMode() {
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
}

export default new NavigationBar();
