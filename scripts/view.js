let headerMain = headerConstruct();
// spawn pages and add to Pages
let regPage = regFormConstruct();
Pages.regPage = regPage.wrapper;

let logInPage = logInFormConstruct();
Pages.logInPage = logInPage.wrapper;

let feedPage = feedPageConstruct();
Pages.feedPage = feedPage.wrapper;

let createPage = createPageConstruct();
Pages.createPage = createPage.wrapper;

content.append(feedPage.wrapper);

currentPage = Pages.logInPage;

init();
function init() {
    Pages.profilePage = document.createElement("div");
    content.append(Pages.profilePage);
}

updateView();
function updateView() {
    for (let el of Object.values(Pages)) {
        el.classList.add("invisible");
    }
    currentPage.classList.remove("invisible");
}

function regFormConstruct() {
    let form = { ...regFormTemplate };
    form.wrapper = document.createElement("form");
    form.header = document.createElement("h3");
    form.mail = document.createElement("input");
    form.mail.autocapitalize = "none";
    form.mail.type.autocomplete = "email";
    form.name = document.createElement("input");
    form.year = document.createElement("select");
    form.pw = document.createElement("input");
    form.pwr = document.createElement("input");
    form.tick = document.createElement("input");
    form.regBtn = document.createElement("button");

    form.mail.required = true;
    form.name.required = true;
    form.pw.required = true;
    form.pwr.required = true;
    form.pw.type = "password";
    form.pwr.type = "password";

    form.mailLabel = document.createElement("label");
    form.nameLabel = document.createElement("label");
    form.yearLabel = document.createElement("label");
    form.pwLabel = document.createElement("label");
    form.pwrLabel = document.createElement("label");
    form.newsLabel = document.createElement("label");
    form.toLogin = document.createElement("a");

    form.regBtn.textContent = "Register";
    form.header.textContent = "Join now!";
    form.mailLabel.textContent = "E-mail";
    form.nameLabel.textContent = "Name";
    form.yearLabel.textContent = "Year of birth";
    form.pwLabel.textContent = "Choose a password";
    form.pwrLabel.textContent = "Repeat password";
    form.tick.type = "checkbox";
    form.tick.checked = "checked";
    form.newsLabel.textContent = "Yes, fill my inbox with adverts and spam ";
    form.toLogin.href = "#";
    form.toLogin.textContent = "Already a user? Log in here";
    form.toLogin.onclick = () => goToLogIn();

    // Append
    form.wrapper.append(
        form.header,
        form.mailLabel,
        form.mail,
        form.nameLabel,
        form.name,
        form.yearLabel,
        form.year,
        form.pwLabel,
        form.pw,
        form.pwrLabel,
        form.pwr,
        form.newsLabel,
        form.regBtn,
        form.toLogin,
    );
    form.newsLabel.append(form.tick);

    for (let y = 1900; y < 2026; y++) {
        let option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        form.year.append(option);
    }

    form.wrapper.onsubmit = (e) => {
        e.preventDefault();
        registerNewUser();
    };

    form.wrapper.classList.add("Form");
    content.append(form.wrapper);
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
    signUp.href = "#";
    signUp.textContent = "Not a user? Sign up here";

    form.mail.required = true;
    form.pw.required = true;

    form.wrapper.append(
        mailLabel,
        form.mail,
        pwLabel,
        form.pw,
        form.loginBtn,
        signUp,
    );
    signUp.onclick = () => goToReg();
    form.wrapper.onsubmit = (e) => {
        e.preventDefault();
        userLogIn();
    };

    form.wrapper.classList.add("Form");
    content.append(form.wrapper);
    return form;
}

function feedOption() {
    let menu = {};
    menu.wrapper = document.createElement("div");
    menu.select = document.createElement("select");
    menu.optionA = document.createElement("option");
    menu.optionB = document.createElement("option");
    menu.optionA.textContent = "All";
    menu.optionB.textContent = "Following";
    menu.optionA.value = "All";
    menu.optionB.value = "Following";

    menu.select.append(menu.optionA, menu.optionB);
    menu.wrapper.append(menu.select);

    menu.select.addEventListener("change", toggleFeed);

    return menu.wrapper;
}

