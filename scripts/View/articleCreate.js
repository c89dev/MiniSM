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
