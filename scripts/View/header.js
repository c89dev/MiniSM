function headerConstruct() {

    let header = { ...headerObj };
    header.wrapper = document.createElement("div");
    header.UI = document.createElement("div");

    header.title = document.createElement("h1");
    header.title.textContent = "StalkBook";

    header.myProf = document.createElement("label");
    header.myProf.textContent = "";

    header.logOut = document.createElement("button");
    header.logOut.textContent = "Log out";

    header.goToProf = document.createElement("button");
    header.goToProf.textContent = "My profile";

    header.wrapper.append(header.title, header.UI);
    header.UI.classList.add("headerUI");
    header.title.classList.add("cursorpointer");

    header.title.onclick = () => clickTitle();

    headerDiv.append(header.wrapper);
    return header;
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
