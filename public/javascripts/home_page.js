function loadingAnimation() {
    var tl = gsap.timeline();
tl.to("#loader", {
    opacity: 0,
    duration: 1,
    ease: Power2,
    delay: 3.5,
    zIndex:"-1"
},"a");
tl.to("#loader h3:nth-child(1)", {
    opacity: 1,
    duration: 1,
    ease: Power2,
    delay:0.5
},"a");
tl.from("#loader h3:nth-child(1)", {
    opacity: 0,
    duration: 1,
    ease: Power3,
    delay:1.5
},"a");
tl.to("#loader h3:nth-child(2)", {
    opacity: 1,
    duration: 1,
    ease: Power2,
    delay:1.5
},"a");
tl.from("#loader h3:nth-child(2)", {
    opacity: 0,
    duration: 1,
    ease: Power3,
    delay:2.5
},"a");
tl.to("#loader h3:nth-child(3)", {
    opacity: 1,
    duration: 1,
    ease: Power2,
    delay:2.5
},"a");
tl.from("#loader h3:nth-child(3)", {
    opacity: 0,
    duration: 1,
    ease: Power3,
    delay:3.5
},"a");
}
loadingAnimation();