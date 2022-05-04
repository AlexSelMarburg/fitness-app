import View from './views/View.js';
import * as model from './model.js';
import navigation from './navigationBar.js';
import caloriesView from './views/caloriesView.js';
import manageDataView from './views/manageDataView.js';
import weightView from './views/weightView.js';
import dnsView from './views/dnsView.js';
import navigationBar from './navigationBar.js';

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
    model.resetWeightValue();
    weightView.render(model.getWeightData());
    weightView.addHandlerNewWeightEntryClick(controlNewWeightDataEntry);
    weightView.addHandlerAbortClick(controlAbortWeightData);
    weightView.addHandlerAddWeightBtnClick(controlAddWeight);
    weightView.addHandlerResetWeightValueClick(controlResetWeightValue);
    weightView.addHandlerPersistWeightDataClick(controlPersistWeightData);
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

const controlNewWeightDataEntry = function () {
  try {
    model.resetWeightValue();
    weightView.update(model.getWeightData());
    weightView.handleNumButtonsDisability(model.state.weightValue);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlResetWeightValue = function () {
  try {
    model.resetWeightValue();
    weightView.update(model.getWeightData());
    weightView.handleNumButtonsDisability(model.state.weightValue);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlAbortWeightData = function () {
  try {
    model.resetWeightValue();
    weightView.update(model.getWeightData());
    weightView.handleNumButtonsDisability(model.state.weightValue);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlAddWeight = function (weightValue) {
  try {
    // console.log(weightValue);
    weightView.update(model.getWeightData(weightValue));
    weightView.handleNumButtonsDisability(model.state.weightValue);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlPersistWeightData = function () {
  try {
    model.processWeightValue();
    model.resetWeightValue();
    controlNavWeight.call(navigation);
    // weightView.update(model.getWeightData());
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
