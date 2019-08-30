import panchang, { lon2dms } from "../lib/panchang";
import { rasiNames } from "../lib/astroNames";

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
  return findTransitDate(utcDate, info.Raasi.index, pathToNextSign, true);
};

const calculateFirstSignStart = (utcDate, info) => {
  const pathToNextSign = (-1 * info.Raasi.degreeAbsolute) % 30;
  return findTransitDate(utcDate, info.Raasi.index, pathToNextSign, false);
};

function getMoonSpeedInOneHour(date) {
  const HOUR = 60 * 60 * 1000; //milleseconds in 1 hour
  const begins = new Date(date.getTime() - HOUR);
  const ends = new Date(date.getTime() + HOUR); //next midnight
  const info1 = panchang.calculate(begins);
  const info2 = panchang.calculate(ends);
  let hourPath = info2.Raasi.degreeAbsolute - info1.Raasi.degreeAbsolute;
  if (hourPath < 0) hourPath += 360;
  const moonSpeed = hourPath / HOUR;
  return moonSpeed;
}

const getMoonSpeed24h = firstDate => {
  const begins = new Date(new Date(firstDate).setUTCHours(0, 0, 0, 0)); //midnight
  const ends = new Date(new Date(begins).setDate(begins.getDate() + 1)); //next midnight
  const birthInfo1 = panchang.calculate(begins);
  const birthInfo2 = panchang.calculate(ends);
  let fullDayPath =
    birthInfo2.Raasi.degreeAbsolute - birthInfo1.Raasi.degreeAbsolute;
  if (fullDayPath < 0) fullDayPath += 360;
  const dayMilliSeconds = 86400000.0;
  const moonSpeed = fullDayPath / dayMilliSeconds;
  return moonSpeed;
};

function correction(nextSignDate, currentRasiIndex, isNextSignSearch) {
  const result = panchang.calculate(nextSignDate);
  const Moon = result.Raasi;
  const moonSpeed = getMoonSpeed24h(nextSignDate); // getMoonSpeedInOneHour(nextSignDate);
  let previousRasiIndex = currentRasiIndex - 1;
  if (previousRasiIndex < 0) previousRasiIndex += 12;
  let nextRasiIndex = currentRasiIndex + 1;
  if (nextRasiIndex > 11) nextRasiIndex -= 12;

  let foundDate = null;
  if (isNextSignSearch) {
    let rasiEndDegree = 30 * (currentRasiIndex + 1);
    let difference = rasiEndDegree - Moon.degreeAbsolute;
    if (rasiEndDegree === 360 && Moon.degreeAbsolute < 30) {
      difference -= 360;
    }
    var timeToAdd = difference / moonSpeed;
    //console.log("Degree diff", difference, rasiEndDegree, Moon.degreeAbsolute);
    foundDate = new Date(nextSignDate.getTime() + timeToAdd);
  } else {
    if (Moon.index === currentRasiIndex) {
      var timeToReduce = Moon.degree / moonSpeed;
      foundDate = new Date(nextSignDate.getTime() - timeToReduce);
    } else if (Moon.index === previousRasiIndex) {
      var timeToReduce = (30 - Moon.degree) / moonSpeed;
      foundDate = new Date(nextSignDate.getTime() - timeToReduce);
    }
  }

  const newResult = panchang.calculate(foundDate);
  return { foundDate, result: newResult };
}

const findTransitDate = (utcDate, rasi, pathToNextSign, isNextSignSearch) => {
  // console.log("---------------------------------------------------");

  const moonSpeed = getMoonSpeedInOneHour(utcDate);
  const ms = pathToNextSign / moonSpeed;
  const nextSignDate = new Date(utcDate.getTime() + ms);

  // console.log('THE DATE BEFORE:', nextSignDate, ' ('+panchang.calculate(nextSignDate).Raasi.degreeAbsolute+')');
  let { foundDate, result } = correction(nextSignDate, rasi, isNextSignSearch);
  let bestResult = correction(foundDate, rasi, isNextSignSearch);

  // console.log('THE DATE AFTER:', foundDate, '('+result.Raasi.degreeAbsolute+')');
  // console.log('THE DATE AFTER BEST:', bestResult.foundDate, '('+bestResult.result.Raasi.degreeAbsolute+')');
  // console.log('=====================');
  return {
    date: bestResult.foundDate,
    rasi: bestResult.result.Raasi.index,
    speed: moonSpeed,
    info: bestResult.result
  };
};

export const calculatePanchanga = date => {
  const currentInfo = panchang.calculate(date);
  const first = calculateFirstSignStart(date, currentInfo);
  const next = calculateNextSignStart(date, currentInfo);
  currentInfo.Raasi.firstSignDate = first.date;
  currentInfo.Raasi.nextSignDate = next.date;
  return currentInfo;
};

export const findMoonTransitsAsync = async (firstDate, lastDate) => {
  return new Promise((resolve, reject) => {
    const result = findMoonTransits(firstDate, lastDate);
    console.log("resolved promise", result);
    resolve(result);
  });
};

export const findMoonTransits = (firstDate, lastDate) => {
  const transits = [];
  const firstDateInfo = panchang.calculate(firstDate);
  const firstRecord = calculateNextSignStart(firstDate, firstDateInfo);
  transits.push({
    name: rasiNames[firstRecord.rasi],
    dateFrom: firstRecord.date
  });

  let currentDate = firstRecord.date;
  let currentRasi = firstRecord.rasi;
  while (currentDate < lastDate) {
    let result = findTransitDate(currentDate, currentRasi, 30, true);

    currentDate = result.date;
    currentRasi++;
    if (currentRasi > 11) currentRasi -= 12;
    transits.push({
      name: rasiNames[currentRasi],
      dateFrom: result.date,
      lon: lon2dms(result.info.Raasi.degreeAbsolute),
      index: currentRasi
    });
  }

  return transits;
};

export const calculateTarabala = function(birthNakshatra, currentNakshatra) {
  let tarabala = 0;
  let dist = currentNakshatra - birthNakshatra;
  if (dist < 0) {
    dist = dist + 27;
  }
  let x = dist % 9;
  tarabala = x + 1;

  return tarabala;
};

export const getChandraBala=(birthRasi, currentRasi)=> {
  let houseNumber = currentRasi - birthRasi;
  if (houseNumber < 0) {
    houseNumber = houseNumber + 12;
  }

  const chandrabala = houseNumber + 1;
  return chandrabala;
}
