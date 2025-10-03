updateView();
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
        <button onclick="feedPageView()">BROWSE FEED</button>
    </div>
    `
    app.innerHTML = html;
}

function profilePageView(name) {

}

function welcomePageView() {
    currentPage = Pages.welcomePage;
    let html = /*HTML*/`
    <div style="font-size: 50px;">
    WELCOME! <br>
    <button onclick="registrationPageView()">REGISTER</button>
    </div>

    `;
    app.innerHTML = html;
}

function feedPageView() {
    currentPage = Pages.feedPage;
    let filteredUsers;
    let navHtml = `<button onclick="feedFilter(true)">FOLLOWING</button>
                    <button onclick="feedFilter(false)">ALL</button>
                    <button onclick="registrationPageView()">🏚️</button>`
    if (sortByFollowing){
        filteredUsers = [];
        for (let i = 0; i < usersRegistered.length; i++){
            if (usersRegistered[i].youFollow){
                filteredUsers.push(usersRegistered[i]);
            }
        }
    }
    else {
        filteredUsers = usersRegistered.slice();
    }
    
    html = '';
    for (let i = 0; i < filteredUsers.length; i++){
        html += userDisplayCmp(filteredUsers[i]);
    }

    app.innerHTML = html;
    navBar.innerHTML = navHtml;
}



function userDisplayCmp(user) {
    return `<div>
    <img class="smallAvatar" src="${user.pfp}"</img>
       ${user.name}
       </div>`
}