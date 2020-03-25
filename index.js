var card;
var cardData = { /* todo */
    "bgStandard": undefined,
    "bgUpload": undefined,
    "bg": undefined,
    "npStandard": undefined,
    "npUpload": undefined,
    "np": undefined,
    "ibStandardChar": undefined,
    "ibStandardArmor": undefined,
    "ibStandardAgon": undefined,
    "ibUpload": undefined,
    "ib": undefined,
    "art": undefined
};

var updateInfoboxBackground;

function initColorInput(color0, color1, colorAuto, depth, update) {
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

    colorAuto.checked = false;
    colorAuto.addEventListener("input", onInputColorAuto);
    colorAuto.click();
}

function initStandardButton(standard, inputs, ignore, onCheck, onUncheck) {
    function onInputStandard() {
        if (standard.checked) {
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute("disabled", true);
            }
            onCheck(inputs);
        }
        else {
            for (var i = 0; i < inputs.length; i++) {
                if (!ignore || ignore(inputs, i)) {
                    inputs[i].removeAttribute("disabled");
                }
            }
            onUncheck(inputs);
        }
    }

    standard.checked = false;
    standard.addEventListener("input", onInputStandard);
    standard.click();
}

function initName() {
    var cardName = document.getElementById("card-name");
    var nameRect = cardName.getBoundingClientRect();
    var nameCanvas = document.getElementById("card-name-canvas");
    var nameContext = nameCanvas.getContext("2d");
    var nameColor0 = document.getElementById("name-color-0");
    var nameColor1 = document.getElementById("name-color-1");
    var nameColorAuto = document.getElementById("name-color-auto");
    var nameColorStandard = document.getElementById("name-color-standard");

    function onInputCardName() {
        var w = nameCanvas.width / devicePixelRatio;
        var h = nameCanvas.height / devicePixelRatio;
        nameContext.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
        nameContext.fillText(cardName.value, w, h);
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

    function onCheckColorStandard(inputs) {
        updateGradient({"value": "#ffca1a"}, {"value": "#fe6207"});
    }

    function onUncheckColorStandard(inputs) {
        updateGradient(nameColor0, nameColor1);
    }

    nameCanvas.width = Math.round(nameRect.width * devicePixelRatio);
    nameCanvas.height = Math.round(nameRect.height * devicePixelRatio);

    nameContext.textAlign = "center";
    nameContext.textBaseline = "middle";
    nameContext.font = "112px Regular"; /* todo: getComputedStyle */

    cardName.addEventListener("input", onInputCardName);
    initColorInput(nameColor0, nameColor1, nameColorAuto, 3.7, updateGradient);
    initStandardButton(nameColorStandard, [nameColor0, nameColor1, nameColorAuto], ignoreColor1, onCheckColorStandard, onUncheckColorStandard);
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

function initRecolorer(element, code, file, fileStandard, color0, color1, colorAuto, colorStandard) {
    var gradientCanvas = newCanvas(256, 1);
    var gradientContext = gradientCanvas.getContext("2d");
    var gradientData;
    var elementRect = element.getBoundingClientRect();
    var imgCanvas = newCanvas(
        Math.round(elementRect.width),
        Math.round(elementRect.height)
    );
    var imgContext = imgCanvas.getContext("2d");

    function updateGradient(color0, color1) {
        var lg = gradientContext.createLinearGradient(0, 0, 256, 0);
        lg.addColorStop(1, color0.value);
        lg.addColorStop(0, color1.value);
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
        var id = code + "Standard";
        if (fileStandard.checked && code == "ib") {
            id += card.className[0].toUpperCase() + card.className.slice(1); /* todo: this is flimsy */
        }
        else if (!fileStandard.checked && file.files.length > 0) {
            id = code + "Upload";
        }

        if (!cardData[id]) {
            return;
        }

        if (colorStandard.checked) {
            cardData[code] = cardData[id];
        }
        else {
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

        imgContext.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
        imgContext.putImageData(cardData[code], 0, 0);

        element.style.backgroundImage = "url('" + imgCanvas.toDataURL() + "')";
    }

    function updateBackground(color0, color1) {
        updateGradient(color0, color1);
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

    function ignoreColor1(inputs, i) {
        if (i == 1 && inputs[2].checked) {
            return false;
        }
        return true;
    }

    function onInputColorStandard(inputs) {
        updateBackground(inputs[0], inputs[1]);
    }

    updateInfoboxBackground = updateCanvas;

    initFileInput(file, updateFile);
    initColorInput(color0, color1, colorAuto, 37, updateBackground);
    initStandardButton(fileStandard, [file], undefined, updateCanvas, updateCanvas);
    initStandardButton(colorStandard, [color0, color1, colorAuto], ignoreColor1, onInputColorStandard, onInputColorStandard);
}

function newImage(src, onLoad) {
    var img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);
}

function initRecolorers() {
    var bg = document.getElementById("card");
    var bgFile = document.getElementById("bg-file");
    var bgFileStandard = document.getElementById("bg-file-standard");
    var bgColor0 = document.getElementById("bg-color-0");
    var bgColor1 = document.getElementById("bg-color-1");
    var bgColorAuto = document.getElementById("bg-color-auto");
    var bgColorStandard = document.getElementById("bg-color-standard");
    var np = document.getElementById("card-name-bg");
    var npFile = document.getElementById("np-file");
    var npFileStandard = document.getElementById("np-file-standard");
    var npColor0 = document.getElementById("np-color-0");
    var npColor1 = document.getElementById("np-color-1");
    var npColorAuto = document.getElementById("np-color-auto");
    var npColorStandard = document.getElementById("np-color-standard");
    var ib = document.getElementById("card-info-bg");
    var ibFile = document.getElementById("ib-file");
    var ibFileStandard = document.getElementById("ib-file-standard");
    var ibColor0 = document.getElementById("ib-color-0");
    var ibColor1 = document.getElementById("ib-color-1");
    var ibColorAuto = document.getElementById("ib-color-auto");
    var ibColorStandard = document.getElementById("ib-color-standard");

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

    initCardData(bg, "bgStandard", "img/bg/large/Background_01.jpg");
    initCardData(np, "npStandard", "img/Nome.png");
    initCardData(ib, "ibStandardChar", "img/Colonna.png");
    initCardData(ib, "ibStandardArmor", "img/Armor.png");
    initCardData(ib, "ibStandardAgon", "img/Agon.png");

    initRecolorer(bg, "bg", bgFile, bgFileStandard, bgColor0, bgColor1, bgColorAuto, bgColorStandard);
    initRecolorer(np, "np", npFile, npFileStandard, npColor0, npColor1, npColorAuto, npColorStandard);
    initRecolorer(ib, "ib", ibFile, ibFileStandard, ibColor0, ibColor1, ibColorAuto, ibColorStandard);
}

function initTypes() {
    var types = document.getElementById("types");
    var defaultType = document.getElementById("type-char");
    var ibTemplate = document.getElementById("ib-template");
    var ibTemplateURLs = {
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
    var canvas = document.getElementById("card-render");
    var context = canvas.getContext("2d");

    canvas.width = 756;
    canvas.height = 1134;

    context.putImage
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
// window.addEventListener("beforeunload", warn);
