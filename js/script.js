// Responsive top menu
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

// Links with arrow to the right
const arrowRightLink = document.querySelectorAll("arrow-link");
const arrowRight = document.querySelectorAll("arrow-right");

for (var i = 0; i < arrowRightLink.length; i++) {
    console.log(arrowRight);
    arrowRightLink[i].addEventListener("mouseover", function () {
        arrowRight[i].style.transform = "translateX(10px)";
        arrowRight[i].style.transition = "0.2s ease-in-out";
    })
    arrowRightLink[i].addEventListener("mouseout", function () {
        arrowRight[i].style.transform = "translateX(0)";
    })
}