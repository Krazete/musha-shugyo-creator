var card;
var data = {}; /* todo */

var deeperHex = function() {
    function deeperSubHex(subhex, d) {
        var c = parseInt(subhex, 16);
        var value = Math.floor(Math.pow(c, d) / Math.pow(16, 2 * (d - 1)));
        return value.toString(16).padStart(2, 0);
    }

    return function(hex, d) {
        var r = deeperSubHex(hex.slice(1, 3), d);
        var g = deeperSubHex(hex.slice(3, 5), d);
        var b = deeperSubHex(hex.slice(5, 7), d);
        return "#" + r + g + b;
    };
}();

function initTypes() {
    var types = document.getElementById("types");
    var defaultType = document.getElementById("type-char");

    function onClickTypes(e) {
        if (e.target.tagName == "INPUT") {
            card.className = e.target.value;
        }
    }

    types.addEventListener("click", onClickTypes);
    defaultType.click();
}

function initName() {
    var cardName = document.getElementById("card-name");
    var cardNameRect = cardName.getBoundingClientRect();
    var cardNameCanvas = document.getElementById("card-name-canvas");
    var nameContext = cardNameCanvas.getContext("2d");
    var nameColor0 = document.getElementById("name-color-0");
    var nameColor1 = document.getElementById("name-color-1");
    var nameColorAuto = document.getElementById("name-color-auto");

    function onInputCardName() {
        var w = cardNameCanvas.width / devicePixelRatio;
        var h = cardNameCanvas.height / devicePixelRatio;
        nameContext.clearRect(0, 0, cardNameCanvas.width, cardNameCanvas.height);
        nameContext.fillText(cardName.value, w, h);
    }

    function onChangeNameColor() {
        var nameGradient = nameContext.createLinearGradient(0, 0, 0, cardNameCanvas.height);

        if (nameColorAuto.checked) {
            nameColor1.jscolor.fromString(deeperHex(nameColor0.value, 3.7));
        }

        nameGradient.addColorStop(0, nameColor0.value);
        nameGradient.addColorStop(1, nameColor1.value);
        nameContext.fillStyle = nameGradient;
        onInputCardName();
    }

    cardNameCanvas.width = Math.round(cardNameRect.width * devicePixelRatio);
    cardNameCanvas.height = Math.round(cardNameRect.height * devicePixelRatio);

    nameContext.textAlign = "center";
    nameContext.textBaseline = "middle";
    nameContext.font = "112px Regular"; /* todo: getComputedStyle */
    onChangeNameColor();

    cardName.addEventListener("input", onInputCardName);
    nameColor0.jscolor.onFineChange = onChangeNameColor;
    nameColor1.jscolor.onFineChange = onChangeNameColor;
}

/**/

/* Name Color */

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

/* Moniker */

window.addEventListener("touchstart", function (e) {
    console.log(e);
    document.body.click();
});

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

function beforeOnBGInput() {
    var gradientline = document;
    var glcontext = gradientline.context;
    glcontext.drawLine(0, 0, 1, 256);
    colorstop.add(toppbg.value);
    colorstop.add(bottbg.value);
    onBGInput();
}

var toppbg, bottbg;

function initBG() {
    bgbg = document.getElementById("bgbg");

    toppbg = document.getElementById("bg-color-hi");
    bottbg = document.getElementById("bg-color-lo");
    toppbg.jscolor.onFineChange = beforeOnBGInput;
    bottbg.jscolor.onFineChange = beforeOnBGInput;

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

    initTypes();
    initName();
    initStat();

    /**/

    var cardBox = card.getBoundingClientRect();
    var cardCanvas = document.getElementById("card-canvas");
    cardCanvas.width = cardBox.width;
    cardCanvas.height = cardBox.height;
    cardContext = cardCanvas.getContext("2d");

    var stat = document.getElementById("stat");
    var armorstat = document.getElementById("armorstat");

    initMoniker();
    initBG();
    initStat(stat);
    initStat(armorstat);
}

window.addEventListener("load", init);
window.addEventListener("beforeprint", renderCard);
