let headerMain;
let regPage;
let logInPage;
let feedPage;
let createPage;
let currentPage;

let isLoggedIn = false;
let loggedInUser;
let userIdCount = 6;
let globalFeed = [];
let Pages = {};

let headerObj = {};

let regFormTemplate = {
    header: {},
    mail: {},
    name: {},
    year: {},
    pw: {},
    pwr: {},
    tick: {},
    regBtn: {},
};

let logIn = {
    mail: {},
    pw: {},
    LoginBtn: {},
};

let userTemplate = {
    id: null,
    mail: "",
    pw: null,
    name: "",
    age: null,
    about: "Information about this user",
    pfp: "media/image/default_avatar.png",
    subs: [],
    posts: [],
};

let profileTemplate = {
    pfp: {},
    followBtn: {},
    name: {},
    age: {},
    about: {},
    editAbout: {},
    editPfp: {},
};

let articleTemplate = {
    articleId: null,
    authorId: null,
    text: {},
    img: {},
    likes: 0,
    comment: [],
};

let authorTemplate = {
    wrapper: {
        name: {},
        pfp: {},
    },
};

let feedTemplate = {
    wrapper: {
        filter: {},
        post: [],
    },
};
