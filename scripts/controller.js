function feedFilter(showFollowing) {
    if (showFollowing) { sortByFollowing = true; updateView(); }
    else if (!showFollowing) { sortByFollowing = false; updateView(); }
}

function registerNewUser() {

}

function toggleFollow(bool) {
    let followBtn = document.getElementById("followBtn");

    if (currentViewUser.youFollow == true) {
        currentViewUser.youFollow = false;
        followBtn.textContent = "Follow";
        console.log("Unfollowed");
    }
    else if (currentViewUser.youFollow == false) {
        currentViewUser.youFollow = true;
        followBtn.textContent = "Unfollow";
        console.log("Following");
    }
}

// Check for what to display on profile button
function checkFollow(user) {
    if (user.youFollow == true) {
        return 'Unfollow';
    }
    else if (user.youFollow == false) {
        return 'Follow';
    }
}