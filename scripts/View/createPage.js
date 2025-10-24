function createPageConstruct() {
    let create = {};
    create.wrapper = document.createElement("form");

    create.textLabel = document.createElement("label");
    create.textLabel.textContent = "What's on your mind?";
    create.text = document.createElement("input");

    create.selectFile = document.createElement("input");
    create.selectFile.type = "file";

    create.comment = document.createElement("input");
    create.comment.placeholder = "Write a comment...";

    create.likes = document.createElement("p");
    create.likes.textContent = "❤️";

    create.submitBtn = document.createElement("button");
    create.submitBtn.textContent = "Post now";

    create.wrapper.append(
        create.textLabel,
        create.text,
        create.selectFile,
        create.submitBtn,
    );

    create.wrapper.onsubmit = (e) => {
        e.preventDefault();
        articleConstruct();
    };

    content.append(create.wrapper);
    create.wrapper.classList.add("createPage");

    return create;
}
