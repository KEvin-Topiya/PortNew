let body = document.querySelector("#mbody")
let currentSlide = 0;
let dots=document.querySelectorAll('.dot')
console.log(dots)
function slide(x) {
    remdot()
    const totalSlides = body.children.length;
    currentSlide += x;
    if (currentSlide <= totalSlides-1 && currentSlide>=0) {
        body.style.transform = `translateX(${-currentSlide * 100}vw)`;
        dots[currentSlide].classList.add("ddot")
    }else{
        currentSlide-=x;
        
    }
}
function setslide(x){
    currentSlide=0;
    slide(x)
    // console.log(currentSlide)
}

function remdot(){

    dots.forEach(e => {
        e.classList.remove("ddot")
    });

}