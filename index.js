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

function renderNome(e) {
}

function getImageDataFromImage(image, w, h) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    if (w && h) {
        canvas.width = w;
        canvas.height = h;
        context.drawImage(image, 0, 0, w, h);
    }
    else {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText(name, 748, 100);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

function changeName(name) {
	canvas = document.getElementById("nome").getElementsByTagName("canvas")[0];
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText(name, 748, 100);
}

function statHover(e) {
    if (e.target.tagName == "LABEL") {
        for (var child of e.target.parentElement.children) {
            child.classList.add("hover");
            if (child == e.target) {
                break;
            }
        }
    }
}

function statHoverNo(e) {
    if (e.target.tagName == "LABEL") {
        for (var child of e.target.parentElement.children) {
            child.classList.remove("hover");
        }
    }
}

function initStat() {
    stat.addEventListener("mouseover", statHover);
    stat.addEventListener("mouseout", statHoverNo);
}

function renderCard() {
    var canvas = document.getElementById("card-render");
    var context = canvas.getContext("2d");

    canvas.width = 756;
    canvas.height = 1134;

    context.putImage
}

function onCardTypeOptionsClick(e) {
    if (e.target.tagName == "INPUT") {
        card.className = e.target.value;
    }
}

function initCardTypeInput() {
    var cardTypeOptions = document.getElementById("card-type-options");
    cardTypeOptions.addEventListener("click", onCardTypeOptionsClick, true);
    cardTypeOptions.children[0].click();
}

function init() {
    cardRender = document.getElementById("card-render");
    card = document.getElementById("card");
    stat = document.getElementById("stat");
    initCardTypeInput();
    initStat();
}

window.addEventListener("load", init);
window.addEventListener("beforeprint", renderCard);
