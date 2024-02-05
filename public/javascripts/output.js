var tl = gsap.timeline();
tl.to("#one", {
    left: "0%",
    ease: Power2,
    duration: 2
},"a");
tl.to('body', {
    opacity: 1,
    // backgroundColor:"#fff",
    duration: 2.5,
    z:'10%',
    ease: Power2
},"a")