import {
  wait,
  getNumberOfWeek,
  findLastElement,
  findLastElements,
} from './helpers.js';

export const state = {
  weight: [
    [15, 'YYYY-MM-DD', 101.8],
    [16, 'YYYY-MM-DD', 101.3],
  ],
  kcalsAccumulator: 0,
  kcals: [
    [13, '2022-04-09', 55],
    [14, '2022-04-09', 22],
    [14, '2022-04-09', 33],
    [15, '2022-04-09', 1],
    [15, '2022-04-10', 2],
    [15, '2022-04-11', 3],
    [15, '2022-04-13', 4],
    [15, '2022-04-14', 10],
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

export const getKcalData = function () {
  const data = {};

  // get current day iso date-string
  const currentDateString = new Date().toISOString().slice(0, 10);
  // try to find matching entery in kcals-arr
  const todayKcalEntryArr = findLastElement(
    state.kcals,
    kcal => kcal[1] === currentDateString
  );
  // assign kcal value
  data.today = todayKcalEntryArr?.length ? todayKcalEntryArr[2] : 0;

  // -------------------------------------------------

  const yesterdayDateString = new Date(
    new Date().setDate(new Date().getDate() - 1)
  )
    .toISOString()
    .slice(0, 10);

  const yesterdayKcalEntryArr = findLastElement(
    state.kcals,
    element => element[1] === yesterdayDateString
  );

  data.yesterday = yesterdayKcalEntryArr?.length
    ? yesterdayKcalEntryArr[2]
    : '----';

  // -------------------------------------------------
  const allCurrentWeekDaysArr = findLastElements(
    state.kcals,
    getNumberOfWeek()
  );
  const avgCurrentWeekKcals = allCurrentWeekDaysArr?.reduce(
    (kcals, kcalsArray) => (kcals += kcalsArray[2]),
    0
  );

  data.currentWeek = avgCurrentWeekKcals ? avgCurrentWeekKcals : '----';

  // -------------------------------------------------

  const allLastWeekDaysArr = findLastElements(state.kcals, 14);
  const avgLastWeekKcals = allLastWeekDaysArr?.reduce(
    (kcals, kcalsArray) => (kcals += kcalsArray[2]),
    0
  );
  data.lastWeek = avgLastWeekKcals ? avgLastWeekKcals : '----';
  // console.log(avgCurrentWeekKcals);
  // console.log(avgLastWeekKcals);

  return data;
};
