let headerMain = headerConstruct();

let regPage = regFormConstruct();
Pages.regPage = regPage.wrapper;

let logInPage = logInFormConstruct();
Pages.logInPage = logInPage.wrapper;

let feedPage = feedPageConstruct();
Pages.feedPage = feedPage.wrapper;

let createPage = createPageConstruct();
Pages.createPage = createPage.wrapper;

content.appendChild(feedPage.wrapper);



currentPage = Pages.logInPage;

init();
function init() {
    Pages.profilePage = document.createElement("div");
    content.appendChild(Pages.profilePage);
}

updateView();
function updateView() {
    for (let el of Object.values(Pages)) {
        el.classList.add("invisible");
    }
    currentPage.classList.remove("invisible");
}

function regFormConstruct() {
    //NOTE: pw strength detector 🤡

    let form = { ...regFormTemplate };
    form.wrapper = document.createElement("form");
    form.header = document.createElement("h3");
    form.mail = document.createElement("input");
    form.mail.autocapitalize = "none";
    form.mail.type.autocomplete = "email";
    form.name = document.createElement("input");
    form.year = document.createElement("select");
    form.pw = document.createElement("input");
    form.tick = document.createElement("input");
    form.regBtn = document.createElement("button");

    let mailLabel = document.createElement("label")
    let nameLabel = document.createElement("label")
    let yearLabel = document.createElement("label")
    let pwLabel = document.createElement("label")
    let newsLabel = document.createElement("label")
    let toLogin = document.createElement("a");

    form.regBtn.textContent = "Register";
    form.header.textContent = "Join now!";
    mailLabel.textContent = "E-mail";
    nameLabel.textContent = "Name";
    yearLabel.textContent = "Year of birth";
    pwLabel.textContent = "Choose a password"
    form.tick.type = "checkbox"; form.tick.checked = "checked";
    newsLabel.textContent = "Yes, fill my inbox with adverts and spam ";
    toLogin.href = "#";
    toLogin.textContent = "Already a user? Log in here"
    toLogin.onclick = () => goToLogIn();

    // Append
    form.wrapper.append(
        form.header,
        mailLabel,
        form.mail,
        nameLabel,
        form.name,
        yearLabel,
        form.year,
        pwLabel,
        form.pw,
        newsLabel,
        form.regBtn,
        toLogin
    );
    newsLabel.append(form.tick)

    for (let y = 1900; y < 2026; y++) {
        let option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        form.year.appendChild(option);
    }

    form.regBtn.onclick = () => registerNewUser();

    form.wrapper.classList.add("Form");
    content.appendChild(form.wrapper);
    return form;
}

