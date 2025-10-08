function registerNewUser() {
    let currentRegistration = { ...userTemplate };
    let selectedYear = regPage.year.value;
    currentRegistration.mail = regPage.mail.value;
    currentRegistration.name = regPage.name.value;
    currentRegistration.age = calcAge(selectedYear);
    currentRegistration.pw = regPage.pw.value;
    currentRegistration.id = userIdCount++;
    currentRegistration.pfp = userTemplate.pfp

    usersRegistered.push(currentRegistration);
    currentPage = Pages.logInPage;
    window.alert("Thank you for signing up. Redirecting to log in now.")
    setTimeout(updateView, 2000);
}

function userLogIn() {
    let mailInput = logInPage.mail.value;
    let pwInput = logInPage.pw.value;
    let userId;

    for (let i = 0; i < usersRegistered.length; i++) {
        if (mailInput == usersRegistered[i].mail && pwInput == usersRegistered[i].pw) {
            headerMain.myProf.textContent = "Logged in as " + usersRegistered[i].name;
            console.log("Success");
            loggedInUser = usersRegistered[i];
            currentPage = Pages.feedPage;
            isLoggedIn = true;
            feedPageDraw();
            userUIDraw();
            setTimeout(updateView, 300);
        }
        else (console.log("Fail"))
    }
}

function userLogOut(){
    loggedInUser = null;
    isLoggedIn = null;
    headerMain.UI.innerHTML = '';
    feedPage.post.innerHTML = '';
    
    
    currentPage = Pages.logInPage;
    updateView();
}

function goToReg() {
    console.log("clicked");
    currentPage = Pages.regPage;
    updateView();
}

function follow(userObj) {
    loggedInUser.subs.push(userObj);

}

function goToCreate() {
    if (isLoggedIn == true) {
        console.log("Is logged in, goToCreate")
        currentPage = Pages.createPage;
        updateView();
    }
    else if (isLoggedIn == false) {
        console.log("Is not logged in")
        return;
    }
}

function clickTitle() {
    if (isLoggedIn == true) {
        currentPage = Pages.feedPage;
        updateView();
    }
    else if (isLoggedIn == false) {
        return;
    }
}




// function editPfp(){
//     const fileInput = document.getElementById("regPfp");
//     const selectedFile = fileInput.files[0];

//     if (selectedFile) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             currentRegistration.pfp = e.target.result;
//             usersRegistered.push(currentRegistration);
//         }
//         reader.readAsDataURL(selectedFile);
//     }
//     else {
// }