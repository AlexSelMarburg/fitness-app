import { wait, getNumberOfWeek } from './helpers.js';
import * as model from './model.js';
import navigation from './navigationBar.js';
import caloriesView from './views/caloriesView.js';
import weightView from './views/weightView.js';
import dnsView from './views/dnsView.js';
import deleteView from './views/deleteView.js';

const controlNavKcal = function () {
  try {
    caloriesView.render(model.getKcalData());
    // const id = window.location.hash.slice(1);
    // if (!id) return;
    // recipeView.renderSpinner();
    // // 0) Update results view to mark selected search result
    // resultsView.update(model.getSearchResultsPage());
    // // 1) Updating bookmarks view
    // bookmarksView.update(model.state.bookmarks);
    // // 2) Loading recipe
    // await model.loadRecipe(id);
    // // 3) Rendering recipe
    // recipeView.render(model.state.recipe);
  } catch (err) {
    // recipeView.renderError();
    console.error(err);
  }
};

const controlNavWeight = function () {
  try {
    weightView.render(undefined);
  } catch (err) {
    // recipeView.renderError();
    console.error(err);
  }
};

const controlNavDNS = function () {
  try {
    dnsView.render(undefined);
  } catch (err) {
    // recipeView.renderError();
    console.error(err);
  }
};

const controlNavDelete = function () {
  try {
    deleteView.render(undefined);
  } catch (err) {
    // recipeView.renderError();
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
