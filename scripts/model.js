const header = document.getElementById("header");
const content = document.getElementById("content");
let isLoggedIn = false;
let loggedInUser;
let userIdCount = 6;
let filteredUsers = [];



// let Pages = {
//     welcomePage: welcomePage,
//     registrationPage: regPage.wrapper,
//     feedPage: feedPage.wrapper,
//     profilePage: logInPage.wrapper,
// };
let Pages = {}

let currentPage;

let headerObj = {
    wrapper: {
        title: {},
        myProf: {},
    }
}

let regFormTemplate = {
    wrapper: {
        header: {},
        mail: {},
        name: {},
        year: {},
        pw: {},
        tick: {},
        regBtn: {},
    }
}

let logIn = {
    wrapper: {
        mail: {},
        pw: {},
        LoginBtn: {},
    }
}

let userTemplate = {
    id: null,
    mail: '',
    pw: null,
    name: '',
    age: null,
    pfp: "media/image/default_avatar.png",
    subs: [],
    youFollow: false,
}

let profileTemplate = {
    wrapper: {
        pfp: {},
        followBtn: {},
        name: {},
        age: {},
        about: {},
        editAbout: {},
        editPfp: {},
    }
}

let postTemplate = {
    wrapper: {
        title: {},
        img: {},
        descr: {},
    },
}

let authorTemplate = {
    wrapper: {
        name: {},
        pfp: {},
    }
}

let feedTemplate = {
    wrapper: {
        filter: {},
        post: {
            author: {},
            content: {},
        },
    }
}

let articleTemp = {
    wrapper: {
        post: {
            author: {},
            content: {},
        },
    }
}

let usersRegistered = [
    {
        id: 0,
        mail: 'steezus@sb.com',
        pw: '123',
        name: 'Steezus Christ',
        age: 34,
        pfp: "media/image/steezus_avatar.png",
        subs: [],
        youFollow: false,
    },
    {
        id: 1,
        mail: 'otto@telehor.no',
        pw: '1337',
        name: 'Otto Von Vittu',
        age: 87,
        pfp: "media/image/otto_avatar.png",
        subs: [],
        youFollow: false,
    },
    {
        id: 2,
        mail: '',
        pw: null,
        name: 'Martha Lindgren',
        age: 25,
        pfp: "media/image/cat_avatar.png",
        subs: [],
        youFollow: false,
    },
    {
        id: 3,
        mail: '',
        pw: null,
        name: 'Bill Myers',
        age: 63,
        pfp: "media/image/default_avatar.png",
        subs: [],
        youFollow: false,
    },
    {
        id: 4,
        mail: '',
        pw: null,
        name: 'Cassandra Vargas',
        age: 21,
        pfp: "media/image/cass_avatar.png",
        subs: [],
        youFollow: true,
    },
    {
        id: 5,
        mail: '1',
        pw: 2,
        name: 'Tester_01',
        age: 21,
        pfp: "media/image/default_avatar.png",
        youFollow: true,
        subs: [],
    },
]
