const { getHolidaysByDate } = require('eferiado')

const isHoliday = (date, ufState) => {
  const {
    nacionais:  infoDayNational, 
    regionais: infoDayRegion
  } = getHolidaysByDate(date)
  
  const isHolidayNational = infoDayNational.length > 0;

  // console.log(`isHolidayNational: ${isHolidayNational}`);
  
  if(isHolidayNational){
    return true;
  }

  const holidayStates = infoDayRegion.map(holiday => holiday.estado)

  const isHolidayInCompanyState = holidayStates.includes(ufState)

  // console.log(`isHolidayInCompanyState: ${isHolidayInCompanyState}`)

  return isHolidayInCompanyState;
}


const isWeekend = (date) => {

  const isSaturday = date.getDay() === 6;
  const isSunday = date.getDay() === 0;

  // console.log(`isSaturday: ${isSaturday} | isSunday: ${isSunday}`)

  return isSaturday || isSunday;

}

const iHaveJob = (date, ufState) => {
  return !(isWeekend(date) || isHoliday(date, ufState));
}

module.exports = {
  iHaveJob
}
