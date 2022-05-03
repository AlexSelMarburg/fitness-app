import * as config from './config.js';

/**
 * @description This function returns a Promise that will be
 * resolved after the provided amount of seconds as argument
 * has passed
 * @param {float} seconds
 * @returns Promse
 */
export const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

/**
 * @description This function returns a whole number that
 * represents the week-number of the provided Date. Date
 * defaults to current date if not provided.
 * @param {Date} date
 * @returns weekNumber
 */
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
    if (array[i][0] === dateString) return array[i];
  }
};

export const findLastElementsByWeekNumber = function (array, weekNumber) {
  const matchingElementsArr = [];
  let isFirstEntryFound = false;

  for (let i = array.length - 1; i >= 0; --i) {
    if (weekNumber === getNumberOfWeek(new Date(array[i][0]))) {
      matchingElementsArr.push(array[i]);
      isFirstEntryFound = true;
    } else {
      if (isFirstEntryFound) return matchingElementsArr;
    }
  }

  return !!matchingElementsArr.length ? matchingElementsArr : undefined;
};

export const getDateString = function (date) {
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) dt = '0' + dt;
  if (month < 10) month = '0' + month;

  return date.getFullYear() + '-' + month + '-' + dt;
};

export const isButtonDisabled = function (btn) {
  return (
    btn.classList.contains('disabled') ||
    btn.classList.contains('user-interaction-feedback')
  );
};

export const performUserInteractionFeedback = function (btn) {
  btn.classList.add('user-interaction-feedback');
  wait(config.USER_INTERACTION_ANIMATION_DURATION).then(() => {
    btn.classList.remove('user-interaction-feedback');
  });
};

export const getLocalDateFormatFromString = function (datestring) {
  return new Intl.DateTimeFormat(config.LANGUAGE_LOCALE, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(datestring));
};
