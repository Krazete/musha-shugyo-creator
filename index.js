var card;
var cardType;
var cardData = {
    "bgDefault": undefined,
    "bgDefaultDragon": undefined,
    "bgUpload": undefined,
    "bg": undefined,
    "npDefault": undefined,
    "npDefaultDragon": undefined,
    "npUpload": undefined,
    "np": undefined,
    "ibDefaultChar": undefined,
    "ibDefaultArmor": undefined,
    "ibDefaultAgon": undefined,
    "ibUpload": undefined,
    "ib": undefined
};
var cardImage = {
    "bgDefault": undefined,
    "bgDefaultDragon": undefined,
    "bgUpload": undefined,
    "bg": undefined,
    "npDefault": undefined,
    "npDefaultDragon": undefined,
    "npUpload": undefined,
    "np": undefined,
    "ibDefaultChar": undefined,
    "ibDefaultArmor": undefined,
    "ibDefaultAgon": undefined,
    "ibUpload": undefined,
    "ib": undefined,
    "art": undefined,
    "name": undefined
};
var cardUpdater = {
    "bg": undefined,
    "np": undefined,
    "ib": undefined
};

var pq = 0.2; /* preview quality */
var rq = 1; /* render quality */
var m = 1; /* magnification */

/* Generic Functions */

var deeperHex = function () {
    function deeperHexSlice(hexslice, depth) {
        var n = parseInt(hexslice, 16);
        var value = Math.pow(n, depth) / Math.pow(16, 2 * (depth - 1));
        return Math.floor(value).toString(16).padStart(2, 0);
    }

    return function (hex, depth) {
        if (hex.length == 4 || hex.length == 5) {
            shortHex = hex;
            hex = "";
            for (var i = 0; i < shortHex.length; i++) {
                hex += shortHex.slice(i, i + 2);
            }
        }
        if (hex.length != 7 && hex.length != 9) {
            throw "Error: Invalid hexadecimal value.";
        }
        var r = deeperHexSlice(hex.slice(1, 3), depth);
        var g = deeperHexSlice(hex.slice(3, 5), depth);
        var b = deeperHexSlice(hex.slice(5, 7), depth);
        var a = hex.slice(7, 9);
        return "#" + r + g + b + a;
    };
}();

function dataLoop(data, f) { /* for ImageData objects */
    for (var y = 0; y < data.height; y++) {
        for (var x = 0; x < data.width; x++) {
            var i = 4 * (y * data.width + x);
            var r = data.data[i];
            var g = data.data[i + 1];
            var b = data.data[i + 2];
            var a = data.data[i + 3];
            f(i, r, g, b, a);
        }
    }
}

function newCanvas(width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

function newImage(src, callback) {
    var img = new Image();
    img.src = src;
    img.addEventListener("load", callback);
}

function getMouse(e) {
    e.preventDefault();
    if (e.touches) {
        return {
            "x": e.touches[0].clientX,
            "y": e.touches[0].clientY
        };
    }
    return e;
}

function getScaledMouse(e) {
    e = getMouse(e);
    return {
        "x": e.x / m,
        "y": e.y / m
    };
}

function getScaledRect(element) {
    var rect = element.getBoundingClientRect();
    var scaled = {};
    for (var id in rect) {
        scaled[id] = rect[id] / m;
    }
    return scaled;
}

function matchFont(element, context) {
    var style = getComputedStyle(element);
    var fontSize = style.fontSize.match(/(\d+(?:\.\d+)?)(\w+)/);
    context.font = rq *  fontSize[1] + fontSize[2] + " " + style.fontFamily;
    context.textAlign = style.textAlign;
    context.textBaseline = "middle";
}

/**/

function initColorInput(color0, color1, colorAuto, colorAutoChecked, depth, update) {
    var gradientCanvas = newCanvas(256, 1);
    var gradientContext = gradientCanvas.getContext("2d");

    function onChangeColor() {
        if (color0.value.length == 4 || color0.value.length == 7) {
            if (colorAuto.checked && depth) {
                color1.jscolor.fromString(deeperHex(color0.value, depth));
            }
            if (color1.value.length == 4 || color1.value.length == 7) {
                update(color0, color1);
            }
        }
    }

    function onInputColorAuto() {
        if (colorAuto.checked) {
            color1.setAttribute("disabled", true);
            if (!depth) {
                color1.jscolor.fromString("#000000");
            }
        }
        else {
            color1.removeAttribute("disabled");
        }
        onChangeColor();
    }

    color0.jscolor.onFineChange = onChangeColor;
    color1.jscolor.onFineChange = onChangeColor;

    colorAuto.addEventListener("input", onInputColorAuto);

    colorAuto.checked = colorAutoChecked;
    colorAuto.dispatchEvent(new InputEvent("input"));
}

function initCustomButton(custom, inputs, onUncheck, onCheck) {
    function onInputCustom() {
        if (custom.checked) {
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].removeAttribute("disabled");
                inputs[i].dispatchEvent(new InputEvent("input")); /* reclick auto */
            }
            onCheck();
        }
        else {
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute("disabled", true);
            }
            onUncheck();
        }
    }

    custom.addEventListener("input", onInputCustom);

    custom.checked = false;
    custom.dispatchEvent(new InputEvent("input"));
}

