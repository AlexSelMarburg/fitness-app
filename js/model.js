import {
  wait,
  getNumberOfWeek,
  findLastElementByDateString,
  findLastElementsByWeekNumber,
  getDateString,
} from './helpers.js';

export const state = {
  weight: [
    [15, 'YYYY-MM-DD', 101.8],
    [16, 'YYYY-MM-DD', 101.3],
  ],
  kcalsAccumulator: 10,
  kcals: [
    [11, '2022-03-09', 55],
    [11, '2022-03-09', 22],
    [11, '2022-03-09', 33],
    [11, '2022-03-09', 1],
    [14, '2022-03-10', 2],
    [14, '2022-03-11', 3],
    [15, '2022-04-11', 4],
    [15, '2022-04-14', 10],
    [15, '2022-04-15', 110],
  ],
  DNS: {},
};

const init = function () {
  let kcals = localStorage.getItem('kcals');
  let weight = localStorage.getItem('weight');
  if (weight) state.bookmarks = JSON.parse(weight);
  if (kcals) state.bookmarks = JSON.parse(kcals);
};
init();

const persistWeight = function () {
  localStorage.setItem('weight', JSON.stringify(state.weight));
};
const persistKcals = function () {
  localStorage.setItem('kcal', JSON.stringify(state.kcals));
};

export const getKcalData = function (kcalsAccumulator = 0) {
  state.kcalsAccumulator += Number(kcalsAccumulator);
  const data = {};
  data.kcalsAccumulator = state.kcalsAccumulator;

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
    (avgKcals, kcalsArray) => (avgKcals += kcalsArray[2]),
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
    (avgKcals, kcalsArray) => (avgKcals += kcalsArray[2]),
    0
  );
  data.lastWeek = avgLastWeekKcals ? avgLastWeekKcals : undefined;

  return data;
};
