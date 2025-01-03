
//certigficate
function showimg(e) {
    var simg = document.querySelector('.showimg')
    simg.style.display = "flex";
    simg.querySelector("img").src = e.src

    simg.querySelector('.cls').onclick = function () {
        simg.style.display = "none";
    }
}
