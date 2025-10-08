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
            loggedInAsId = usersRegistered[i].id;
            currentPage = Pages.feedPage;
            isLoggedIn = true;
            setTimeout(updateView, 2200);
        }
        else (console.log("Fail"))
    }
}

// Follow/unfollow user
function toggleFollow() {
    currentViewUser.youFollow = !currentViewUser.youFollow;
    document.getElementById("followBtn").textContent =
        currentViewUser.youFollow ? "Unfollow" : "Follow";
}

// Sort feed by following/all
function feedFilter(selected) {
    if (selected == 'Following') { sortByFollowing = true; }
    else if (selected == 'All') { sortByFollowing = false; }
    feedPage.post.innerHTML = '';
    if (sortByFollowing) {
        filteredUsers = [];
        for (let i = 0; i < usersRegistered.length; i++) {
            if (usersRegistered[i].youFollow) {
                filteredUsers.push(usersRegistered[i]);
            }
        }
    }
    else {
        filteredUsers = usersRegistered.slice();
    }
    for (let i = 0; i < filteredUsers.length; i++) {
        let authorNode = authorConstruct(filteredUsers[i], filteredUsers[i].id);
        feedPage.post.appendChild(authorNode);

    }

}

function checkFollow(user) {
    if (user.youFollow) { return 'Unfollow'; }
    else if (!user.youFollow) { return 'Follow'; }
}

function goToReg() {
    console.log("clicked");
    currentPage = Pages.regPage;
    updateView();
}

function follow(userObj){
    console.log("eh");
    
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