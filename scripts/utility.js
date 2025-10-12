function isMe(userObj) {
    if (loggedInUser.id == userObj.id) {
        return true;
    }
    else { return false; }
}

function populateYears(){
    const yearOption = document.getElementById("regYear")
    for (let y = 1900; y < 2025; y++){
        let option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearOption.appendChild(option);
    }
}

function calcAge(yearInput){
    let selectedYear = yearInput;
    let date = new Date();
    let currentYear = date.getFullYear();
    let age = currentYear - selectedYear;
    return age;
}

function checkIfEmail(input) {
    mailToCheck = input;
    let checkOne = false;

    if (mailToCheck.includes('@') && !mailToCheck.includes(' ') && mailToCheck.includes('.')) {
        checkOne = true;
        splitOne = mailToCheck.split('@');
        splitTwo = mailToCheck.split('.');
    }                                                                                                               //💀
    if (checkOne && splitOne[0] !== '' && splitOne[1].includes('.') && splitOne[1].length > 3 && splitTwo[1].length > 1) {
        return true;
    }
    else {
        window.alert("Atleast try to make a fake mail");
    }

}