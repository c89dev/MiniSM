const navBar = document.getElementById("navBar");
const app = document.getElementById("app");
let sortByFollowing = false;

// brukere legges til i array av objects

let Pages = { 
    welcomePage: 'welcomePage',
    registrationPage : 'registrationPage', 
    feedPage: 'feedPage', 
    profilePage: 'profilePage',};

let currentPage = Pages.feedPage;

let usersRegistered = [

    {
    name: 'Steezus',
    age: '34',
    pfp: "media/image/default_avatar.png",
    youFollow: false,
    },
    {
    name: 'Otto',
    age: '87',
    pfp: "media/image/default_avatar.png",
    youFollow: true,
    },
    {
    name: 'Martha',
    age: '25',
    pfp: "media/image/default_avatar.png",
    youFollow: false,
    },
    {
    name: 'Bill',
    age: '63',
    pfp: "media/image/default_avatar.png",
    youFollow: false,
    },
    {
    name: 'Cassandra',
    age: '41',
    pfp: "media/image/default_avatar.png",
    youFollow: false,
    },
]

// let viewProfile{
    
// }