const txtDay = document.getElementById("txtDay");
const lblDay = document.getElementById("lblDay");
const txtDayError = document.getElementById("txtDay_error");

const txtMonth = document.getElementById("txtMonth");
const lblMonth = document.getElementById("lblMonth");
const txtMonthError = document.getElementById("txtMonth_error");

const txtYear = document.getElementById("txtYear");
const lblYear = document.getElementById("lblYear");
const txtYearError = document.getElementById("txtYear_error");

const diffYears  = document.getElementById("diffYears");
const diffMonths = document.getElementById("diffMonths");
const diffDays   = document.getElementById("diffDays");

const btnCalc = document.getElementById("btnCalc");
btnCalc.addEventListener("click", function(e){
    e.preventDefault();
    removeErrors();

    let day   = 0;
    let month = 0;
    let year  = 0;

    let isValid = true;

    // validation
    if (!validate(txtDay)) {
        showError("Day");
        isValid = false;
    } else {
        day = parseInt(txtDay.value);
        txtDay.value = day;
    }

    if (!validate(txtMonth)) {
        showError("Month");
        isValid = false;
    } else {
        month = parseInt(txtMonth.value);
        txtMonth.value = month;
    }

    if (!validate(txtYear)) {
        showError("Year");
        isValid = false;
    } else {
        year = parseInt(txtYear.value);
        txtYear.value = year;
    }

    // validate date
    if (isNaN(Date.parse(new Date(month + "/" + day + "/" + year)))) {
        isValid = false;
        showError("Day");
        showError("Month");
        showError("Year");
        txtMonthError.style.display = "none";
        txtYearError.style.display = "none";
        txtDayError.innerText = "Must be a valid date";
    }
    
    if (!isValid) return;

    // compare values to now
    let then = new Date(month + "/" + day + "/" + year);
    let diff = dateDiff(then);
    // console.log(diff);

    diffYears.innerText  = diff[0];
    diffMonths.innerText = diff[1];
    diffDays.innerText   = diff[2];
});

function dateDiff(startingDate, endingDate) {
    let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));

    // create the date of today if none is given
    if (!endingDate) endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    
    let endDate = new Date(endingDate);
    if (startDate > endDate) {
        const swap = startDate;
        startDate = endDate;
        endDate = swap;
    }

    const startYear = startDate.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;  // leap years
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }

    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }
  
    return [yearDiff, monthDiff, dayDiff];  // return in needed format
}

function removeErrors() {
    txtDayError.innerText = "Must be a valid day";
    txtYearError.innerText = "Must be a valid year";
    txtDay.classList.remove("error");
    lblDay.classList.remove("error");
    txtDayError.style.display = "none";
    txtMonth.classList.remove("error");
    lblMonth.classList.remove("error");
    txtMonthError.style.display = "none";
    txtYear.classList.remove("error");
    lblYear.classList.remove("error");
    txtYearError.style.display = "none";
}

function showError(el) {
    eval("txt" + el).className += "error";
    eval("lbl" + el).className += "error";
    eval("txt" + el + "Error").style.display = "block";
}

function validate(el) {
    let val = 0;

    if (el.value.trim() == "") return false;
    else if (isNaN(el.value)) return false;
    else {
        try {
            val = parseInt(el.value);
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    if (el.id == "txtDay")
        if (val < 1 || val > 31) return false;
    else if (el.id == "txtMonth")
        if (val < 1 || val > 12) return false;
    else if (el.id == "txtYear")
        if (val > new Date().getFullYear()) {
            txtYearError.innerText = "Must be in the past";
            return false;
        } else if (val < new Date().getFullYear() - 150) return false;
    
    return true;
}