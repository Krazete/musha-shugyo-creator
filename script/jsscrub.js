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
        window.removeEventListener("touchmove", onMouseMove);
        window.removeEventListener("touchend", onMouseUp);
    }

    function onMouseMove(e) {
        if (e.touches) {
            e = e.touches[0];
        }
        var x1 = e.x;
        var dx = (x1 - x0);
        if (input.step) {
            dx *= nonNaN(input.step);
        }
        var i1 = i0 + dx;
        if ("jsscrub" in input.dataset && input.dataset.jsscrub.includes("continuous")) {
            min = nonNaN(input.min);
            max = nonNaN(input.max);
            var dm = max - min;
            i1 = ((i1 - min) % dm + dm) % dm + min;
        }
        if (input.min) {
            i1 = Math.max(i1, input.min);
        }
        if (input.max) {
            i1 = Math.min(i1, input.max);
        }
        input.value = i1;
        input.dispatchEvent(new InputEvent("input"));
    }

    function onMouseDown(e) {
        if (e.touches) {
            e = e.touches[0];
        }
        i0 = nonNaN(input.value);
        x0 = e.x;
        document.body.appendChild(style);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onMouseMove);
        window.addEventListener("touchend", onMouseUp);
    }

    input.style.cursor = "ew-resize";
    style.innerHTML = "html {cursor: ew-resize;} body {pointer-events: none;}";

    input.addEventListener("mousedown", onMouseDown);
    input.addEventListener("touchstart", onMouseDown);
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
