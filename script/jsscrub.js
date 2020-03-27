function convertToScrubber(input) {
    var i0 = 0;
    var x0 = 0;
    var style = document.createElement("style");

    function nonNaN(n) {
        var m = Number(n);
        if (isNaN(m)) {
            m = 0;
        }
        return m;
    }

    function onMouseUp(e) {
        style.remove();
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(e) {
        var x1 = e.x;
        var dx = (x1 - x0);
        if (input.step) {
            dx *= nonNaN(input.step);
        }
        var i1 = i0 + dx;
        if (input.min && input.max) {
            min = nonNaN(input.min);
            max = nonNaN(input.max);
            var dm = max - min;
            i1 = ((i1 - min) % dm + dm) % dm + min;
        }
        input.value = i1;
        input.dispatchEvent(new InputEvent("input"));
    }

    function onMouseDown(e) {
        i0 = nonNaN(input.value);
        x0 = e.x;
        document.body.appendChild(style);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    input.style.cursor = "ew-resize";
    style.innerHTML = "body {pointer-events: none;} * {cursor: ew-resize !important;}";

    input.addEventListener("mousedown", onMouseDown);
}

function initScrubbers() {
    var scrubbers = document.getElementsByClassName("jsscrub");
    for (var i = 0; i < scrubbers.length; i++) {
        if (scrubbers[i].tagName == "INPUT" && scrubbers[i].type == "number") {
            convertToScrubber(scrubbers[i]);
        }
    }
}

window.addEventListener("load", initScrubbers);
