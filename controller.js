function feedFilter(showFollowing) {
    if (showFollowing) { sortByFollowing = true; updateView(); }
    else if (!showFollowing) { sortByFollowing = false; updateView(); }
}