import View from './views/View.js';
import * as model from './model.js';
import navigation from './navigationBar.js';
import caloriesView from './views/caloriesView.js';
import manageDataView from './views/manageDataView.js';
import weightView from './views/weightView.js';
import dnsView from './views/dnsView.js';

// #region NAV-BAR
const controlNavKcal = function () {
  try {
    model.resetKcalAccumulator();
    caloriesView.render(model.getKcalData());
    caloriesView.addHandlerAddKcalClick(controlAddKcals);
    caloriesView.addHandlerResetKcalValueClick(controlResetKcalsValue);
    caloriesView.addHandlerTakeOverKcalsClick(controlTakeOverKcals);
    caloriesView.handleButtonsDisability(model.state.kcalsAccumulator);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlNavWeight = function () {
  try {
    weightView.render('dummy data');
    weightView.addHandlerNewWeightEntryClick();
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlNavDNS = function () {
  try {
    dnsView.render('dummy data');
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlNavDelete = function () {
  try {
    manageDataView.render('dummy data');
    manageDataView.addHandlerDeleteAllData(controlDeleteAllData);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlNavDarkLightMode = function (isLightModeOn) {
  try {
    model.persistSettingsLightMode(isLightModeOn);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

//#endregion

// #region KCALS-View
const controlAddKcals = function (kcalsAccumulator) {
  try {
    caloriesView.update(model.getKcalData(kcalsAccumulator));
    caloriesView.handleButtonsDisability(model.state.kcalsAccumulator);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlResetKcalsValue = function () {
  try {
    model.resetKcalAccumulator();
    caloriesView.update(model.getKcalData());
    caloriesView.handleButtonsDisability(model.state.kcalsAccumulator);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlTakeOverKcals = function () {
  try {
    model.processKcalAccumulator();
    caloriesView.update(model.getKcalData());
    caloriesView.handleButtonsDisability(model.state.kcalsAccumulator);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};
//#endregion

// #region MODEL / DATA
const controlDeleteAllData = function () {
  try {
    model.clearAllData();
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};
// #endregion

// #region  WEIGHT-VIEW
const controlAddWeightData = function () {
  try {
    // model.persistSettingsLightMode(isLightModeOn);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};
// #endregion

const init = function () {
  View.initDarkLightMode(model.getLightModeState());
  navigation.addHandlerKcalClick(controlNavKcal);
  navigation.init();
  navigation.addHandlerWeightClick(controlNavWeight);
  navigation.addHandlerDnsClick(controlNavDNS);
  navigation.addHandlerDeleteClick(controlNavDelete);
  navigation.addHandlerDarkLightMode(controlNavDarkLightMode);
};
init();