function initName() {
    var cardName = document.getElementById("card-name");
    var nameCanvas = document.getElementById("card-name-canvas");
    var nameContext = nameCanvas.getContext("2d");
    var nameColor0 = document.getElementById("name-color-0");
    var nameColor1 = document.getElementById("name-color-1");
    var nameColorAuto = document.getElementById("name-color-auto");
    var nameColorCustom = document.getElementById("name-color-custom");

    function onInputCardName() {
        nameContext.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
        nameContext.fillText(cardName.value, nameCanvas.width / 2, nameCanvas.height / 2);
    }

    function updateGradient(color0, color1) {
        var lg = nameContext.createLinearGradient(0, 0, 0, nameCanvas.height);
        lg.addColorStop(0, color0.value);
        lg.addColorStop(1, color1.value);
        nameContext.fillStyle = lg;
        onInputCardName();
    }

    function onUncheckColorCustom() {
        updateGradient({"value": "#ffca1a"}, {"value": "#fe6207"});
    }

    function onCheckColorCustom() {
        updateGradient(nameColor0, nameColor1);
    }

    var nameRect = cardName.getBoundingClientRect();
    nameCanvas.width = Math.round(rq *  nameRect.width);
    nameCanvas.height = Math.round(rq *  nameRect.height);

    matchFont(cardName, nameContext);

    cardName.addEventListener("input", onInputCardName);
    initColorInput(nameColor0, nameColor1, nameColorAuto, true, 3.7, updateGradient);
    initCustomButton(nameColorCustom, [nameColor0, nameColor1, nameColorAuto], onUncheckColorCustom, onCheckColorCustom);
}

function initFileInput(file, update) {
    function onInputFile() {
        if (this.files.length > 0) {
            var fp = this.files[0];
            if (/image\//.test(fp.type)) {
                var reader = new FileReader();
                reader.addEventListener("load", function() {
                    update(this.result);
                });
                reader.readAsDataURL(fp);
            }
        }
    }

    file.addEventListener("change", onInputFile);
    file.dispatchEvent(new InputEvent("change"));
}

function getDataID(code) {
    var file = document.getElementById(code + "-file");
    var fileCustom = document.getElementById(code + "-file-custom");
    var id = code;

    if (fileCustom.checked && file.files.length > 0) {
        id += "Upload";
    }
    else {
        id += "Default";
        if ((code == "bg" || code == "np") && cardType == "dragon") {
            id += "Dragon";
        }
        else if (code == "ib" && (cardType == "char" || cardType == "dragon")) {
            id += "Char";
        }
        else if (code == "ib" && cardType == "armor") {
            id += "Armor";
        }
        else if (code == "ib" && cardType == "agon") {
            id += "Agon";
        }
    }

    return id;
}

