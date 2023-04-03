type documentElement = HTMLElement | null;

interface scrollSection {
    scrollIntoView: (options?: ScrollIntoViewOptions) => void
}

const navBar = <documentElement>document.getElementById("navbar");
const backToTopBtn = <documentElement>document.getElementById("backToTopBtn");

let prevScrollpos: number = window.pageYOffset;
window.onscroll = function (): void {
    if (navBar === null || backToTopBtn === null) return

    let currentScrollpos: number = window.pageYOffset;
    if (prevScrollpos > currentScrollpos)
        navBar.style.top = "0";
    else
        navBar.style.top = "-65px";
    prevScrollpos = currentScrollpos

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function scrollToSection(ele: scrollSection): void {
    ele.scrollIntoView({ behavior: 'smooth' });
}

if (backToTopBtn != null) {
    backToTopBtn.addEventListener("click", function (): void {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}