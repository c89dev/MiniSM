function registerNewUser() {
    let verified = false;
    if (verifyMail(regPage.mail.value)) {
        if (verifyPw(regPage.pw.value, regPage.pwr.value)) {
            verified = true;
        } else {
            return;
        }
        if (verified) {
            let currentRegistration = { ...userTemplate };
            let selectedYear = regPage.year.value;
            currentRegistration.mail = regPage.mail.value;
            currentRegistration.name = regPage.name.value;
            currentRegistration.age = calcAge(selectedYear);
            currentRegistration.pw = regPage.pw.value;
            currentRegistration.id = userIdCount++;
            currentRegistration.pfp = userTemplate.pfp;

            usersRegistered.push(currentRegistration);
            currentPage = Pages.logInPage;
            window.alert("Thank you for signing up. Redirecting to log in now.");
            setTimeout(updateView, 800);

            regPage.wrapper.reset();
            regPage.tick.checked = true;
        }
    }
}

function userLogIn() {
    // if (checkIfEmail(logInPage.mail.value)) {
    let mailInput = logInPage.mail.value;
    let pwInput = logInPage.pw.value;
    let userId;

    for (let i = 0; i < usersRegistered.length; i++) {
        if (
            mailInput == usersRegistered[i].mail &&
            pwInput == usersRegistered[i].pw
        ) {
            loggedInUser = usersRegistered[i];
            isLoggedIn = true;
            headerMain.myProf.textContent = "Logged in as " + usersRegistered[i].name;
            console.log("Success");
            feedPageDraw();
            userUIDraw();
            currentPage = Pages.feedPage;
            setTimeout(updateView, 300);
            logInPage.wrapper.reset();
            regPage.wrapper.reset();
        } else console.log("Fail");
    }
}
// }

function userLogOut() {
    loggedInUser = null;
    isLoggedIn = null;
    headerMain.UI.innerHTML = "";
    feedPage.post.innerHTML = "";
    currentPage = Pages.logInPage;
    updateView();
}

function follow(e, userObj) {
    if (!loggedInUser.subs.includes(userObj.id)) {
        loggedInUser.subs.push(userObj.id);
        e.target.textContent = "Unfollow";
    } else if (loggedInUser.subs.includes(userObj.id)) {
        loggedInUser.subs.splice(loggedInUser.subs.indexOf(userObj.id), 1);
        e.target.textContent = "Follow";
    }
}

function goToReg() {
    currentPage = Pages.regPage;
    updateView();
}

function goToCreate() {
    if (isLoggedIn == true) {
        console.log("Is logged in, goToCreate");
        currentPage = Pages.createPage;
        updateView();
    } else if (isLoggedIn == false) {
        console.log("Is not logged in");
        return;
    }
}

function goToLogIn() {
    currentPage = Pages.logInPage;
    updateView();
}

function clickTitle() {
    if (isLoggedIn == true) {
        currentPage = Pages.feedPage;
        updateView();
    } else if (isLoggedIn == false) {
        return;
    }
}

function myProfile() {
    profilePageView(loggedInUser);
    updateView();
}

function newPfp(profile, userObj, e) {
    const selectedFile = e.target.files[0];

    let apply = document.createElement("button");
    apply.textContent = "Apply";
    profile.editPfp.prepend(apply);

    apply.onclick = () => {
        if (selectedFile) {
            console.log("Applied PFP");

            const reader = new FileReader();
            reader.onload = (e) => {
                loggedInUser.pfp = e.target.result;
                profile.pfp.src = e.target.result;
            };
            reader.readAsDataURL(selectedFile);

            profile.editPfp.removeChild(apply);
        }
    };
}

function editAbout(userObj) {
    let about = Pages.profilePage.querySelector(".about");
    let prev = loggedInUser.about;
    let newInput = document.createElement("input");
    let apply = document.createElement("button");
    apply.textContent = "Apply";
    console.log("HEY");
    Pages.profilePage.append(newInput);
    newInput.value = prev;
    Pages.profilePage.removeChild(about);
    Pages.profilePage.append(apply);
    apply.onclick = () => {
        userObj.about = newInput.value;
        Pages.profilePage.removeChild(newInput);
        Pages.profilePage.append(about);
        about.textContent = userObj.about;
        Pages.profilePage.removeChild(apply);
    };
}

function likeArticle(article, interactingUser, btn) {
    
        btn.style.transform = 'translateY(-5px)';
    setTimeout(() => btn.style.transform = '', 100);
 
    if (!interactingUser.favs.includes(article.articleId)) {
        console.log("liked");
        article.likes++;
        article.likeCount.textContent = article.likes;
        interactingUser.favs.push(article.articleId);
        if (!article.likeCount.querySelector(".invisible")) {
            article.likeCount.classList.remove("invisible");
        }
        return;
    }
    else if (interactingUser.favs.includes(article.articleId)) {
        console.log("unliked");
        article.likes--;
        article.likeCount.textContent = article.likes;
        const index = interactingUser.favs.findIndex(
            item => item === article.articleId);
        if (index !== -1) {
            interactingUser.favs.splice(index, 1);
        }
    }
    if (article.likes < 1) {
        article.likeCount.classList.add("invisible");
    }

   
}

function archivePost(article) {
    // push data
    article.articleId = idGenerator();
    article.authorId = loggedInUser.id;
    globalFeed.push(article);
    loggedInUser.posts.push(article);
}

function idGenerator() {
    let numbers = ["0", "1", "2", "3", "4"];
    let symbols = ["#", "$", "%", "*"];
    let result = "";

    for (let i = 0; i <= 2; i++) {
        result += numbers[randBetw(4)] + symbols[randBetw(4)];
    }
    for (let i = 0; i <= 2; i++) {
        result += numbers[randBetw(4)] + symbols[randBetw(4)];
    }
    for (let i = 0; i <= 2; i++) {
        result += numbers[randBetw(4)] + symbols[randBetw(4)];
    }

    console.log(result);
    return result;
}

// function fileUpload(){
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