function initRecolorer(canvas, code, file, fileCustom, color0, color1, colorAuto, colorCustom) {
    var gradientCanvas = newCanvas(256, 1);
    var gradientContext = gradientCanvas.getContext("2d");
    var gradientData;
    var context = canvas.getContext("2d");

    function updateGradient(color0, color1) {
        var lg = gradientContext.createLinearGradient(0, 0, 256, 0);
        lg.addColorStop(1, color0.value);
        lg.addColorStop(0, color1.value);
        gradientContext.fillStyle = lg;
        gradientContext.fillRect(0, 0, 256, 1);
        gradientData = gradientContext.getImageData(0, 0, 256, 1);
    }

    function updateCanvas() {
        var id = getDataID(code);

        if (!cardData[id]) {
            return;
        }

        if (colorCustom.checked) {
            var newData = new ImageData(cardData[id].width, cardData[id].height);

            var dataMin = 255;
            var dataMax = 0;

            dataLoop(cardData[id], function (i, r, g, b, a) { /* to maximize contrast */
                var intensity = Math.floor((r + g + b) / 3);
                dataMin = Math.min(dataMin, intensity - 1);
                dataMax = Math.max(dataMax, intensity + 1);
            });
            dataMin = Math.max(0, dataMin);
            dataMax = Math.min(255, dataMax);

            dataLoop(cardData[id], function (i, r, g, b, a) {
                var intensity = Math.floor(((r + g + b) / 3 - dataMin) * 255 / (dataMax - dataMin));
                newData.data[i] = gradientData.data[4 * intensity];
                newData.data[i + 1] = gradientData.data[4 * intensity + 1];
                newData.data[i + 2] = gradientData.data[4 * intensity + 2];
                newData.data[i + 3] = a;
            });

            cardData[code] = newData;
        }
        else {
            cardData[code] = cardData[id];
            cardImage[code] = cardImage[id];
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.putImageData(cardData[code], 0, 0);
        newImage(canvas.toDataURL(), function () {
            cardImage[code] = this;
        });
    }

    function updateBackground(color0, color1) {
        updateGradient(color0, color1);
        updateCanvas();
    }

    function updateFile(dataURL) {
        newImage(dataURL, function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(this, 0, 0, canvas.width, canvas.height);
            cardData[code + "Upload"] = context.getImageData(0, 0, canvas.width, canvas.height);
            cardImage[code + "Upload"] = this;
            updateCanvas();
        });
    }

    function onInputColorCustom() {
        updateBackground(color0, color1);
    }

    initFileInput(file, updateFile);
    initColorInput(color0, color1, colorAuto, false, 37, updateBackground);
    initCustomButton(fileCustom, [file], updateCanvas, updateCanvas);
    initCustomButton(colorCustom, [color0, color1, colorAuto], onInputColorCustom, onInputColorCustom);

    cardUpdater[code] = updateCanvas;
}

function initRecolorers() {
    var bg = document.getElementById("card-bg");
    var bgFile = document.getElementById("bg-file");
    var bgFileCustom = document.getElementById("bg-file-custom");
    var bgColor0 = document.getElementById("bg-color-0");
    var bgColor1 = document.getElementById("bg-color-1");
    var bgColorAuto = document.getElementById("bg-color-auto");
    var bgColorCustom = document.getElementById("bg-color-custom");
    var np = document.getElementById("card-name-bg");
    var npFile = document.getElementById("np-file");
    var npFileCustom = document.getElementById("np-file-custom");
    var npColor0 = document.getElementById("np-color-0");
    var npColor1 = document.getElementById("np-color-1");
    var npColorAuto = document.getElementById("np-color-auto");
    var npColorCustom = document.getElementById("np-color-custom");
    var ib = document.getElementById("card-info-bg");
    var ibFile = document.getElementById("ib-file");
    var ibFileCustom = document.getElementById("ib-file-custom");
    var ibColor0 = document.getElementById("ib-color-0");
    var ibColor1 = document.getElementById("ib-color-1");
    var ibColorAuto = document.getElementById("ib-color-auto");
    var ibColorCustom = document.getElementById("ib-color-custom");

    function initCardData(canvas, id, src) {
        newImage(src, function () {
            var canvasCopy = newCanvas(canvas.width, canvas.height);
            var context = canvasCopy.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(this, 0, 0, canvas.width, canvas.height);
            cardData[id] = context.getImageData(0, 0, canvas.width, canvas.height);
            cardImage[id] = this;
            cardUpdater[id.slice(0, 2)]();
        });
    }

    initCardData(bg, "bgDefault", "img/bg/large/Background_01.jpg");
    initCardData(bg, "bgDefaultDragon", "img/bg/dragon/Background_10.jpg");
    initCardData(np, "npDefault", "img/Nome.png");
    initCardData(np, "npDefaultDragon", "img/NomeDragon.png");
    initCardData(ib, "ibDefaultChar", "img/Colonna.png");
    initCardData(ib, "ibDefaultArmor", "img/Armor.png");
    initCardData(ib, "ibDefaultAgon", "img/Agon.png");

    initRecolorer(bg, "bg", bgFile, bgFileCustom, bgColor0, bgColor1, bgColorAuto, bgColorCustom);
    initRecolorer(np, "np", npFile, npFileCustom, npColor0, npColor1, npColorAuto, npColorCustom);
    initRecolorer(ib, "ib", ibFile, ibFileCustom, ibColor0, ibColor1, ibColorAuto, ibColorCustom);
}

