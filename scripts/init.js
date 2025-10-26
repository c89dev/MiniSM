
function init() {
const content = document.getElementById("content");
const header = document.getElementById("headerDiv");

headerMain = headerConstruct();

regPage = regFormConstruct();
Pages.regPage = regPage.wrapper;

logInPage = logInFormConstruct();
Pages.logInPage = logInPage.wrapper;

feedPage = feedPageConstruct();
Pages.feedPage = feedPage.wrapper;

createPage = createPageConstruct();
Pages.createPage = createPage.wrapper;

content.append(feedPage.wrapper);

Pages.profilePage = document.createElement("div");
content.append(Pages.profilePage);

currentPage = Pages.logInPage;
updateView();
}









