import {
  wait,
  getNumberOfWeek,
  findLastElementByDateString,
  findLastElementsByWeekNumber,
  getDateString,
} from './helpers.js';

export const state = {
  weight: [
    // [15, 'YYYY-MM-DD', 101.8],
    // [16, 'YYYY-MM-DD', 101.3],
  ],
  kcalsAccumulator: 0,
  kcals: [
    // [11, '2022-03-09', 55],
    // [11, '2022-03-09', 22],
    // [11, '2022-03-09', 33],
    // [11, '2022-03-09', 1],
    // [14, '2022-03-10', 2],
    // [14, '2022-03-11', 3],
    // [15, '2022-04-11', 4],
    // [15, '2022-04-15', 10],
    // [15, '2022-04-16', 110],
  ],
  DNS: {},
};

const init = function () {
  let kcals = localStorage.getItem('kcals');
  let weight = localStorage.getItem('weight');

  if (weight) state.weight = JSON.parse(weight);
  if (kcals) state.kcals = JSON.parse(kcals);
};
init();

const persistWeight = function () {
  localStorage.setItem('weight', JSON.stringify(state.weight));
};
const persistKcals = function () {
  localStorage.setItem('kcals', JSON.stringify(state.kcals));
};

export const clearAllData = function () {
  localStorage.clear('kcals');
  localStorage.clear('weight');
  state.kcals = state.weight = [];
  // init();
  console.log(state);
};

export const resetKcalAccumulator = function () {
  state.kcalsAccumulator = 0;
};

export const getKcalData = function (kcalsAccumulator = 0) {
  const data = {};
  //TODO:
  data.kcalsAccumulator = state.kcalsAccumulator += kcalsAccumulator;

  // get current day iso date-string 'YYYY-MM-DD'
  const currentDateString = getDateString(new Date());

  // try to find matching entery in kcals-arr
  const todayKcalEntryArr = findLastElementByDateString(
    state.kcals,
    currentDateString
  );
  // assign kcal value
  data.today = todayKcalEntryArr?.length ? todayKcalEntryArr[2] : undefined;

  // -------------------------------------------------

  const yesterdayDateString = getDateString(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );

  const yesterdayKcalEntryArr = findLastElementByDateString(
    state.kcals,
    yesterdayDateString
  );

  data.yesterday = yesterdayKcalEntryArr?.length
    ? yesterdayKcalEntryArr[2]
    : undefined;

  // -------------------------------------------------
  const allCurrentWeekDaysArr = findLastElementsByWeekNumber(
    state.kcals,
    getNumberOfWeek()
  );

  const avgCurrentWeekKcals = allCurrentWeekDaysArr?.reduce(
    (avgKcals, kcalsArray, _, arr) => avgKcals + kcalsArray[2] / arr.length,
    0
  );

  data.currentWeek = avgCurrentWeekKcals ? avgCurrentWeekKcals : undefined;

  // -------------------------------------------------
  const lastWekkNumber =
    getNumberOfWeek() - 1 >= 1 ? getNumberOfWeek() - 1 : 52;

  const allLastWeekDaysArr = findLastElementsByWeekNumber(
    state.kcals,
    lastWekkNumber
  );
  const avgLastWeekKcals = allLastWeekDaysArr?.reduce(
    (avgKcals, kcalsArray, _, arr) => avgKcals + kcalsArray[2] / arr.length,
    0
  );
  data.lastWeek = avgLastWeekKcals ? avgLastWeekKcals : undefined;

  return data;
};

export const processKcalAccumulator = function () {
  const currentDateString = getDateString(new Date());
  const lastKcalsArr = state.kcals?.at(-1);
  const currentKcalsArr =
    lastKcalsArr?.at(1) === currentDateString ? lastKcalsArr : new Array();

  // console.log(isCurrentDateKcalCaptured);
  if (!!currentKcalsArr.length) {
    currentKcalsArr[2] += state.kcalsAccumulator;
  } else {
    state.kcals.push([
      getNumberOfWeek(),
      currentDateString,
      state.kcalsAccumulator,
    ]);
  }
  persistKcals();
  resetKcalAccumulator();
};
