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
