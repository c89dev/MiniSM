function updateView() {
    for (let el of Object.values(Pages)) {
        el.classList.add("invisible");
    }
    currentPage.classList.remove("invisible");
}