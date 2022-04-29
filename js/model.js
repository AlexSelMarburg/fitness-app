import * as help from './helpers.js';

export const state = {
  settings: {
    lightMode: false,
  },
  kcalsAccumulator: 0,
  weightValue: '',
  data: [
    // ['2022-04-16', 110],
    // ['2022-04-16', 110],
    // ['2022-04-16', 110],
  ],
  DNS: {},
};

// #region INITIALIZATION AND DATA PERSISTENCE
const init = function () {
  let data = localStorage.getItem('data');
  if (data) state.data = JSON.parse(data);

  let settings = localStorage.getItem('settings');
  if (settings) state.settings = JSON.parse(settings);
};
init();

const persistData = function () {
  localStorage.setItem('data', JSON.stringify(state.data));
};

export const persistSettingsLightMode = function (isLightModeOn = false) {
  state.settings.lightMode = isLightModeOn;
  localStorage.setItem('settings', JSON.stringify(state.settings));
};

export const clearAllData = function () {
  localStorage.clear('data');
  state.data = [];
  // init();
  // console.log(state);
};

// #endregion

export const getLightModeState = function () {
  return state.settings.lightMode;
};

// #region Kcal-View
export const resetKcalAccumulator = function () {
  state.kcalsAccumulator = 0;
};

export const getKcalData = function (kcalsAccumulator = 0) {
  const data = {};
  //TODO:
  data.kcalsAccumulator = state.kcalsAccumulator += kcalsAccumulator;

  // get current day iso date-string 'YYYY-MM-DD'
  const currentDateString = help.getDateString(new Date());

  // try to find matching entery in kcals-arr
  const todayKcalEntryArr = help.findLastElementByDateString(
    state.data,
    currentDateString
  );
  // assign kcal value
  data.today = todayKcalEntryArr?.length ? todayKcalEntryArr[1] : undefined;

  // -------------------------------------------------

  const yesterdayDateString = help.getDateString(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );

  const yesterdayKcalEntryArr = help.findLastElementByDateString(
    state.data,
    yesterdayDateString
  );

  data.yesterday = yesterdayKcalEntryArr?.length
    ? yesterdayKcalEntryArr[1]
    : undefined;

  // -------------------------------------------------
  const allCurrentWeekDaysArr = help.findLastElementsByWeekNumber(
    state.data,
    help.getNumberOfWeek()
  );

  const avgCurrentWeekKcals = allCurrentWeekDaysArr?.reduce(
    (avgKcals, kcalsArray, _, arr) => avgKcals + kcalsArray[1] / arr.length,
    0
  );

  data.currentWeek = avgCurrentWeekKcals
    ? Math.trunc(avgCurrentWeekKcals)
    : undefined;

  // -------------------------------------------------
  const lastWekkNumber =
    help.getNumberOfWeek() - 1 >= 1 ? help.getNumberOfWeek() - 1 : 52;

  const allLastWeekDaysArr = help.findLastElementsByWeekNumber(
    state.data,
    lastWekkNumber
  );
  const avgLastWeekKcals = allLastWeekDaysArr?.reduce(
    (avgKcals, kcalsArray, _, arr) => avgKcals + kcalsArray[1] / arr.length,
    0
  );
  data.lastWeek = avgLastWeekKcals ? Math.trunc(avgLastWeekKcals) : undefined;

  return data;
};

export const processKcalAccumulator = function () {
  const currentDateString = help.getDateString(new Date());
  const lastKcalsArr = state.data?.at(-1);
  const currentKcalsArr =
    lastKcalsArr?.at(0) === currentDateString ? lastKcalsArr : new Array();

  if (!!currentKcalsArr.length) {
    currentKcalsArr[1] += state.kcalsAccumulator;
  } else {
    state.data.push([currentDateString, state.kcalsAccumulator]);
  }
  persistData();
  resetKcalAccumulator();
};
// #endregion

// #region Weight-View
export const resetWeightValue = function () {
  state.weightValue = '';
};

export const getWeightData = function (weightValue = '') {
  const data = {};
  // console.log(weightValue);
  // console.log(weightValue);
  // console.log(state.weightValue);

  data.weightValue = state.weightValue += weightValue;
  // console.log(state.weightValue);

  return data;
};

export const processweightValue = function () {
  const currentDateString = help.getDateString(new Date());
  const lastKcalsArr = state.data?.at(-1);
  const currentKcalsArr =
    lastKcalsArr?.at(0) === currentDateString ? lastKcalsArr : new Array();

  if (!!currentKcalsArr.length) {
    currentKcalsArr[1] += state.kcalsAccumulator;
  } else {
    state.data.push([currentDateString, state.kcalsAccumulator]);
  }
  persistData();
  resetKcalAccumulator();
};

// #endregion
