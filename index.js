var card;
var cardData = { /* todo */
    "bgDefault": undefined,
    "bgUpload": undefined,
    "bg": undefined,
    "npDefault": undefined,
    "npUpload": undefined,
    "np": undefined,
    "ibDefaultChar": undefined,
    "ibDefaultArmor": undefined,
    "ibDefaultAgon": undefined,
    "ibUpload": undefined,
    "ib": undefined,
    "artURL": undefined
};

var updateInfoboxBackground;

function initColorInput(color0, color, colorAuto, autoOn, depth, update) {
    var gradientCanvas = newCanvas(256, 1);
    var gradientContext = gradientCanvas.getContext("2d");

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
            if (colorAuto.checked && depth) {
                color.jscolor.fromString(deeperHex(color0.value, depth));
            }
            if (color.value.length == 4 || color.value.length == 7) {
                update(color0, color);
            }
        }
    }

    function onInputColorAuto() {
        if (colorAuto.checked) {
            color.setAttribute("disabled", true);
            if (!depth) {
                color.jscolor.fromString("#000000");
            }
        }
        else {
            color.removeAttribute("disabled");
        }
        onChangeColor();
    }

    color0.jscolor.onFineChange = onChangeColor;
    color.jscolor.onFineChange = onChangeColor;

    colorAuto.checked = !autoOn;
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
    var nameRect = cardName.getBoundingClientRect();
    var nameCanvas = document.getElementById("card-name-canvas");
    var nameContext = nameCanvas.getContext("2d");
    var nameColor0 = document.getElementById("name-color-0");
    var nameColor = document.getElementById("name-color-1");
    var nameColorAuto = document.getElementById("name-color-auto");
    var nameColorCustom = document.getElementById("name-color-custom");
    var m = 2; /* devicePixelRatio */

    function onInputCardName() {
        nameContext.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
        nameContext.fillText(cardName.value, nameCanvas.width / 2, nameCanvas.height / 2);
    }

    function updateGradient(color0, color) {
        var lg = nameContext.createLinearGradient(0, 0, 0, nameCanvas.height);
        lg.addColorStop(0, color0.value);
        lg.addColorStop(1, color.value);
        nameContext.fillStyle = lg;
        onInputCardName();
    }

    function ignoreColor(inputs, i) {
        if (i == 1 && inputs[2].checked) {
            return false;
        }
        return true;
    }

    function onUncheckColorCustom(inputs) {
        updateGradient({"value": "#ffca1a"}, {"value": "#fe6207"});
    }

    function onCheckColorCustom(inputs) {
        updateGradient(nameColor0, nameColor);
    }

    nameCanvas.width = Math.round(nameRect.width * m);
    nameCanvas.height = Math.round(nameRect.height * m);

    var nameStyle = getComputedStyle(cardName);
    var nameFont = nameStyle.fontSize.match(/(\d+(?:\.\d+)?)(\w+)/);
    nameContext.font = m * nameFont[1] + nameFont[2] + " " + nameStyle.fontFamily;
    nameContext.textAlign = nameStyle.textAlign;
    nameContext.textBaseline = "middle";

    cardName.addEventListener("input", onInputCardName);
    initColorInput(nameColor0, nameColor, nameColorAuto, true, 3.7, updateGradient);
    initCustomButton(nameColorCustom, [nameColor0, nameColor, nameColorAuto], ignoreColor, onUncheckColorCustom, onCheckColorCustom);
}

