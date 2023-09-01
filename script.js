
function handleBtnClick() {

  // get all inputs
  var year = document.getElementById('year').value
  var month = document.getElementById('month').value
  var day = document.getElementById('day').value

  var DAY = 0
  var MONTH = 0
  var YEAR = 0

  // validate inputs
  if (year == '' || month == '' || day == '') {
    alert('Please enter all the values')
    return
  }
  // validate year, must be in the past
  if (year > new Date().getFullYear()) {
    document.getElementById('label-year').style.color = 'hsl(0, 100%, 67%)'
    document.getElementById('year').style.border = '1px solid hsl(0, 100%, 67%)'
    document.getElementById('year-error').innerHTML = "Must be in the past"
    YEAR = 1
  }

  // validate month, must be between 1 and 12
  if (month < 1 || month > 12) {
    document.getElementById('label-month').style.color = 'hsl(0, 100%, 67%)'
    document.getElementById('month').style.border = '1px solid hsl(0, 100%, 67%)'
    document.getElementById('month-error').innerHTML = "Must be a valid month"
    MONTH = 1
  }

  // validate day, must be between 1 and 31
  if (day < 1 || day > 31) {
    document.getElementById('label-day').style.color = 'hsl(0, 100%, 67%)'
    document.getElementById('day').style.border = '1px solid hsl(0, 100%, 67%)'
    document.getElementById('day-error').innerHTML = "Must be a valid day"
    DAY = 1
  }

  if(YEAR == 1 || MONTH == 1 || DAY == 1){
    return
  }

  // calculate age
  result = calculateAge(year, month, day)

  // display result
  /*
      <div class="output">
        <p id="year_output"><span class="age-result">- -</span>years</p>
        <p id="month_utput"><span class="age-result">- -</span>months</p>
        <p id="day_output"><span class="age-result">- -</span>days</p>
      </div>
  */

  document.getElementById('year-value').innerHTML = `${result.years}`
  document.getElementById('month-value').innerHTML = `${result.months}`
  document.getElementById('day-value').innerHTML = `${result.days}`
}

const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Adjusting Years and Months if Birth Date Not Yet Occurred
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
  }

  // Adjusting Days if Birth Date Already Passed in Current Month
  if (ageDays < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, day);
    const daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    ageDays = daysInLastMonth - lastMonth.getDate() + today.getDate();
    ageMonths--;
  }

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };

}