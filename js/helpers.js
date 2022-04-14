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

export const findLastElement = function (array, findFnCallback) {
  for (let i = array.length - 1; i >= 0; --i) {
    if (findFnCallback(array[i])) {
      return array[i];
    }
  }
};

export const findLastElements = function (array, weekNumber) {
  const matchingElementsArr = [];

  let isFirstEntryFound = false;
  // console.log(weekNumber);

  for (let i = array.length - 1; i >= 0; --i) {
    // console.log(array[i][0]);

    if (weekNumber === array[i][0]) {
      // console.log('match');

      matchingElementsArr.push(array[i]);
      // console.log(matchingElementsArr);

      isFirstEntryFound = true;
    } else {
      if (isFirstEntryFound) return matchingElementsArr;
    }
  }

  return !!isFirstEntryFound.length ? isFirstEntryFound : undefined;
};
