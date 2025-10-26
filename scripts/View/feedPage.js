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

    feed.wrapper.classList.add("feed");
    return feed;
}

function feedPageDraw() {
    for (let i = 0; i < globalFeed.length; i++) {
        let feedNode = globalFeed[i].wrapper;

        feedPage.post.prepend(feedNode);
    }
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