function toggleFeed(e) {
    feedPage.post.innerHTML = "";

    if (e.target.value == "Following") {
        console.log("Following ran");

        for (let i = 0; i < globalFeed.length; i++) {
            let feedNode = globalFeed[i];
            if (loggedInUser.subs.includes(feedNode.authorId)) {
                feedPage.post.prepend(feedNode.wrapper);
            } else {
                console.log("No content from followers");
            }
        }
    } else if (e.target.value == "All") {
        console.log("All ran");
        for (let i = 0; i < globalFeed.length; i++) {
            let feedNode = globalFeed[i];

            feedPage.post.prepend(feedNode.wrapper);
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

    feed.wrapper.append(feed.filter, feed.post);
    feed.wrapper.prepend(feed.createBtn);

    feed.createBtn.classList.add("createBtn");

    feed.createBtn.onclick = () => goToCreate();

    return feed;
}

function feedPageDraw() {
    for (let i = 0; i < globalFeed.length; i++) {
        let feedNode = globalFeed[i].wrapper;

        feedPage.post.prepend(feedNode);
    }
}

function authorConstruct(userObj) {
    let d = new Date();
    let author = { ...authorTemplate };
    author.wrapper = document.createElement("div");
    author.name = document.createElement("div");
    author.pfp = document.createElement("img");
    author.name.textContent = userObj.name;
    author.timestamp = document.createElement("p");
    author.timestamp.textContent = d.toLocaleString();
    author.pfp.src = userObj.pfp;

    author.pfp.onclick = () => profilePageView(userObj);
    author.name.onclick = () => profilePageView(userObj);

    // Append
    author.wrapper.append(author.pfp, author.name, author.timestamp);

    // CSS
    author.timestamp.classList.add("timestamp");
    author.pfp.classList.add("smallAvatar");
    author.wrapper.classList.add("author-wrapper");
    author.name.classList.add("cursorpointer");

    return author.wrapper;
}

function createPageConstruct() {
    let create = {};
    create.wrapper = document.createElement("form");

    create.textLabel = document.createElement("label");
    create.textLabel.textContent = "What's on your mind?";
    create.text = document.createElement("input");

    create.selectFile = document.createElement("input");
    create.selectFile.type = "file";

    create.comment = document.createElement("input");
    create.comment.placeholder = "Write a comment...";

    create.likes = document.createElement("p");
    create.likes.textContent = "❤️";

    create.submitBtn = document.createElement("button");
    create.submitBtn.textContent = "Post now";

    create.wrapper.append(
        create.textLabel,
        create.text,
        create.selectFile,
        create.submitBtn,
    );

    create.wrapper.onsubmit = (e) => {
        e.preventDefault();
        articleConstruct();
    };

    content.append(create.wrapper);
    create.wrapper.classList.add("createPage");

    return create;
}

function articleConstruct() {
    let authorBadge = authorConstruct(loggedInUser);
    let authorId = loggedInUser.id;

    let article = { ...articleTemplate };
    article.wrapper = document.createElement("div");
    article.text = document.createElement("h3");
    article.media = document.createElement("img");
    article.interact = document.createElement("div");
    article.likes = document.createElement("p");
    article.comment = document.createElement("p");

    article.text.textContent = createPage.text.value;
    article.likes.textContent = "❤️";

    article.authorId = authorId;

    article.interact.append(article.likes, article.comment);

    article.wrapper.append(
        authorBadge,
        article.text,
        article.media,
        article.interact,
    );
    // push data
    globalFeed.push(article);
    loggedInUser.posts.push(article);

    const fileInput = createPage.selectFile;
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            article.media.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
    } else {
        article.wrapper.removeChild(article.media);
    }

    article.wrapper.classList.add("feedArticle");
    article.media.classList.add("feedArticleMedia");
    feedPage.post.prepend(article.wrapper);
    createPage.wrapper.reset();
    currentPage = Pages.feedPage;
    updateView();

    console.log(article);
    return article;
}

function profilePageView(userObj) {
    currentPage = Pages.profilePage;
    const wrapper = Pages.profilePage;
    wrapper.innerHTML = "";
    profilePageConstruct(userObj, wrapper);
    updateView();
}

function profilePageConstruct(userObj, wrapper) {
    //has premade empty wrapper div and page (init)

    let profile = { ...profileTemplate };
    profile.pfp = document.createElement("img");
    profile.followBtn = document.createElement("button");
    profile.name = document.createElement("p");
    profile.age = document.createElement("p");
    profile.about = document.createElement("p");

    profile.settings = document.createElement("div");
    profile.settingsBtn = document.createElement("button");
    profile.settingsBtn.textContent = "⚙️";

    profile.editAbout = document.createElement("button");
    profile.pfpLoad = document.createElement("input");
    profile.pfpLoad.type = "file";

    profile.editPfp = document.createElement("label");

    profile.pfp.src = userObj.pfp;
    profile.followBtn.textContent = loggedInUser.subs.includes(userObj.id)
        ? "Unfollow"
        : "Follow";
    profile.name.textContent = "Name: " + userObj.name;
    profile.age.textContent = "Age: " + userObj.age;
    profile.about.textContent = userObj.about;
    profile.editPfp.textContent = "Change profile image";
    profile.editAbout.textContent = "Edit About";
    // settings wrapper
    profile.settings.append(profile.editPfp, profile.pfpLoad, profile.editAbout);

    // main wrapper
    wrapper.append(profile.settingsBtn, profile.settings, profile.pfp);
    if (!isMe) {
        wrapper.append(profile.followBtn);
    }
    wrapper.append(profile.name, profile.age, profile.about);
    if (!isMe(userObj)) {
        wrapper.removeChild(profile.settingsBtn);
        wrapper.removeChild(profile.settings);
        wrapper.append(profile.followBtn);
        profile.followBtn.addEventListener("click", (e) => follow(e, userObj));
    }

    profile.settingsBtn.addEventListener("click", () => {
        if (
            profile.settings.classList == "invisible"
                ? profile.settings.classList.remove("invisible")
                : profile.settings.classList.add("invisible")
        );
    });
    profile.pfpLoad.addEventListener("change", (e) =>
        newPfp(profile, userObj, e),
    );
    profile.editAbout.addEventListener("click", (e) => {
        editAbout(userObj);
    });

    profile.settings.classList.add("invisible");
    wrapper.classList.add("userProfile");
    profile.about.classList.add("about");
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
    mainHeader.myProf.textContent = "";

    mainHeader.logOut = document.createElement("button");
    mainHeader.logOut.textContent = "Log out";

    mainHeader.goToProf = document.createElement("button");
    mainHeader.goToProf.textContent = "My profile";

    mainHeader.wrapper.append(mainHeader.title, mainHeader.UI);
    mainHeader.UI.classList.add("headerUI");
    mainHeader.title.classList.add("stalkBook");

    mainHeader.title.onclick = () => clickTitle();

    header.append(mainHeader.wrapper);
    return mainHeader;
}

function userUIDraw() {
    headerMain.UI.append(
        headerMain.myProf,
        headerMain.logOut,
        headerMain.goToProf,
    );
    headerMain.logOut.addEventListener("click", userLogOut);
    headerMain.goToProf.addEventListener("click", myProfile);
}
