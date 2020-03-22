var card;
var data = {
    "bg": "img/bg/large/Background_01.jpg"
}; /* todo */

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

function initColorInput(color0, color1, colorAuto, f) {
    var deeperHex = function() {
        function deeperSubHex(subhex, d) {
            var c = parseInt(subhex, 16);
            var value = Math.floor(Math.pow(c, d) / Math.pow(16, 2 * (d - 1)));
            return value.toString(16).padStart(2, 0);
        }

        return function(hex, d) {
            if (hex.length == 4) {
                shortHex = hex;
                hex = "";
                for (var i = 0; i < shortHex.length; i++) {
                    hex += shortHex.slice(i, i + 2);
                }
            }
            var r = deeperSubHex(hex.slice(1, 3), d);
            var g = deeperSubHex(hex.slice(3, 5), d);
            var b = deeperSubHex(hex.slice(5, 7), d);
            return "#" + r + g + b;
        };
    }();

    function onChangeColor() {
        if (color0.value.length == 4 || color0.value.length == 7) {
            if (colorAuto.checked) {
                color1.jscolor.fromString(deeperHex(color0.value, 3.7));
            }
            if (color1.value.length == 4 || color1.value.length == 7) {
                f(color0, color1);
            }
        }
    }

    function onInputColorAuto() {
        if (colorAuto.checked) {
            color1.setAttribute("disabled", true);
        }
        else {
            color1.removeAttribute("disabled");
        }
        onChangeColor();
    }

    color0.jscolor.onFineChange = onChangeColor;
    color1.jscolor.onFineChange = onChangeColor;
    colorAuto.addEventListener("input", onInputColorAuto);

    colorAuto.checked = false;
    colorAuto.click();
}

function initBackground() {
    var gradientCanvas = document.getElementById("gradient-canvas");
    var gradientContext = gradientCanvas.getContext("2d");
    var bgCanvas = document.getElementById("bg-canvas");
    var bgContext = bgCanvas.getContext("2d");
    var bgColor0 = document.getElementById("bg-color-0");
    var bgColor1 = document.getElementById("bg-color-1");
    var bgColorAuto = document.getElementById("bg-color-auto");
    var bgColorNone = document.getElementById("bg-color-none");

    if (bgColorNone.checked) { /* todo */
        return;
    }

    function updateBG(color0, color1) {
    }

    initColorInput(bgColor0, bgColor1, bgColorAuto, updateBG);
}

function initName() {
    var cardName = document.getElementById("card-name");
    var nameRect = cardName.getBoundingClientRect();
    var nameCanvas = document.getElementById("card-name-canvas");
    var nameContext = nameCanvas.getContext("2d");
    var nameColor0 = document.getElementById("name-color-0");
    var nameColor1 = document.getElementById("name-color-1");
    var nameColorAuto = document.getElementById("name-color-auto");

    function onInputCardName() {
        var w = nameCanvas.width / devicePixelRatio;
        var h = nameCanvas.height / devicePixelRatio;
        nameContext.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
        nameContext.fillText(cardName.value, w, h);
    }

    function updateGradient(color0, color1) {
        var nameGradient = nameContext.createLinearGradient(0, 0, 0, nameCanvas.height);
        nameGradient.addColorStop(0, color0.value);
        nameGradient.addColorStop(1, color1.value);
        nameContext.fillStyle = nameGradient;
        onInputCardName();
    }

    nameCanvas.width = Math.round(nameRect.width * devicePixelRatio);
    nameCanvas.height = Math.round(nameRect.height * devicePixelRatio);

    nameContext.textAlign = "center";
    nameContext.textBaseline = "middle";
    nameContext.font = "112px Regular"; /* todo: getComputedStyle */

    cardName.addEventListener("input", onInputCardName);

    initColorInput(nameColor0, nameColor1, nameColorAuto, updateGradient);
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

function onOverStat(e) {
    if (e.target.tagName == "LABEL") {
        for (var child of e.target.parentElement.children) {
            child.classList.add("over");
            if (child == e.target) {
                break;
            }
        }
    }
}

function onOutStat(e) {
    if (e.target.tagName == "LABEL") {
        for (var child of e.target.parentElement.children) {
            child.classList.remove("over");
            if (child == e.target) {
                break;
            }
        }
    }
}

function onClickStat(e) {
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
    stat.addEventListener("mouseover", onOverStat);
    stat.addEventListener("mouseout", onOutStat);
    stat.addEventListener("click", onClickStat);
}

function initInfo() {
    var stat = document.getElementById("info-stat");
    var statArmor = document.getElementById("info-stat-armor");

    initStat(stat);
    initStat(statArmor);
}

function init() {
    card = document.getElementById("card");

    initTypes();
    initBackground();
    initName();
    initInfo();

    /**/

    var cardBox = card.getBoundingClientRect();
    var cardCanvas = document.getElementById("card-canvas");
    cardCanvas.width = cardBox.width;
    cardCanvas.height = cardBox.height;
    cardContext = cardCanvas.getContext("2d");
}

window.addEventListener("load", init);
window.addEventListener("beforeprint", renderCard);
