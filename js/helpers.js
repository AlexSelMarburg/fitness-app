export const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

export const getNumberOfWeek = function (date = new Date()) {
  const tdt = new Date(date.valueOf());
  const dayn = (date.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
};

export const findLastElementByDateString = function (array, dateString) {
  for (let i = array.length - 1; i >= 0; --i) {
    if (array[i][1] === dateString) return array[i];
  }
};

export const findLastElementsByWeekNumber = function (array, weekNumber) {
  const matchingElementsArr = [];
  let isFirstEntryFound = false;

  for (let i = array.length - 1; i >= 0; --i) {
    if (weekNumber === array[i][0]) {
      matchingElementsArr.push(array[i]);
      isFirstEntryFound = true;
    } else {
      if (isFirstEntryFound) return matchingElementsArr;
    }
  }

  return !!isFirstEntryFound.length ? isFirstEntryFound : undefined;
};

export const getDateString = function (date) {
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) dt = '0' + dt;
  if (month < 10) month = '0' + month;

  return date.getFullYear() + '-' + month + '-' + dt;
};

export const blockingWait = function (seconds) {
  const start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > seconds * 1000) {
      break;
    }
  }
};
