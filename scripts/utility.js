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