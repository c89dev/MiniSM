updateView();
header.innerHTML = headerView();

function updateView() {
    if (currentPage == Pages.welcomePage) {
        welcomePageView();
    }
    else if (currentPage == Pages.registrationPage) {
        registrationPageView();
    }
    else if (currentPage == Pages.feedPage) {
        feedPageView();
    }
}

function registrationPageView() {
    currentPage = Pages.registrationPage;

    let html = `
    <div>
        <input placeholder="Name" type="text"> <br>
        <input placeholder="Age" type="text"> <br>
        <input placeholder="Profile Picture" type="text"> <br>
        <button onclick="feedPageView()">BROWSE PEOPLE</button>
    </div>
    `

    content.innerHTML = html;
}


function welcomePageView() {
    currentPage = Pages.welcomePage;
    let html = /*HTML*/`
    <div style="font-size: 50px;">
    WELCOME! <br>
    <button onclick="registrationPageView()">REGISTER</button>
    </div>

    `;
    content.innerHTML = html;
}

function feedPageView() {
    currentPage = Pages.feedPage;

    let sortHtml = `<div><button onclick="feedFilter(true)">FOLLOWING</button>
                    <button onclick="feedFilter(false)">ALL</button></div>`
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

    feedHtml = '';
    for (let i = 0; i < filteredUsers.length; i++) {
        feedHtml += displayUserList(filteredUsers[i], filteredUsers[i].id);
    }

    content.innerHTML = sortHtml + feedHtml;
}

function profilePageView(userId) {
    currentViewUser = usersRegistered.find(u => u.id === userId);
    let followState = checkFollow(currentViewUser);
    let profileHtml = `
    <div class="userProfile">User Profile
        <div><img src="${currentViewUser.pfp}" class="medAvatar"></div>
        <div><button id="followBtn" onclick="toggleFollow(${currentViewUser.youFollow})">${followState}</button>
        <div>${currentViewUser.name}</div>
        <div>Age: ${currentViewUser.age}</div>
    </div>
    `
    content.innerHTML = profileHtml;
}


function displayUserList(userObj, userId) {
    return `<div>
    <img onclick="profilePageView('${userId}')" 
    class="smallAvatar" 
    src="${userObj.pfp}"> 
    ${userObj.name}
    </div>`
}

function headerView() {
    return headerHtml = `StalkBook <button onclick="registrationPageView()">🏚️</button>`
}


