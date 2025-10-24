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
let Pages = {}

let headerObj = {
    wrapper: {
        title: {},
        UI: {
            myProf: {},
            goToProf: {},
            logOut: {},
        }
    }
}

let regFormTemplate = {
    wrapper: {
        header: {},
        mail: {},
        name: {},
        year: {},
        pw: {},
        pwr: {},
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
    about: 'Information about this user',
    pfp: "media/image/default_avatar.png",
    subs: [],
    posts: [],
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

let articleTemplate = {
    wrapper: {
        authorId: null,
        text: {},
        img: {},
        interact: {
            likes: 0,
            comment: {},
        }
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
        post: [],
    }
}

let usersRegistered = [
    {
        id: 0,
        mail: 'steezus@sb.com',
        pw: '123',
        name: 'Steezus Christ',
        age: 34,
        about: 'Something interesting',
        pfp: "media/image/steezus_avatar.png",
        subs: [], // subscriptions
        posts: [],
    },
    {
        id: 1,
        mail: 'otto@telehor.no',
        pw: '1337',
        name: 'Otto Von Vittu',
        age: 87,
        about: 'Something interesting',
        pfp: "media/image/otto_avatar.png",
        subs: [],
        posts: [],
    },
    {
        id: 2,
        mail: 'martha@sb.com',
        pw: 123,
        name: 'Martha Lindgren',
        age: 25,
        about: 'Something interesting',
        pfp: "media/image/cat_avatar.png",
        subs: [],
        posts: [],
    },
    {
        id: 3,
        mail: '',
        pw: null,
        name: 'Bill Myers',
        age: 63,
        about: 'Something interesting',
        pfp: "media/image/default_avatar.png",
        subs: [],
        posts: [],
    },
    {
        id: 4,
        mail: '',
        pw: null,
        name: 'Cassandra Vargas',
        age: 21,
        about: 'Something interesting',
        pfp: "media/image/cass_avatar.png",
        subs: [],
        posts: [],
    },
    {
        id: 5,
        mail: '1',
        pw: 2,
        name: 'Tester_01',
        age: 21,
        about: 'Something interesting',
        pfp: "media/image/default_avatar.png",
        subs: [],
        posts: [],
    },
]