function logInFormConstruct() {
    let form = { ...logIn };
    form.wrapper = document.createElement("form");

    let mailLabel = document.createElement("label");
    mailLabel.textContent = "E-mail";
    form.mail = document.createElement("input");
    form.mail.autocapitalize = "none";
    form.mail.type.autocomplete = "email";

    let pwLabel = document.createElement("label");
    pwLabel.textContent = "Password";
    form.pw = document.createElement("input");
    form.pw.type = "password";
    form.pw.type.autocapitalize = "none";


    form.loginBtn = document.createElement("button");
    form.loginBtn.textContent = "Log in";

    let signUp = document.createElement("a");
    signUp.href = "#"
    signUp.textContent = "Not a user? Sign up here";

    form.wrapper.append(
        mailLabel,
        form.mail,
        pwLabel,
        form.pw,
        form.loginBtn,
        signUp
    );
    signUp.onclick = () => goToReg();
    form.loginBtn.onclick = () => userLogIn();

    form.wrapper.classList.add("Form");
    content.append(form.wrapper);
    return form;
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

function feedOption() {
    let menu = {};
    menu.wrapper = document.createElement("div");
    menu.select = document.createElement("select");
    menu.optionA = document.createElement("option");
    menu.optionB = document.createElement("option");
    menu.optionA.textContent = 'All';
    menu.optionB.textContent = 'Following';
    menu.optionA.value = 'All';
    menu.optionB.value = 'Following';

    menu.select.append(menu.optionA, menu.optionB);
    menu.wrapper.append(menu.select);

    menu.select.addEventListener("change", toggleFeed);

    return menu.wrapper;
}

function toggleFeed(e) {

    if (e.target.value == 'Following') {
        console.log("Following ran");
        feedPage.post.innerHTML = '';

        for (let i = 0; i < globalFeed.length; i++) {
            let feedNode = globalFeed[i].article.wrapper;
            if (loggedInUser.subs.includes(feedNode.authorId))

                feedPage.post.append(feedNode);
        }
    }
    else if (e.target.value == 'All') {
        console.log("All ran");
        for (let i = 0; i < globalFeed.length; i++) {
            let feedNode = globalFeed[i];

            feedPage.post.append(feedNode);
        }
    }
}





function feedPageConstruct() {
    let feed = { ...feedTemplate };
    feed.wrapper = document.createElement("div");
    feed.post = document.createElement("div");
    feed.filter = feedOption();
    feed.createBtn = document.createElement("button");
    feed.createBtn.textContent = "Create Post";

    feed.wrapper.append(feed.filter, feed.createBtn, feed.post);

    feed.createBtn.onclick = () => goToCreate();

    return feed;
}

function feedPageDraw() {
    filteredFeed = usersRegistered.slice();

    for (let i = 0; i < globalFeed.length; i++) {
        let feedNode = globalFeed[i];

        feedPage.post.append(feedNode);

    }
}

function authorConstruct(userObj) {
    let author = { ...authorTemplate };
    author.wrapper = document.createElement("div");
    author.name = document.createElement("div");
    author.pfp = document.createElement("img");
    author.name.textContent = userObj.name;
    author.pfp.src = userObj.pfp;

    author.pfp.onclick = () => profilePageView(userObj);

    // Append
    author.wrapper.append(author.pfp, author.name);

    // CSS
    author.pfp.classList.add("smallAvatar");
    author.wrapper.classList.add("author-wrapper")

    return author.wrapper;
}

function createPageConstruct() {
    let create = {};
    create.wrapper = document.createElement("form");

    create.titleLabel = document.createElement("label");
    create.titleLabel.textContent = "Give your post a title:";

    create.title = document.createElement("input")
    create.title.classList.add("createPage-title");

    create.preview = document.createElement("div");

    create.selectFile = document.createElement("input");
    create.selectFile.type = "file";

    create.descrLabel = document.createElement("label");
    create.descrLabel.textContent = "Description:";

    create.descr = document.createElement("input");
    create.descr.classList.add("createPage-descr");
    create.descr.type = Text;

    create.submitBtn = document.createElement("button");
    create.submitBtn.textContent = "Post now";

    create.preview.append(create.selectFile);

    create.wrapper.append(
        create.titleLabel,
        create.title,
        create.preview,
        create.descrLabel,
        create.descr,
        create.submitBtn,
    );

    create.submitBtn.addEventListener("click", articleConstruct);

    content.append(create.wrapper);
    create.wrapper.classList.add("createPage");

    return create;
}

function articleConstruct() {
    let authorBadge = authorConstruct(loggedInUser);
    let authorId = loggedInUser.id;

    let article = { ...postTemplate };
    article.wrapper = document.createElement("div");
    article.title = document.createElement("h3")
    article.media = document.createElement("img");
    article.descr = document.createElement("p");
    article.likes = document.createElement("p");

    article.title.textContent = createPage.title.value;
    article.media.src = "media/image/scape.png"
    article.descr.textContent = createPage.descr.value;
    article.likes.textContent = "👍"

    article.wrapper.append(
        authorId,
        authorBadge,
        article.title,
        article.media,
        article.likes,
        article.descr);
    globalFeed.push(article);
    loggedInUser.posts.push(article);

    article.wrapper.classList.add("feedArticle")
    feedPage.post.append(article.wrapper);

    return article;


}

function profilePageView(userObj) {
    currentPage = Pages.profilePage;
    const wrapper = Pages.profilePage;
    wrapper.innerHTML = '';
    profilePageConstruct(userObj, wrapper);
    updateView();
}

function profilePageConstruct(userObj, wrapper) {
    //has premade wrapper div and page (init)

    let profile = { ...profileTemplate };
    profile.pfp = document.createElement("img");
    profile.followBtn = document.createElement("button");
    profile.name = document.createElement("p");
    profile.age = document.createElement("p");
    profile.about = document.createElement("p");
    profile.editAbout = document.createElement("button");
    profile.editPfp = document.createElement("button");

    profile.pfp.src = userObj.pfp;
    profile.followBtn.textContent = "Follow";
    profile.name.textContent = "Name: " + userObj.name;
    profile.age.textContent = "Age: " + userObj.age;
    profile.about.textContent = "Here's some interesting information about me";
    profile.editPfp.textContent = "EDIT PFP";
    profile.editAbout.textContent = "EDIT ABOUT";

    wrapper.append(
        profile.pfp,
        profile.followBtn,
        profile.name,
        profile.age,
        profile.about
    );
    if (loggedInUser.id == userObj.id) {
        // append extras
        wrapper.append(profile.editPfp, profile.editAbout);
        wrapper.removeChild(profile.followBtn);
    }

    profile.followBtn.onclick = () => follow(userObj);

    wrapper.classList.add("userProfile")
    content.appendChild(wrapper);
    updateView();
    return profile;
}

function headerConstruct() {
    let mainHeader = { ...headerObj };
    mainHeader.wrapper = document.createElement("div");
    mainHeader.UI = document.createElement("div");
    mainHeader.title = document.createElement("h1");
    mainHeader.title.textContent = "StalkBook";
    mainHeader.myProf = document.createElement("label");
    mainHeader.myProf.textContent = '';
    mainHeader.logOut = document.createElement("button");
    mainHeader.logOut.textContent = "Log out";



    mainHeader.wrapper.append(
        mainHeader.title,
        mainHeader.UI
    );

    mainHeader.title.onclick = () => clickTitle();

    header.append(mainHeader.wrapper);
    return mainHeader;

}

function userUIDraw() {
    headerMain.UI.append(headerMain.myProf, headerMain.logOut);
    headerMain.logOut.addEventListener("click", userLogOut);
}








