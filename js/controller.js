import { wait, getNumberOfWeek } from './helpers.js';
import * as model from './model.js';
import navigation from './navigationBar.js';
import caloriesView from './views/caloriesView.js';
import weightView from './views/weightView.js';
import dnsView from './views/dnsView.js';
import deleteView from './views/deleteView.js';

const controlNavKcal = function () {
  try {
    model.resetKcalAccumulator();
    caloriesView.render(model.getKcalData());
    caloriesView.addHandlerAddKcalClick(controlAddKcals);
    caloriesView.addHandlerResetKcalValueClick(controlResetKcalsValue);
    caloriesView.addHandlerTakeOverKcalsClick(controlTakeOverKcals);
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlNavWeight = function () {
  try {
    weightView.render('dummy data');
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
    deleteView.render('dummy data');
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlAddKcals = function (kcalsAccumulator) {
  try {
    caloriesView.update(model.getKcalData(kcalsAccumulator));
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlResetKcalsValue = function () {
  try {
    model.resetKcalAccumulator();
    caloriesView.update(model.getKcalData());
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const controlTakeOverKcals = function () {
  try {
    // model.resetKcalAccumulator();
    model.processKcalAccumulator();
    caloriesView.update(model.getKcalData());
  } catch (err) {
    // caloriesView.renderError();
    console.error(err);
  }
};

const init = function () {
  navigation.addHandlerKcalClick(controlNavKcal);
  navigation.init();
  navigation.addHandlerWeightClick(controlNavWeight);
  navigation.addHandlerDnsClick(controlNavDNS);
  navigation.addHandlerDeleteClick(controlNavDelete);
};
init();