function newCanvas(width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

function initFileInput(file, update) {
    function onInputFile() {
        if (this.files.length > 0) {
            var f = this.files[0];
            if (/image\//.test(f.type)) {
                var reader = new FileReader();
                reader.addEventListener("load", function() {
                    update(this.result);
                })
                reader.readAsDataURL(f);
            }
        }
    }

    file.addEventListener("input", onInputFile);
}

function initRecolorer(element, code, file, fileCustom, color0, color, colorAuto, colorCustom) {
    var gradientCanvas = newCanvas(256, 1);
    var gradientContext = gradientCanvas.getContext("2d");
    var gradientData;
    var elementRect = element.getBoundingClientRect();
    var imgCanvas = newCanvas(
        Math.round(elementRect.width),
        Math.round(elementRect.height)
    );
    var imgContext = imgCanvas.getContext("2d");

    function updateGradient(color0, color) {
        var lg = gradientContext.createLinearGradient(0, 0, 256, 0);
        lg.addColorStop(1, color0.value);
        lg.addColorStop(0, color.value);
        gradientContext.fillStyle = lg;
        gradientContext.fillRect(0, 0, 256, 1);
        gradientData = gradientContext.getImageData(0, 0, 256, 1);
    }

    function dataLoop(data, f) {
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

    function updateCanvas() {
        var id = code + "Default";
        if (fileCustom.checked && file.files.length > 0) {
            id = code + "Upload";
        }
        else if (code == "ib") {
            id += card.className[0].toUpperCase() + card.className.slice(1); /* todo: this is flimsy */
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
        }

        imgContext.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
        imgContext.putImageData(cardData[code], 0, 0);

        element.style.backgroundImage = "url('" + imgCanvas.toDataURL() + "')";
    }

    function updateBackground(color0, color) {
        updateGradient(color0, color);
        updateCanvas();
    }

    function updateFile(dataURL) {
        newImage(dataURL, function () {
            imgContext.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
            imgContext.drawImage(this, 0, 0, imgCanvas.width, imgCanvas.height);
            cardData[code + "Upload"] = imgContext.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
            updateCanvas();
        });
    }

    function ignoreColor(inputs, i) {
        if (i == 1 && inputs[2].checked) {
            return false;
        }
        return true;
    }

    function onInputColorCustom(inputs) {
        updateBackground(inputs[0], inputs[1]);
    }

    updateInfoboxBackground = updateCanvas;

    initFileInput(file, updateFile);
    initColorInput(color0, color, colorAuto, false, 37, updateBackground);
    initCustomButton(fileCustom, [file], undefined, updateCanvas, updateCanvas);
    initCustomButton(colorCustom, [color0, color, colorAuto], ignoreColor, onInputColorCustom, onInputColorCustom);
}

function newImage(src, onLoad) {
    var img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);
}

function initRecolorers() {
    var bg = document.getElementById("card");
    var bgFile = document.getElementById("bg-file");
    var bgFileCustom = document.getElementById("bg-file-custom");
    var bgColor0 = document.getElementById("bg-color-0");
    var bgColor = document.getElementById("bg-color-1");
    var bgColorAuto = document.getElementById("bg-color-auto");
    var bgColorCustom = document.getElementById("bg-color-custom");
    var np = document.getElementById("card-name-bg");
    var npFile = document.getElementById("np-file");
    var npFileCustom = document.getElementById("np-file-custom");
    var npColor0 = document.getElementById("np-color-0");
    var npColor = document.getElementById("np-color-1");
    var npColorAuto = document.getElementById("np-color-auto");
    var npColorCustom = document.getElementById("np-color-custom");
    var ib = document.getElementById("card-info-bg");
    var ibFile = document.getElementById("ib-file");
    var ibFileCustom = document.getElementById("ib-file-custom");
    var ibColor0 = document.getElementById("ib-color-0");
    var ibColor = document.getElementById("ib-color-1");
    var ibColorAuto = document.getElementById("ib-color-auto");
    var ibColorCustom = document.getElementById("ib-color-custom");

    function initCardData(element, id, src) {
        var elementRect = element.getBoundingClientRect();
        var canvas = newCanvas(
            Math.round(elementRect.width),
            Math.round(elementRect.height)
        );
        var context = canvas.getContext("2d");

        newImage(src, function () {
            context.drawImage(this, 0, 0, canvas.width, canvas.height);
            cardData[id] = context.getImageData(0, 0, canvas.width, canvas.height);
        });
    }

    initCardData(bg, "bgDefault", "img/bg/large/Background_01.jpg");
    initCardData(np, "npDefault", "img/Nome.png");
    initCardData(ib, "ibDefaultChar", "img/Colonna.png");
    initCardData(ib, "ibDefaultArmor", "img/Armor.png");
    initCardData(ib, "ibDefaultAgon", "img/Agon.png");

    initRecolorer(bg, "bg", bgFile, bgFileCustom, bgColor0, bgColor, bgColorAuto, bgColorCustom);
    initRecolorer(np, "np", npFile, npFileCustom, npColor0, npColor, npColorAuto, npColorCustom);
    initRecolorer(ib, "ib", ibFile, ibFileCustom, ibColor0, ibColor, ibColorAuto, ibColorCustom);
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
            ibTemplate.href = ibTemplateURLs[e.target.value];
            updateInfoboxBackground();
        }
    }

    types.addEventListener("click", onClickTypes);
    defaultType.click();
}

