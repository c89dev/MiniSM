const app = document.getElementById("app");
let sortByFollowing = false;


let Pages = { 
    welcomePage: 'welcomePage',
    registrationPage : 'registrationPage', 
    feedPage: 'feedPage', 
    profilePage: 'profilePage',};

let currentPage = Pages.welcomePage;

let usersRegistered = [

    {
    name: 'Steezus',
    age: '34',
    pfp: 'nicedog',
    youFollow: false,
    },
    {
    name: 'Otto',
    age: '87',
    pfp: 'none',
    youFollow: true,
    },
    {
    name: 'Martha',
    age: '25',
    pfp: 'cats',
    youFollow: false,
    },
    {
    name: 'Bill',
    age: '63',
    pfp: 'landscape',
    youFollow: false,
    },
    {
    name: 'Cassandra',
    age: '41',
    pfp: 'ball',
    youFollow: false,
    },
]

// let viewProfile{
    
// }