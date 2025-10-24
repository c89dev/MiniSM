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

function profilePageView(userObj) {
    currentPage = Pages.profilePage;
    const wrapper = Pages.profilePage;
    wrapper.innerHTML = "";
    profilePageConstruct(userObj, wrapper);
    updateView();
}
