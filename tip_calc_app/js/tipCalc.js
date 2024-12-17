// elements
const bill = document.getElementById("txtBill");
const people = document.getElementById("txtPeople");
const customPercent = document.getElementById("txtCustom");
const tipAmountPerson = document.getElementById("tipAmountPerson");
const totalAmountPerson = document.getElementById("totalAmountPerson");

// variables
let total = 0;
let peopleCount = 0;
let percent = 0;

// bill element
bill.addEventListener("change", function(){
    total = Number(bill.value);

    // validate
    if (isNaN(total)) {
        console.error("The bill is Not a Number!");
        bill.value = "";
        total = 0;
        return;
    }
});

// people elements
people.addEventListener("change", function(){
    peopleCount = Number(people.value);
    
    // validate
    if (isNaN(peopleCount)) {
        console.error("The number of people is Not a Number!");
        people.value = "";
        peopleCount = 0;
        return;
    }

    if (peopleCount == 0) {
        console.error("The number of people cannot be zero!");
        people.value = "";
        peopleCount = 0;
        return;
    }

    updateResults();
});

// custom percent
customPercent.addEventListener("change", function() {
    percent = Number(customPercent.value);
    
    // validate
    if (isNaN(percent)) {
        console.error("The tip percentage is Not a Number!");
        customPercent.value = "";
        percent = 0;
        return;
    }

    // unset the radio buttons
    document.getElementById("rb5").checked = false;
    document.getElementById("rb10").checked = false;
    document.getElementById("rb15").checked = false;
    document.getElementById("rb25").checked = false;
    document.getElementById("rb50").checked = false;

    updateResults();
});

// update percentage function
function updatePercent(amount) {
    percent = Number(amount);

    // validate
    if (isNaN(percent)) {
        console.error("The tip percentage is Not a Number!");
        customPercent.value = "";
        percent = 0;
        return;
    }

    customPercent.value = "";
    updateResults();
}

// update results
function updateResults() {
    // validate
    if (total <= 0 || peopleCount <= 0) {
        console.log("Not ready for results.");
        return;
    }

    // get total & tip amounts
    let totalTip = total * (percent / 100);
    let grandTotal = totalTip + total;

    // update the display
    tipAmountPerson.innerText = "$" + (totalTip / peopleCount).toFixed(2);
    totalAmountPerson.innerText = "$" + (grandTotal / peopleCount).toFixed(2);
}