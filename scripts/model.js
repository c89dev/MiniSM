const header = document.getElementById("header");
const content = document.getElementById("content");
let currentViewUser;
let userIdCount = 5;
let sortByFollowing = false;
let filteredUsers = [];


let Pages = { 
    welcomePage: 'welcomePage',
    registrationPage : 'registrationPage', 
    feedPage: 'feedPage', 
    profilePage: 'profilePage',};

let currentPage = Pages.registrationPage;

let usersRegistered = [

    {
    id: '0',
    name: 'Steezus',
    age: '34',
    pfp: "media/image/steezus_avatar.png",
    youFollow: false,
    },
    {
    id: '1',
    name: 'Otto',
    age: '87',
    pfp: "media/image/otto_avatar.png",
    youFollow: false,
    },
    {
    id: '2',
    name: 'Martha',
    age: '25',
    pfp: "media/image/cat_avatar.png",
    youFollow: false,
    },
    {
    id: '3',
    name: 'Bill',
    age: '63',
    pfp: "media/image/default_avatar.png",
    youFollow: false,
    },
    {
    id: '4',
    name: 'Cassandra',
    age: '21',
    pfp: "media/image/cass_avatar.png",
    youFollow: false,
    },
]
