import {
  wait,
  getNumberOfWeek,
  findLastElementByDateString,
  findLastElementsByWeekNumber,
  getDateString,
} from './helpers.js';

export const state = {
  settings: {
    lightMode: false,
  },
  kcalsAccumulator: 0,
  data: [
    // ['2022-04-16', 110],
    // ['2022-04-16', 110],
    // ['2022-04-16', 110],
  ],
  DNS: {},
};

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

export const resetKcalAccumulator = function () {
  state.kcalsAccumulator = 0;
};

export const getLightModeState = function () {
  return state.settings.lightMode;
};

export const getKcalData = function (kcalsAccumulator = 0) {
  const data = {};
  //TODO:
  data.kcalsAccumulator = state.kcalsAccumulator += kcalsAccumulator;

  // get current day iso date-string 'YYYY-MM-DD'
  const currentDateString = getDateString(new Date());

  // try to find matching entery in kcals-arr
  const todayKcalEntryArr = findLastElementByDateString(
    state.data,
    currentDateString
  );
  // assign kcal value
  data.today = todayKcalEntryArr?.length ? todayKcalEntryArr[1] : undefined;

  // -------------------------------------------------

  const yesterdayDateString = getDateString(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );

  const yesterdayKcalEntryArr = findLastElementByDateString(
    state.data,
    yesterdayDateString
  );

  data.yesterday = yesterdayKcalEntryArr?.length
    ? yesterdayKcalEntryArr[1]
    : undefined;

  // -------------------------------------------------
  const allCurrentWeekDaysArr = findLastElementsByWeekNumber(
    state.data,
    getNumberOfWeek()
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
    getNumberOfWeek() - 1 >= 1 ? getNumberOfWeek() - 1 : 52;

  const allLastWeekDaysArr = findLastElementsByWeekNumber(
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
  const currentDateString = getDateString(new Date());
  const lastKcalsArr = state.data?.at(-1);
  const currentKcalsArr =
    lastKcalsArr?.at(0) === currentDateString ? lastKcalsArr : new Array();

  // console.log(isCurrentDateKcalCaptured);
  if (!!currentKcalsArr.length) {
    currentKcalsArr[1] += state.kcalsAccumulator;
  } else {
    state.data.push([currentDateString, state.kcalsAccumulator]);
  }
  persistData();
  resetKcalAccumulator();
};
