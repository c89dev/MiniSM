function isMe(userObj) {
    if (loggedInUser.id == userObj.id) {
        return true;
    } else {
        return false;
    }
}

function populateYears() {
    const yearOption = document.getElementById("regYear");
    for (let y = 1900; y < 2025; y++) {
        let option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearOption.appendChild(option);
    }
}

function calcAge(yearInput) {
    let selectedYear = yearInput;
    let date = new Date();
    let currentYear = date.getFullYear();
    let age = currentYear - selectedYear;
    return age;
}

function verifyMail(input) {
    let error = regPage.mailLabel.querySelector(".error");
    if (error) {
        console.log(error);
        regPage.mailLabel.removeChild(error);
    }
    mailToCheck = input;
    let checkOne = false;

    if (
        mailToCheck.includes("@") &&
        !mailToCheck.includes(" ") &&
        mailToCheck.includes(".")
    ) {
        checkOne = true;
        splitOne = mailToCheck.split("@");
        splitTwo = mailToCheck.split(".");
    } //💀
    if (
        checkOne &&
        splitOne[0] !== "" &&
        splitOne[1].includes(".") &&
        splitOne[1].length > 3 &&
        splitTwo[1].length > 1
    ) {
        return true;
    } else {
        let o = {};
        o.er = document.createElement("p");
        o.er.textContent = "Not a valid email";
        o.er.classList.add("error");
        regPage.mailLabel.append(o.er);
        return;
    }
}

function verifyPw(input1, input2) {
    let error = regPage.pwrLabel.querySelector(".error");
    if (error) {
        regPage.pwrLabel.removeChild(error);
    }

    input1 = regPage.pw.value;
    input2 = regPage.pwr.value;
    let er = document.createElement("p");
    er.textContent = "Passwords do not match";
    er.classList.add("error");

    if (input1 === input2) {
        return true;
    } else {
        let o = {};
        o.er = document.createElement("p");
        o.er.textContent = "Passwords do not match";
        o.er.classList.add("error");
        regPage.pwrLabel.append(o.er);
        return;
    }
}

function randBetw(number){
    rand = Math.floor(Math.random()*number);
    return rand;
}
