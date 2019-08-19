import panchang from "../lib/panchang";


export const applyTimeZone = (date, timeZoneHours, timeZoneOption) => {
  timeZoneHours = parseInt(timeZoneHours);

  if (timeZoneOption === "east") {
    timeZoneHours = timeZoneHours * -1;
  }

  var result = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours() + timeZoneHours,
      date.getMinutes(),
      date.getSeconds()
    )
  );

  return result;
};

const calculateNextSignStart = (utcDate, info) => {
  const pathToNextSign = 30 - (info.Raasi.degreeAbsolute % 30);
  return findTransitDate(utcDate, info, pathToNextSign, true);
};

const calculateFirstSignStart = (utcDate, info) => {
  const pathToNextSign = (-1 * info.Raasi.degreeAbsolute) % 30;
  return findTransitDate(utcDate, info, pathToNextSign, false);
};

const findTransitDate = (utcDate, info, pathToNextSign, isNextSignSearch) => {
  const begins = new Date(new Date(utcDate).setUTCHours(0, 0, 0, 0));
  const ends = new Date(new Date(begins).setDate(begins.getDate() + 1));
  const birthInfo1 = panchang.calculate(begins);
  const birthInfo2 = panchang.calculate(ends);
  let fullDayPath =
    birthInfo2.Raasi.degreeAbsolute - birthInfo1.Raasi.degreeAbsolute;
  if (fullDayPath < 0) fullDayPath += 360;
  const dayMilliSeconds = 86400000.0;
  const moonSpeed = fullDayPath / dayMilliSeconds;
  const ms = pathToNextSign / moonSpeed;
  const nextSignDate = new Date(utcDate.getTime() + ms);
  const result = panchang.calculate(nextSignDate);
  let previousRasiIndex = info.Raasi.index - 1;
  if (previousRasiIndex < 0) previousRasiIndex += 12;
  let nextRasiIndex = info.Raasi.index + 1;
  if (nextRasiIndex > 11) nextRasiIndex -= 12;
  const currentRasiIndex = info.Raasi.index;
  if (isNextSignSearch) {
    if (result.Raasi.index === currentRasiIndex) {
      var timeToAdd = (30 - result.Raasi.degree) / moonSpeed;
      return new Date(nextSignDate.getTime() + timeToAdd);
    } else if (result.Raasi.index === nextRasiIndex) {
      var timeToReduce = result.Raasi.degree / moonSpeed;
      return new Date(nextSignDate.getTime() - timeToReduce);
    }
  } else {
    if (result.Raasi.index === currentRasiIndex) {
      console.log(result, info, "correction higher");
      var timeToReduce = result.Raasi.degree / moonSpeed;
      return new Date(nextSignDate.getTime() - timeToReduce);
    } else if (result.Raasi.index === previousRasiIndex) {
      console.log("less than correct time correction");
      var timeToReduce = (30 - result.Raasi.degree) / moonSpeed;
      return new Date(nextSignDate.getTime() - timeToReduce);
    }
  }
  //TODO: possible bug with previous date on negative correction
  return nextSignDate;
};

export const calculatePanchanga = date => {
  const currentInfo = panchang.calculate(date);
  const firstDate = calculateFirstSignStart(date, currentInfo);
  const result = calculateNextSignStart(date, currentInfo);
  currentInfo.Raasi.nextSignDate = result;
  currentInfo.Raasi.firstSignDate = firstDate;
  return currentInfo;
};
