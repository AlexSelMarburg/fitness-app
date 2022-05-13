import * as help from './helpers.js';
import * as config from './config.js';

export const state = {
  settings: {
    lightMode: false,
  },
  kcalsAccumulator: 0,
  weightValue: '',
  firstWeightResultToDisplay: 1,
  allWeightValueDataCount: 0,
  data: [
    // ['2022-04-16', 1805kcals, 102,3kg],
    // ['2022-04-16', 1805kcals, 102,3kg],
    // ['2022-04-16', 1805kcals, 102,3kg],
  ],
  DNS: {},
};

// Test-Data
// const stateData = [
//   ['2022-04-02', 2000],
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
//   ['2022-04-17', 2000, 99.3],
//   ['2022-04-18', 2000],
//   ['2022-04-19', 1000],
//   ['2022-04-20', 2000, 98.3],
//   ['2022-04-21', 2000],
//   ['2022-04-22', 1000],
//   ['2022-04-23', 2000, 97.3],
//   ['2022-04-24', 1000],
//   ['2022-04-25', 2000, 96.1],
//   ['2022-04-26', 1000],
//   ['2022-04-27', 2000, 95.4],
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
export const updateCountAllWeightData = function () {
  state.allWeightValueDataCount = state.data.filter(
    arr => arr.length >= 3
  ).length;
};

export const updateFirstWeightResultToDisplay = function (firstToDisplay) {
  if (
    firstToDisplay < 1 ||
    firstToDisplay >
      state.allWeightValueDataCount - config.MAX_WEIGHT_RESULTS + 1
  ) {
    state.firstWeightResultToDisplay = 1;

    return;
  }

  state.firstWeightResultToDisplay = firstToDisplay;
};

export const getWeightValueDataCount = () => state.allWeightValueDataCount;

export const resetWeightValue = function () {
  state.weightValue = '';
};

export const getWeightData = function (weightValue = '') {
  const data = {};

  data.weightValue = state.weightValue += weightValue;
  // #################################################
  // ['2022-04-16', 1805kcals, 102,3kg]

  let occurrenceNr = 0;
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
      occurrenceNr++;
      foundNext = true;
      nextIsNeverFound = false;
    }

    if (foundNext) {
      currentMeasurment[1] = Math.round(currKcalsAcc / foundKcalsCount);
      currentMeasurment[3] = (lastWeightValue - state.data[i][2]).toFixed(1);
      measurements.push(currentMeasurment);

      if (
        occurrenceNr - state.firstWeightResultToDisplay >=
        config.MAX_WEIGHT_RESULTS
      ) {
        break;
      }

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
      occurrenceNr++;

      if (occurrenceNr < state.firstWeightResultToDisplay) {
        continue;
      }

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

  data.measurements = measurements;

  updateCountAllWeightData();
  data.allWeightValueDataCount = state.allWeightValueDataCount;

  data.firstWeightResultToDisplay = state.firstWeightResultToDisplay;

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
