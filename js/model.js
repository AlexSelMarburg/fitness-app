import * as help from './helpers.js';

export const state = {
  settings: {
    lightMode: false,
  },
  kcalsAccumulator: 0,
  weightValue: '',
  data: [
    // ['2022-04-16', 1805kcals, 102,3kg],
    // ['2022-04-16', 1805kcals, 102,3kg],
    // ['2022-04-16', 1805kcals, 102,3kg],
  ],
  DNS: {},
};

// const stateData = [
//   ['2022-04-03', 2000, 102.5],
//   ['2022-04-04', 2000],
//   ['2022-04-05', 1000],
//   ['2022-04-06', 2000, 100.5],
//   ['2022-04-07', 1000],
//   ['2022-04-08', 1000],
//   ['2022-04-09', 2000],
//   ['2022-04-10', 1000],
//   ['2022-04-11', 1500, 101.5],
//   ['2022-04-12', 2000],
//   ['2022-04-13', 1000],
//   ['2022-04-15', 2000],
//   ['2022-04-16', 1000],
//   ['2022-04-14', 2000, 102.3],
// ];

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

  data.weightValue = state.weightValue += weightValue;

  // TODO: pagination beachten

  // #################################################
  // ['2022-04-16', 1805kcals, 102,3kg]

  let foundStart = false;
  let foundNext = false;
  let nextIsNeverFound = true;

  let currKcalsAcc = 0;
  let foundKcalsCount = 0;

  let lastWeightValue = 0;

  let currentMeasurment = [];
  const measurements = [];

  //TODO: state data
  for (let i = state.data.length - 1; i >= 0; i--) {
    if (foundStart) {
      currKcalsAcc += state.data[i][1];
      foundKcalsCount++;
    }

    if (state.data[i].length >= 3 && foundStart) {
      foundNext = true;
      nextIsNeverFound = false;
    }

    if (foundNext) {
      currentMeasurment[1] = Math.round(currKcalsAcc / foundKcalsCount);
      currentMeasurment[3] = (lastWeightValue - state.data[i][2]).toFixed(1);
      measurements.push(currentMeasurment);
      currKcalsAcc = foundKcalsCount = 0;
      lastWeightValue = state.data[i][2];
      foundNext = false;
      currentMeasurment = [
        state.data[i][0], //date
        undefined, // avg-kcals
        state.data[i][2], //weight
        undefined, // weight-diference
      ];
    }

    if (state.data[i].length >= 3 && !foundStart) {
      currentMeasurment = [
        state.data[i][0], //date
        undefined, // avg-kcals
        state.data[i][2], //weight
        undefined, // weight-diference
      ];

      lastWeightValue = state.data[i][2];
      foundStart = true;
    }
  }

  if (foundStart && (nextIsNeverFound || currentMeasurment[1] === undefined)) {
    currentMeasurment[1] = currentMeasurment[3] = 'k.A';
    measurements.push(currentMeasurment);
  }

  // #################################################

  // 1) arrays mit länge 3 (reversed) aus state.data
  // const measurements = [];
  // for (let i = state.data.length - 1; i >= 0; i--) {
  //   if (state.data[i].length >= 3) measurements.push(state.data[i]);
  // }

  // // 2) push differece to arr
  // for (let i = 0; i < measurements.length; i++) {
  //   if (i !== measurements.length - 1) {
  //     measurements[i][3] = (
  //       measurements[i][2] - measurements[i + 1][2]
  //     ).toFixed(1);
  //   } else {
  //     measurements[i][3] = 'k.A';
  //   }
  // }

  data.measurements = measurements;
  console.log(data.measurements);

  return data;
};

export const processWeightValue = function () {
  const currentDateString = help.getDateString(new Date());
  const lastKcalsArr = state.data?.at(-1);
  const currentKcalsArr =
    lastKcalsArr?.at(0) === currentDateString ? lastKcalsArr : new Array();

  if (!!currentKcalsArr.length) {
    currentKcalsArr[2] = Number(state.weightValue.replace(',', '.'));
  } else {
    state.data.push([
      currentDateString,
      0,
      Number(state.weightValue.replace(',', '.')),
    ]);
  }
  persistData();
  resetWeightValue();
};

// #endregion