function initTypes() {
    var types = document.getElementById("types");
    var defaultType = document.getElementById("type-char");
    var ibTemplate = document.getElementById("ib-template");
    var ibTemplateURLs = { /* todo: make templates */
        "dragon": "template/Colonna.png",
        "char": "template/Colonna.png",
        "armor": "template/Armor.png",
        "agon": "template/Agon.png"
    };

    function onClickTypes(e) {
        if (e.target.tagName == "INPUT") {
            card.className = e.target.value;
            cardType = e.target.value;
            ibTemplate.href = ibTemplateURLs[e.target.value];
            cardUpdater.bg();
            cardUpdater.np();
            cardUpdater.ib();
        }
    }

    types.addEventListener("click", onClickTypes);
    defaultType.click();
}

function initHandle() {
    var cardSize = document.getElementById("card-size");
    var handle = document.getElementById("handle");
    var cardRect = card.getBoundingClientRect();
    var style = document.createElement("style");
    var e0, m1;

    function onHandleEnd(e) {
        style.remove();
        window.removeEventListener("mouseup", onHandleEnd);
        window.removeEventListener("mousemove", onHandle);
        window.removeEventListener("touchend", onHandleEnd);
        window.removeEventListener("touchmove", onHandle);
    }

    function onHandle(e) {
        e = getMouse(e);
        n = (e.x - cardRect.left - m * 15) / 756; /* +m*15 for border */
        m = Math.max(0.5, Math.min(n, 1));

        card.style.transform = "scale(" + m + ")";
        card.style.marginRight = (m - 1) * 776 + "px"; /* +20 for border */
        card.style.marginBottom = (m - 1) * 1154 + "px"; /* +20 for border */
        cardSize.innerHTML = Math.round(200 * m) + "%";
    }

    function onHandleStart(e) {
        document.body.appendChild(style);
        window.addEventListener("mouseup", onHandleEnd);
        window.addEventListener("mousemove", onHandle);
        window.addEventListener("touchend", onHandleEnd);
        window.addEventListener("touchmove", onHandle);
    }

    style.innerHTML = "html {cursor: ew-resize;} body {pointer-events: none;} #card-size {display: initial;}";

    handle.addEventListener("mousedown", onHandleStart);
    handle.addEventListener("touchstart", onHandleStart);
}

