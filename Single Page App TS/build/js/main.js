"use strict";
const navBar = document.getElementById("navbar");
const backToTopBtn = document.getElementById("backToTopBtn");
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    if (navBar === null || backToTopBtn === null)
        return;
    //NavBar scroll effect
    let currentScrollpos = window.pageYOffset;
    if (prevScrollpos > currentScrollpos)
        navBar.style.top = "0";
    else
        navBar.style.top = "-55px";
    prevScrollpos = currentScrollpos;
    // Back to top button toggle effect
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    }
    else {
        backToTopBtn.style.display = "none";
    }
};
function scrollToSection(ele) {
    ele.scrollIntoView({ behavior: 'smooth' });
}
if (backToTopBtn != null) {
    backToTopBtn.addEventListener("click", function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}
