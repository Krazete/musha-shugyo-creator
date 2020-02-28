var card;

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
	canvas = document.getElementById("name").getElementsByTagName("canvas")[0];
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText(name, 748, 100);
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

/* Moniker */

function onMonikerInput(e) {
    var topp = document.getElementById("moniker-color-top");
    var bott = document.getElementById("moniker-color-bottom");

    var gradient = monikerContext.createLinearGradient(0, 0, 0, monikerContext.canvas.height);
    gradient.addColorStop(0, "#" + topp.value);
    gradient.addColorStop(1, "#" + bott.value);

    monikerContext.clearRect(0, 0, monikerContext.canvas.width, monikerContext.canvas.height);
    monikerContext.textAlign = "center";
    monikerContext.textBaseline = "middle";
    monikerContext.font = "56px Regular";
    monikerContext.fillStyle = gradient;
    monikerContext.fillText(e.target.value, monikerContext.canvas.width/2, monikerContext.canvas.height/2);
}

function initMoniker() {
    var moniker = document.getElementById("moniker");
    moniker.addEventListener("input", onMonikerInput);
}

/* Stat (Radio Buttons) */

var stats = {
    "ra": 0,
    "at": 0,
    "de": 0,
    "vo": 0,
    "eq": 0,
    "st": 0,
    "da": 0
}

function onStatOver(e) {
    if (e.target.tagName == "LABEL") {
        for (var child of e.target.parentElement.children) {
            child.classList.add("over");
            if (child == e.target) {
                break;
            }
        }
    }
}

function onStatOut(e) {
    if (e.target.tagName == "LABEL") {
        for (var child of e.target.parentElement.children) {
            child.classList.remove("over");
            if (child == e.target) {
                break;
            }
        }
    }
}

function onStatClick(e) {
    if (e.target.tagName == "LABEL") {
        var fill = !e.target.classList.contains("selected");
        for (var child of e.target.parentElement.children) {
            if (fill) {
                child.classList.add("click");
            }
            else {
                child.classList.remove("click");
            }
            child.classList.remove("selected");
            if (child == e.target) {
                if (fill) {
                    child.classList.add("selected");
                }
                fill = false;
            }
        }
    }
}

function initStat(stat) {
    stat.addEventListener("mouseover", onStatOver);
    stat.addEventListener("mouseout", onStatOut);
    stat.addEventListener("click", onStatClick);
}

function init() {
    card = document.getElementById("card");
    moniker = document.getElementById("moniker");
    var cardBox = card.getBoundingClientRect();
    var monikerBox = moniker.getBoundingClientRect();
    var cardCanvas = document.getElementById("card-canvas");
    var monikerCanvas = document.getElementById("moniker-canvas");
    cardCanvas.width = cardBox.width;
    cardCanvas.height = cardBox.height;
    monikerCanvas.width = monikerBox.width;
    monikerCanvas.height = monikerBox.height;
    cardContext = cardCanvas.getContext("2d");
    monikerContext = monikerCanvas.getContext("2d");

    var stat = document.getElementById("stat");
    var armorstat = document.getElementById("armorstat");
    initCardTypeInput();
    initMoniker();
    initStat(stat);
    initStat(armorstat);
}

window.addEventListener("load", init);
window.addEventListener("beforeprint", renderCard);
