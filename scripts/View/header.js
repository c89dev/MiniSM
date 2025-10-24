
    function headerConstruct() {
    const header = document.getElementById("headerDiv");
    
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
    console.log("Header target:", header, "Wrapper to append:", mainHeader.wrapper);
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
