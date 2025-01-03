let body = document.querySelector("#mbody")
let currentSlide = 0;
let dots = document.querySelectorAll('.dot')
function slide(x) {
    remdot()
    const totalSlides = body.children.length;
    currentSlide += x;
    if (currentSlide <= totalSlides - 1 && currentSlide >= 0) {
        body.style.transform = `translateX(${-currentSlide * 100}vw)`;
    } else {
        currentSlide -= x;
    }
    dots[currentSlide].classList.add("ddot")
}
function setslide(x) {
    currentSlide = 0;
    slide(x)
}

function remdot() {

    dots.forEach(e => {
        e.classList.remove("ddot")
    });

}

//certigficate
function showimg(e) {
    var simg = document.querySelector('.showimg')
    simg.style.display = "flex";
    simg.querySelector("img").src = e.src

    simg.querySelector('.cls').onclick = function () {
        simg.style.display = "none";
    }
}