function initArt() {
    var artController = document.getElementById("card-art-controller");
    var art = document.getElementById("card-art");
    var circle = document.createElement("div");
    var style = document.createElement("style");
    var artFile = document.getElementById("art-file");
    var artPixel = document.getElementById("art-pixel");
    var artPosition = document.getElementById("art-position");
    var artWidth = document.getElementById("art-width");
    var artAngle = document.getElementById("art-angle");
    var artX = document.getElementById("art-x");
    var artY = document.getElementById("art-y");
    var artW = document.getElementById("art-w");
    var artA = document.getElementById("art-a");
    var mode, artRect0, e0, x0, y0, w0, a0;

    function onInputPixel() {
        if (artPixel.checked) {
            art.classList.add("pixel");
        }
        else {
            art.classList.remove("pixel");
        }
    }

    function onInputTransform() {
        mode = this.id.split("-")[1];
    }

    function bound(input, n) {
        return Math.max(input.min, Math.min(n, input.max));
    }

    function updateBounds() {
        var artControllerRect = getScaledRect(artController);
        var artRect1 = getScaledRect(art);
        artX.min = Math.floor(-artRect1.width / 2);
        artX.max = Math.ceil(artControllerRect.width + artRect1.width / 2);
        artY.min = Math.floor(-artRect1.height / 2);
        artY.max = Math.ceil(artControllerRect.height + artRect1.height / 2);

        artX.dispatchEvent(new InputEvent("input"));
        artY.dispatchEvent(new InputEvent("input"));
    }

    function onInputArt(dataURL) {
        art.src = dataURL;
        art.addEventListener("load", updateBounds);
    }

    function onInputArtX() {
        this.value = bound(this, this.value);
        art.style.left = this.value + "px";
    }

    function onInputArtY() {
        this.value = bound(this, this.value);
        art.style.top = 1134 - this.value + "px";
    }

    function onInputArtW() {
        art.style.width = this.value + "px";
        updateBounds();
    }

    function onInputArtA() {
        this.value = Number(this.value).toFixed(3).replace(/\.?0+$/, "");
        art.style.transform = "translate(-50%, -50%) rotate(" + -this.value + "deg)";
        updateBounds();
    }

    function distance(p0, p1) {
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function angle(p0, p1) {
        var theta = Math.atan((p0.y - p1.y) / (p1.x - p0.x));
        return 180 * theta / Math.PI - 180 * (p1.x < p0.x);
    }

    function updateCircle(x, y, r, a) {
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        circle.style.width = 2 * r + "px";
        circle.style.height = 2 * r + "px";
        if (a) {
            circle.style.borderWidth = "1px 5px 1px 0";
            circle.style.transform = "translate(-50%, -50%) rotate(" + -a + "deg)";
        }
        else {
            circle.style.transform = "translate(-50%, -50%)";
        }
    }

    function onControlEnd(e) {
        circle.removeAttribute("style");
        circle.remove();
        style.remove();
        window.removeEventListener("mouseup", onControlEnd);
        window.removeEventListener("mousemove", onControl);
        window.removeEventListener("touchend", onControlEnd);
        window.removeEventListener("touchmove", onControl);
    }

    function onControl(e) {
        e1 = getScaledMouse(e);
        if (mode == "position") {
            var dx = e1.x - e0.x;
            var dy = e1.y - e0.y;
            artX.value = Math.round(x0 + dx);
            artY.value = Math.round(y0 - dy);

            artX.dispatchEvent(new InputEvent("input"));
            artY.dispatchEvent(new InputEvent("input"));
            updateCircle(artX.value, 1134 - artY.value, 100);
        }
        else if (mode == "width") {
            var r0 = distance(artCenter, e0);
            var r1 = distance(artCenter, e1);
            var w1 = artRect0.width * r1 / r0;
            artW.value = Math.max(1, Math.round(w1));

            artW.dispatchEvent(new InputEvent("input"));
            updateCircle(x0, 1134 - y0, r1);
        }
        else if (mode == "angle") {
            var t0 = angle(artCenter, e0);
            var t1 = angle(artCenter, e1);
            var dt = t1 - t0;

            var min = Number(artA.min);
            var max = Number(artA.max);
            var dm = artA.max - artA.min;
            artA.value = ((a0 + dt - min) % dm + dm) % dm + min;

            artA.dispatchEvent(new InputEvent("input"));
            updateCircle(x0, 1134 - y0, 100, t1);
        }
    }

    function onControlStart(e) {
        e0 = getScaledMouse(e);
        x0 = Number(artX.value);
        y0 = Number(artY.value);
        w0 = Number(artW.value);
        a0 = Number(artA.value);

        var savedTransform = art.style.transform;
        art.style.transform = "";
        artRect0 = getScaledRect(art);
        art.style.transform = savedTransform;
        artCenter = {
            "x": Math.round((artRect0.left + artRect0.right) / 2),
            "y": Math.round((artRect0.top + artRect0.bottom) / 2)
        };
        updateBounds();

        updateCircle(x0, 1134 - y0, 0);
        artController.appendChild(circle);
        document.body.appendChild(style);
        window.addEventListener("mouseup", onControlEnd);
        window.addEventListener("mousemove", onControl);
        window.addEventListener("touchend", onControlEnd);
        window.addEventListener("touchmove", onControl);
    }

    updateBounds();
    circle.id = "circle";
    style.innerHTML = "html {cursor: move;} body {pointer-events: none;}";

    initFileInput(artFile, onInputArt);
    artPixel.addEventListener("input", onInputPixel);

    artPosition.addEventListener("input", onInputTransform);
    artWidth.addEventListener("input", onInputTransform);
    artAngle.addEventListener("input", onInputTransform);

    artX.addEventListener("input", onInputArtX);
    artY.addEventListener("input", onInputArtY);
    artW.addEventListener("input", onInputArtW);
    artA.addEventListener("input", onInputArtA);

    artController.addEventListener("mousedown", onControlStart);
    artController.addEventListener("touchstart", onControlStart);

    artPixel.checked = false;
    artPosition.checked = true;
    artPosition.dispatchEvent(new InputEvent("input"));
    artX.dispatchEvent(new InputEvent("input"));
    artY.dispatchEvent(new InputEvent("input"));
    artW.dispatchEvent(new InputEvent("input"));
    artA.dispatchEvent(new InputEvent("input"));

    cardImage.art = art;
}

function initStats() {
    var stat = document.getElementById("info-stat");
    var statArmor = document.getElementById("info-stat-armor");

    function onOverStat(e) {
        if (e.target.classList.contains("fake-radio")) {
            for (var sibling of e.target.parentElement.children) {
                sibling.classList.add("prospective");
                if (sibling == e.target) {
                    break;
                }
            }
        }
    }

    function onOutStat(e) {
        if (e.target.classList.contains("fake-radio")) {
            for (var sibling of e.target.parentElement.children) {
                sibling.classList.remove("prospective");
                if (sibling == e.target) {
                    break;
                }
            }
        }
    }

    function onClickStat(e) {
        if (e.target.classList.contains("fake-radio")) {
            var check = !e.target.classList.contains("chosen");
            for (var sibling of e.target.parentElement.children) {
                if (check) {
                    sibling.classList.add("checked");
                }
                else {
                    sibling.classList.remove("checked");
                }
                sibling.classList.remove("chosen");
                if (sibling == e.target) {
                    if (check) {
                        sibling.classList.add("chosen");
                    }
                    check = false;
                }
            }
        }
    }

    function initStat(stat) {
        stat.addEventListener("mouseover", onOverStat);
        stat.addEventListener("mouseout", onOutStat);
        stat.addEventListener("click", onClickStat);
    }

    initStat(stat);
    initStat(statArmor);
}

function initTexts() {
    var pas = document.getElementsByClassName("move-pa");
    var bonuses = document.getElementsByClassName("move-bonus");

    function autoresize() {
        var context = newCanvas(0, 0).getContext("2d");
        var style = getComputedStyle(this);
        context.font = style.fontSize + " " + style.fontFamily;

        var textSize = context.measureText(this.value);
        this.style.width = Math.max(50, textSize.width + 10) + "px";
    }

    for (var i = 0; i < pas.length; i++) {
        pas[i].addEventListener("input", autoresize);
    }
    for (var i = 0; i < bonuses.length; i++) {
        bonuses[i].addEventListener("input", autoresize);
    }
}

function initInfo() {
    initStats();
    initTexts();
}

function renderCard() {
    var canvas = document.getElementById("card-canvas");
    var context = canvas.getContext("2d");
    var render = document.getElementById("card-render");

    var cardRect = getScaledRect(card);
    var inputs = card.getElementsByTagName("input");

    function renderImage(code, element) {
        var style = getComputedStyle(element);
        context.drawImage(
            cardImage[code],
            rq *  parseFloat(style.left),
            rq *  parseFloat(style.top),
            rq *  parseFloat(style.width),
            rq *  parseFloat(style.height)
        );
    }

    function renderArt() {
        var pattern = /-?\d+(\.\d+)?(e-?\d+)?(px|%)?/g;
        var style = getComputedStyle(cardImage.art);
        var matrix = style.transform.match(pattern) || [
            1, 0, 0,
            1, 0, 0
        ];
        var a = parseFloat(matrix[0]);
        var b = parseFloat(matrix[1]);
        var c = parseFloat(matrix[2]);
        var d = parseFloat(matrix[3]);
        var e = rq *  parseFloat(matrix[4]);
        var f = rq *  parseFloat(matrix[5]);
        var origin = style.transformOrigin.match(pattern) || [
            parseFloat(style.width) / 2,
            parseFloat(style.height) / 2
        ];
        var x0 = rq *  (parseFloat(style.left) + parseFloat(origin[0]));
        var y0 = rq *  (parseFloat(style.top) + parseFloat(origin[1]));

        context.save();
        if (style.imageRendering == "pixelated" || style.imageRendering == "crisp-edges") {
            context.imageSmoothingEnabled = false;
        }
        context.translate(x0, y0);
        context.transform(a, b, c, d, e, f);
        context.translate(-x0, -y0);
        renderImage("art", cardImage.art);
        context.restore();
    }

    function renderName() {
        var cardName = document.getElementById("card-name");
        var color0 = document.getElementById("name-color-0");
        var color1 = document.getElementById("name-color-1");

        var style = getComputedStyle(cardName);
        var lg = context.createLinearGradient(
            0, rq *  parseFloat(style.top),
            0, rq *  (parseFloat(style.top) + parseFloat(style.height))
        );

        context.save();
        matchFont(cardName, context);
        lg.addColorStop(0, color0.value);
        lg.addColorStop(1, color1.value);
        context.fillStyle = lg;
        context.fillText(
            cardName.value,
            rq *  (parseFloat(style.left) + parseFloat(style.width) / 2),
            rq *  (parseFloat(style.top) + parseFloat(style.height) / 2)
        );
        context.restore();
    }

    function renderText(element) {
        var rect = getScaledRect(element);

        context.save();
        matchFont(element, context);
        context.fillText(
            element.value,
            rq *  (rect.left - cardRect.left - 10),
            rq *  (rect.top + rect.height / 2 - cardRect.top - 10)
        );
        context.restore();
    }

    function renderCheckbox(element) {
        var rect = getScaledRect(element.parentElement);

        context.save();
        context.lineWidth = rq *  2;
        context.beginPath();
        context.arc(
            rq *  (rect.left + rect.width / 2 - cardRect.left - 10),
            rq *  (rect.top + rect.height / 2 - cardRect.top - 10),
            rq *  (rect.width / 2 - 3),
            0,
            2 * Math.PI
        );
        if (element.parentElement.classList.contains("click")) {
            context.fill();
        }
        context.stroke();
        context.restore();
    }

    canvas.width = rq *  756;
    canvas.height = rq *  1134;

    renderImage("bg", document.getElementById("card-bg"));
    renderArt();
    renderImage("np", document.getElementById("card-name-bg"));
    renderImage("ib", document.getElementById("card-info-bg"));
    renderName();
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.type == "text" && input.id != "card-name" && isVisible(input)) {
            renderText(input);
        }
        else if (input.type == "checkbox" && isVisible(input.parentElement)) {
            renderCheckbox(input);
        }
    }

    render.src = canvas.toDataURL();
}

