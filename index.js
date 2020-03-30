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
    "ib": undefined,
    "artURL": undefined
};
var cardImage = {
    "bgDefault": new Image(),
    "bgDefaultDragon": new Image(),
    "bgUpload": new Image(),
    "bg": new Image(),
    "npDefault": new Image(),
    "npDefaultDragon": new Image(),
    "npUpload": new Image(),
    "np": new Image(),
    "ibDefaultChar": new Image(),
    "ibDefaultArmor": new Image(),
    "ibDefaultAgon": new Image(),
    "ibUpload": new Image(),
    "ib": new Image(),
    "artURL": new Image()
};
var cardUpdater = {
    "bg": undefined,
    "np": undefined,
    "ib": undefined
};

var q = 2; /* canvas quality */
var m = 1; /* card scale */

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

    colorAuto.checked = !colorAutoChecked;
    colorAuto.addEventListener("input", onInputColorAuto);
    colorAuto.click();
}

function initCustomButton(custom, inputs, ignore, onUncheck, onCheck) {
    function onInputCustom() {
        if (custom.checked) {
            for (var i = 0; i < inputs.length; i++) {
                if (!ignore || ignore(inputs, i)) {
                    inputs[i].removeAttribute("disabled");
                }
            }
            onCheck(inputs);
        }
        else {
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute("disabled", true);
            }
            onUncheck(inputs);
        }
    }

    custom.checked = true;
    custom.addEventListener("input", onInputCustom);
    custom.click();
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

    function ignoreColor1(inputs, i) {
        if (i == 1 && inputs[2].checked) {
            return false;
        }
        return true;
    }

    function onUncheckColorCustom(inputs) {
        updateGradient({"value": "#ffca1a"}, {"value": "#fe6207"});
    }

    function onCheckColorCustom(inputs) {
        updateGradient(nameColor0, nameColor1);
    }

    var nameRect = cardName.getBoundingClientRect();
    nameCanvas.width = Math.round(q * nameRect.width);
    nameCanvas.height = Math.round(q * nameRect.height);

    var nameStyle = getComputedStyle(cardName);
    var fontSize = nameStyle.fontSize.match(/(\d+(?:\.\d+)?)(\w+)/);
    nameContext.font = q * fontSize[1] + fontSize[2] + " " + nameStyle.fontFamily;
    nameContext.textAlign = nameStyle.textAlign;
    nameContext.textBaseline = "middle";

    cardName.addEventListener("input", onInputCardName);
    initColorInput(nameColor0, nameColor1, nameColorAuto, true, 3.7, updateGradient);
    initCustomButton(nameColorCustom, [nameColor0, nameColor1, nameColorAuto], ignoreColor1, onUncheckColorCustom, onCheckColorCustom);
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

    file.addEventListener("input", onInputFile);
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
        var id = code + "Default";
        if (fileCustom.checked && file.files.length > 0) {
            id = code + "Upload";
        }
        else if ((code == "bg" || code == "np") && cardType == "dragon") {
            id += "Dragon";
        }
        else if (code == "ib") {
            if (cardType == "char" || cardType == "dragon") {
                id += "Char";
            }
            else if (cardType == "armor") {
                id += "Armor";
            }
            else if (cardType == "agon") {
                id += "Agon";
            }
        }

        if (!cardData[id]) {
            return;
        }

        if (colorCustom.checked) {
            var newData = new ImageData(cardData[id].width, cardData[id].height);

            var dataMin = 255;
            var dataMax = 0;

            dataLoop(cardData[id], function (i, r, g, b, a) { /* to maximize contrast */
                var intensity = Math.floor((r + g + b) / 3);
                dataMin = Math.min(dataMin, intensity);
                dataMax = Math.max(dataMax, intensity);
            });

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
        cardImage[code] = canvas.toDataURL();
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

    function ignoreColor1(inputs, i) {
        if (i == 1 && inputs[2].checked) {
            return false;
        }
        return true;
    }

    function onInputColorCustom(inputs) {
        updateBackground(inputs[0], inputs[1]);
    }

    initFileInput(file, updateFile);
    initColorInput(color0, color1, colorAuto, false, 37, updateBackground);
    initCustomButton(fileCustom, [file], undefined, updateCanvas, updateCanvas);
    initCustomButton(colorCustom, [color0, color1, colorAuto], ignoreColor1, onInputColorCustom, onInputColorCustom);

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
        var canvas = newCanvas(canvas.width, canvas.height);
        var context = canvas.getContext("2d");

        newImage(src, function () {
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
        "char": "img/Colonna.png",
        "armor": "img/Armor.png",
        "agon": "img/Agon.png"
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

function getScaledRect(element, n) {
    var rect = element.getBoundingClientRect();
    var scaled = {};
    for (var id in rect) {
        scaled[id] = n * rect[id];
    }
    return scaled;
}

function getScaledMouse(e, n) {
    if (e.touches) {
        e.preventDefault();
        return {
            "x": n * e.touches[0].clientX,
            "y": n * e.touches[0].clientY
        };
    }
    return {
        "x": n * e.x,
        "y": n * e.y,
    };
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
        e = getScaledMouse(e, 1);
        n = (e.x - cardRect.left - m * 10) / 756; /* m * 10 for border */
        m = Math.max(0.5, Math.min(n, 1));

        card.style.transform = "scale(" + m + ")";
        card.style.marginRight = (m - 1) * 756 + "px";
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
    var cardArtController = document.getElementById("card-art-controller");
    var cardArt = document.getElementById("card-art");
    var cardArtRect0;
    var art = document.getElementById("art");
    var artPosition = document.getElementById("art-position");
    var artWidth = document.getElementById("art-width");
    var artAngle = document.getElementById("art-angle");
    var artX = document.getElementById("art-x");
    var artY = document.getElementById("art-y");
    var artW = document.getElementById("art-w");
    var artA = document.getElementById("art-a");
    var style = document.createElement("style");
    var circle = document.createElement("div");
    var mode;
    var e0, x0, y0, w0, a0;

    function bound(input, n) {
        return Math.max(input.min, Math.min(n, input.max));
    }

    function updateBounds() {
        var cardArtControllerRect = getScaledRect(cardArtController, 1 / m);
        var cardArtRect1 = getScaledRect(cardArt, 1 / m);
        artX.min = Math.floor(-cardArtRect1.width / 2);
        artX.max = Math.ceil(cardArtControllerRect.width + cardArtRect1.width / 2);
        artY.min = Math.floor(-cardArtRect1.height / 2);
        artY.max = Math.ceil(cardArtControllerRect.height + cardArtRect1.height / 2);

        artX.dispatchEvent(new InputEvent("input"));
        artY.dispatchEvent(new InputEvent("input"));
    }

    function onInputArt(dataURL) {
        cardArt.src = dataURL;
        cardArt.addEventListener("load", updateBounds)
        cardData.artURL = dataURL;
    }

    function onInputArtX() {
        this.value = bound(this, this.value);
        cardArt.style.left = this.value + "px";
    }

    function onInputArtY() {
        this.value = bound(this, this.value);
        cardArt.style.top = 1134 - this.value + "px";
    }

    function onInputArtW() {
        cardArt.style.width = this.value + "px";
        updateBounds();
    }

    function onInputArtA() {
        this.value = Number(this.value).toFixed(3).replace(/\.?0+$/, "");
        cardArt.style.transform = "translate(-50%, -50%) rotate(" + -this.value + "deg)";
        updateBounds();
    }

    function onInputTransform() {
        mode = this.id.split("-")[1];
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
        e1 = getScaledMouse(e, 1 / m);
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
            var r0 = distance(cardArtCenter, e0);
            var r1 = distance(cardArtCenter, e1);
            var w1 = cardArtRect0.width * r1 / r0;
            artW.value = Math.max(1, Math.round(w1));

            artW.dispatchEvent(new InputEvent("input"));
            updateCircle(x0, 1134 - y0, r1);
        }
        else if (mode == "angle") {
            var t0 = angle(cardArtCenter, e0);
            var t1 = angle(cardArtCenter, e1);
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
        e0 = getScaledMouse(e, 1 / m);
        x0 = Number(artX.value);
        y0 = Number(artY.value);
        w0 = Number(artW.value);
        a0 = Number(artA.value);

        var savedTransform = cardArt.style.transform;
        cardArt.style.transform = "";
        cardArtRect0 = getScaledRect(cardArt, 1 / m);
        cardArt.style.transform = savedTransform;
        cardArtCenter = {
            "x": Math.round((cardArtRect0.left + cardArtRect0.right) / 2),
            "y": Math.round((cardArtRect0.top + cardArtRect0.bottom) / 2)
        };
        updateBounds();

        updateCircle(x0, 1134 - y0, 0);
        cardArtController.appendChild(circle);
        document.body.appendChild(style);
        window.addEventListener("mouseup", onControlEnd);
        window.addEventListener("mousemove", onControl);
        window.addEventListener("touchend", onControlEnd);
        window.addEventListener("touchmove", onControl);
    }

    updateBounds();
    circle.id = "circle";
    style.innerHTML = "html {cursor: move;} body {pointer-events: none;}";

    initFileInput(art, onInputArt);

    artX.addEventListener("input", onInputArtX);
    artY.addEventListener("input", onInputArtY);
    artW.addEventListener("input", onInputArtW);
    artA.addEventListener("input", onInputArtA);

    artPosition.addEventListener("input", onInputTransform);
    artWidth.addEventListener("input", onInputTransform);
    artAngle.addEventListener("input", onInputTransform);

    cardArtController.addEventListener("mousedown", onControlStart);
    cardArtController.addEventListener("touchstart", onControlStart);

    artPosition.checked = false;
    artPosition.click();
}

function initStats() {
    var stat = document.getElementById("info-stat");
    var statArmor = document.getElementById("info-stat-armor");

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

    initStat(stat);
    initStat(statArmor);
}

function initInfo() {
    initStats();
}

function renderCard() {
    var cardRender = document.getElementById("card-render");

    var canvas = newCanvas(756, 1134);
    var context = canvas.getContext("2d");

    function putImage(code, x, y) {
        context.drawImage(cardImage[code], x, y, x + cardData[code].width, y + cardData[code].height);
    }

    putImage("bgDefault", 0, 0);
    putImage("npDefault", 10, 10);
    putImage("ibDefaultChar", 20, 20);

    cardRender.src = canvas.toDataURL();
}

function initExport() {
    var exportPNG = document.getElementById("export-png");
    var exportPDF = document.getElementById("export-pdf");
    var exportJSON = document.getElementById("export-json");

    function createPNG() {
        renderCard();
    }

    function createPDF() {
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
