const topBar = document.querySelector("#top-bar");
const topNav = document.querySelector("#top-nav");
const toggleMenu = document.querySelector("#toggle-menu");


toggleMenu.addEventListener("click", function () {
    console.log("test");
    if (topBar.className === "top-bar") {
        topBar.classList.toggle("top-bar-responsive");
    } else {
        topBar.classList.remove("top-bar-responsive");
    }
    if (topNav.className === "top-nav") {
        topNav.classList.toggle("top-nav-responsive");
    } else {
        topNav.classList.remove("top-nav-responsive");
    }
});