function initArt() {
    var cardArtController = document.getElementById("card-art-controller");
    var cardArtControllerRect = cardArtController.getBoundingClientRect();
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
        var cardArtRect1 = cardArt.getBoundingClientRect();
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

    function controlEnd(e) {
        circle.removeAttribute("style");
        circle.remove();
        style.remove();
        window.removeEventListener("mouseup", controlEnd);
        window.removeEventListener("mousemove", control);
        window.removeEventListener("touchend", controlEnd);
        window.removeEventListener("touchmove", control);
    }

    function control(e1) {
        if (e1.touches) {
            e1 = {"x": e1.touches[0].clientX, "y": e1.touches[0].clientY};
        }
        if (mode == "position") {
            var dx = e1.x - e0.x;
            var dy = e1.y - e0.y;
            artX.value = x0 + dx;
            artY.value = y0 - dy;

            artX.dispatchEvent(new InputEvent("input"));
            artY.dispatchEvent(new InputEvent("input"));
            updateCircle(artX.value, 1134 - artY.value, 100);
        }
        else if (mode == "width") {
            var r0 = distance(cardArtCenter, e0);
            var r1 = distance(cardArtCenter, e1);
            var w1 = cardArtRect0.width * r1 / r0;
            artW.value = Math.max(1, Math.floor(w1));

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

    function controlStart(e) {
        if (e.touches) {
            e = {"x": e.touches[0].clientX, "y": e.touches[0].clientY};
        }
        e0 = e;
        x0 = Number(artX.value);
        y0 = Number(artY.value);
        w0 = Number(artW.value);
        a0 = Number(artA.value);

        var savedTransform = cardArt.style.transform;
        cardArt.style.transform = "";
        cardArtRect0 = cardArt.getBoundingClientRect();
        cardArt.style.transform = savedTransform;
        cardArtCenter = {
            "x": Math.round((cardArtRect0.left + cardArtRect0.right) / 2),
            "y": Math.round((cardArtRect0.top + cardArtRect0.bottom) / 2)
        };
        updateBounds();

        updateCircle(x0, 1134 - y0, 0);
        cardArtController.appendChild(circle);
        document.body.appendChild(style);
        window.addEventListener("mouseup", controlEnd);
        window.addEventListener("mousemove", control);
        window.addEventListener("touchend", controlEnd);
        window.addEventListener("touchmove", control);
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

    cardArtController.addEventListener("mousedown", controlStart);
    cardArtController.addEventListener("touchstart", controlStart);

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

    context.fillStyle = "blue";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.putImageData(cardData.bgDefault, 100, 100);

    cardRender.src = canvas.toDataURL();
}

function initExport() {
    var exportPNG = document.getElementById("export-png");
    var exportPDF = document.getElementById("export-pdf");
    var exportJSON = document.getElementById("export-json");

    function createPNG() {
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

    initArt();

    initInfo();

    initExport();
}

window.addEventListener("load", init);
window.addEventListener("beforeprint", renderCard);
// window.addEventListener("beforeunload", warn);
