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

    form.mail.required = true;
    form.name.required = true;
    form.pw.required = true;

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
        form.year.append(option);
    }

    form.wrapper.onsubmit = (e) => {
        e.preventDefault();
        registerNewUser();
    }

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
        signUp
    );
    signUp.onclick = () => goToReg();
    form.wrapper.onsubmit = (e) => {
        e.preventDefault();
        userLogIn();
    }

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
    feedPage.post.innerHTML = '';

    if (e.target.value == 'Following') {
        console.log("Following ran");

        for (let i = 0; i < globalFeed.length; i++) {
            let feedNode = globalFeed[i];
            if (loggedInUser.subs.includes(feedNode.authorId)) {
                feedPage.post.prepend(feedNode.wrapper);
            }
            else { console.log("No content from followers") }
        }
    }
    else if (e.target.value == 'All') {
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

    feed.wrapper.append(feed.filter, feed.createBtn, feed.post);

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

    create.wrapper.onsubmit = (e) => {
        e.preventDefault();
        articleConstruct();
    }

    content.append(create.wrapper);
    create.wrapper.classList.add("createPage");

    return create;
}

function articleConstruct() {
    let authorBadge = authorConstruct(loggedInUser);
    let authorId = loggedInUser.id;

    const fileInput = createPage.selectFile;
    const selectedFile = fileInput.files[0];

    let article = { ...postTemplate };
    article.wrapper = document.createElement("div");
    article.title = document.createElement("h3")
    article.media = document.createElement("img");
    article.descr = document.createElement("p");
    article.likes = document.createElement("p");

    article.title.textContent = createPage.title.value;

    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            article.media.src = e.target.result;
        }
        reader.readAsDataURL(selectedFile);
    }
    else { article.media.src = null }

    article.descr.textContent = createPage.descr.value;
    article.likes.textContent = "👍"

    article.authorId = authorId;
    article.wrapper.append(

        authorBadge,
        article.title,
        article.media,
        article.likes,
        article.descr);
    // push data
    globalFeed.push(article);
    loggedInUser.posts.push(article);

    article.wrapper.classList.add("feedArticle")
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

    profile.settings = document.createElement("div");
    profile.settingsBtn = document.createElement("button");
    profile.settingsBtn.textContent = "⚙️"

    profile.editAbout = document.createElement("button");
    profile.pfpLoad = document.createElement("input");
    profile.pfpLoad.type = "file";

    profile.editPfp = document.createElement("label");

    profile.pfp.src = userObj.pfp;
    profile.followBtn.textContent = loggedInUser.subs.includes(userObj.id) ? "Unfollow" : "Follow";
    profile.name.textContent = "Name: " + userObj.name;
    profile.age.textContent = "Age: " + userObj.age;
    profile.about.textContent = "Here's some interesting information about me";
    profile.editPfp.textContent = "Change profile image";
    profile.editAbout.textContent = "Edit About";
    // settings wrapper
    profile.settings.append(
        profile.editPfp,
        profile.pfpLoad,
        // profile.editAbout,
    );

    // main wrapper
    wrapper.append(
        profile.settingsBtn,
        profile.settings,
        profile.pfp);
        if(!isMe){ wrapper.append(profile.followBtn)}
    wrapper.append(    
        profile.name,
        profile.age,
        profile.about,
    );
    if (!isMe(userObj)) {
        console.log("This is not me")
        
        wrapper.removeChild(profile.settingsBtn)
        wrapper.removeChild(profile.settings)
        wrapper.append(profile.followBtn);
        profile.followBtn.addEventListener("click", (e) => follow(e, userObj));
    }
    
    profile.pfpLoad.addEventListener("change", (e) => newPfp(profile, userObj, e));
    
    profile.settingsBtn.addEventListener("click", () => {
        if (profile.settings.classList == "invisible" 
            ? profile.settings.classList.remove("invisible")
            : profile.settings.classList.add("invisible")
        );
    });
    
    profile.settings.classList.add("invisible");
    wrapper.classList.add("userProfile")
    content.append(wrapper);
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
    mainHeader.goToProf = document.createElement("button");
    mainHeader.goToProf.textContent = "My profile";

    mainHeader.wrapper.append(
        mainHeader.title,
        mainHeader.UI
    );
    mainHeader.UI.classList.add("headerUI");

    mainHeader.title.onclick = () => clickTitle();

    header.append(mainHeader.wrapper);
    return mainHeader;
}

function userUIDraw() {
    headerMain.UI.append(headerMain.myProf, headerMain.logOut, headerMain.goToProf);
    headerMain.logOut.addEventListener("click", userLogOut);
    headerMain.goToProf.addEventListener("click", myProfile);
}








