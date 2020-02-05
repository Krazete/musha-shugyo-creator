var card, scale;

var size = {
    "pageHeight": 1134,
    "pageWidth": 756,
    "radio": 12,
    "radioBorder": 2
}

function onScale(e) {
    var value = e.target.value;
    card.style.width = 10 * parseInt(value) + "px";
    card.style.height = 15 * parseInt(value) + "px";
}

function init() {
    card = document.getElementById("card");
    scale = document.getElementById("scale");

    scale.addEventListener("input", onScale);
}

window.addEventListener("load", init);
