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
    var cardTypeOptions = document.getElementById("variations");
    cardTypeOptions.addEventListener("click", onCardTypeOptionsClick, true);
    cardTypeOptions.children[0].click();
}

/* Moniker */

window.addEventListener("touchstart", function (e) {
    console.log(e);
    document.body.click();
});

var moniker;

function onMonikerInput(e) {
    var topp = document.getElementById("moniker-color-top");
    var bott = document.getElementById("moniker-color-bottom");
    topp.jscolor.onFineChange = onMonikerInput;
    bott.jscolor.onFineChange = onMonikerInput;

    var gradient = monikerContext.createLinearGradient(0, 0, 0, monikerContext.canvas.height);
    gradient.addColorStop(0, topp.value);
    gradient.addColorStop(1, bott.value);
    monikerContext.fillStyle = gradient;

    monikerContext.clearRect(0, 0, monikerContext.canvas.width, monikerContext.canvas.height);
    monikerContext.fillText(moniker.value, monikerContext.canvas.width/devicePixelRatio, monikerContext.canvas.height/devicePixelRatio);
}

function initMoniker() {
    moniker = document.getElementById("moniker");
    var monikerBox = moniker.getBoundingClientRect();

    var monikerCanvas = document.getElementById("moniker-canvas");
    monikerCanvas.width = monikerBox.width * window.devicePixelRatio;
    monikerCanvas.height = monikerBox.height * window.devicePixelRatio;

    monikerContext = monikerCanvas.getContext("2d");
    monikerContext.textAlign = "center";
    monikerContext.textBaseline = "middle";
    monikerContext.font = "112px Regular";

    moniker.addEventListener("input", onMonikerInput);
}

function onBGInput() {
    if (bgbg.complete) {
        bgContext.drawImage(bgbg, 0, 0, 756, 1134);
        var imageData = bgContext.getImageData(0, 0, 756, 1134);
        for (var i = 0; i < 1134 * 756; i++) {
                var r = imageData.data[4 * i];
                var g = imageData.data[4 * i + 1];
                var b = imageData.data[4 * i + 2];
                var intensity = Math.floor((r + g + b) / 3);
                var a = imageData.data[4 * i + 3];
                imageData.data[4 * i] = intensity * parseInt(toppbg.value.slice(1, 3), 16);
                imageData.data[4 * i + 1] = intensity * parseInt(toppbg.value.slice(3, 5), 16);
                imageData.data[4 * i + 2] = intensity * parseInt(toppbg.value.slice(5, 7), 16);
                imageData.data[4 * i + 3] = a;
        }
        bgContext.putImageData(imageData, 0, 0);
        document.body.appendChild(bgCanvas);
    }
    else {
        requestAnimationFrame(onBGInput);
    }
}

var toppbg, bottbg;

function initBG() {
    bgbg = document.getElementById("bgbg");

    toppbg = document.getElementById("bg-color-hi");
    bottbg = document.getElementById("bg-color-lo");
    toppbg.jscolor.onFineChange = onBGInput;
    bottbg.jscolor.onFineChange = onBGInput;

    card = document.getElementById("card");
    var cardBox = card.getBoundingClientRect();

    bgCanvas = document.createElement("canvas");
    bgCanvas.width = 756;
    bgCanvas.height = 1134;
    bgContext = bgCanvas.getContext("2d");
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
    var cardBox = card.getBoundingClientRect();
    var cardCanvas = document.getElementById("card-canvas");
    cardCanvas.width = cardBox.width;
    cardCanvas.height = cardBox.height;
    cardContext = cardCanvas.getContext("2d");

    var stat = document.getElementById("stat");
    var armorstat = document.getElementById("armorstat");
    initCardTypeInput();
    initMoniker();
    initBG();
    initStat(stat);
    initStat(armorstat);
}

window.addEventListener("load", init);
window.addEventListener("beforeprint", renderCard);
