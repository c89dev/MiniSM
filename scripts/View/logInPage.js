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