function isVisible(element) {
    if (element == card) {
        return true;
    }
    var style = getComputedStyle(element);
    return style.display != "none" && style.visibility != "hidden" && isVisible(element.parentElement);
}

function initExport() {
    var exportPNG = document.getElementById("export-png");
    var exportPDF = document.getElementById("export-pdf");
    var exportJSON = document.getElementById("export-json");

    function createPNG() {
        renderCard();
    }

    function createPDF() {
        createPNG();
    }

    function createJSON() {
        var inputData = [];
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "radio" || inputs[i].type == "checkbox") {
                inputData.push(inputs[i].checked);
            }
            else if (inputs[i].type == "text" || inputs[i].type == "number") {
                inputData.push(inputs[i].value);
            }
            else {
                inputData.push(undefined);
            }
        }
        console.log(JSON.stringify(inputData));
    }

    exportPNG.addEventListener("click", createPNG);
    exportPDF.addEventListener("click", createPDF);
    exportJSON.addEventListener("click", createJSON);
}

function warn(e) {
    e.preventDefault();
    e.returnValue = "Changes you made may not be saved.";
    return e.returnValue;
}

function init() {
    var pqMatch = location.search.match(/[\?&]pq=(\d+(?:\.\d+)?)/);
    var rqMatch = location.search.match(/[\?&]rq=(\d+(?:\.\d+)?)/);
    if (pqMatch) {
        pq = Math.max(0.0625, Math.min(parseFloat(pqMatch[1]), 4)); /* todo: lower */
    }
    if (rqMatch) {
        rq = Math.max(0.0625, Math.min(parseFloat(rqMatch[1]), 4)); /* todo: raise */
    }

    card = document.getElementById("card");

    initRecolorers();
    initName();
    initTypes();

    initHandle();
    initArt();

    initInfo();

    initExport();
}

window.addEventListener("load", init);
window.addEventListener("beforeprint", renderCard);
// window.addEventListener("beforeunload", warn);
