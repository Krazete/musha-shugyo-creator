<!DOCTYPE html>
<html>
<head>
    <link type="text/css" rel="stylesheet" href="index.css">
    <title>Musha Shugyo Creator</title>
    <script type="text/javascript" src="script/jscolor.js"></script>
    <script type="text/javascript" src="index.js"></script>
</head>
<body>
    <div id="creator">
        <div id="types">
            <input id="type-char" type="radio" name="type" value="char">
            <label for="type-char">Character</label>
            <input id="type-armor" type="radio" name="type" value="armor">
            <label for="type-armor">Armor</label>
            <input id="type-agon" type="radio" name="type" value="agon">
            <label for="type-agon">Agon</label>
        </div>
        <div id="card" class="armor"><!-- todo: temp -->
            <div id="card-art-controller">
                <img id="card-art" src="img/A.gif">
            </div>
            <img id="card-name-bg" src="img/Nome.png">
            <input id="card-name" type="text" placeholder="Card Name" autocomplete="off" spellcheck="false"><!-- todo -->
            <canvas id="card-name-canvas"></canvas>
            <div id="card-info-bg"></div>
            <div id="card-info">
                <input id="info-type" type="text" placeholder="Type">
                <div id="info-stat">
<?php foreach (array("ra", "at", "de", "vo", "eq") as $id) { ?>
                    <div id="<?php echo $id; ?>">
<?php for ($i = 0; $i < 6; $i++) { ?>
                        <label><input type="checkbox" name="<?php echo $id; ?>"></label>
<?php } ?>
                    </div>
<?php } ?>
                </div>
                <div id="info-stat-armor">
<?php foreach (array("st", "da") as $id) { ?>
                    <div id="<?php echo $id; ?>">
<?php for ($i = 0; $i < 7; $i++) { ?>
                        <label><input type="checkbox" name="<?php echo $id; ?>"></label>
<?php } ?>
                    </div>
<?php } ?>
                </div>
                <div id="info-moves">
<?php for ($i = 0; $i < 8; $i++) { ?>
                    <div id="move-<?php echo $i; ?>">
                        <input class="move-name" type="text" placeholder="Nome tecnica">
                        <input class="move-pa" type="text" placeholder="PA">
                        <input class="move-bonus" type="text" placeholder="Bonus">
                    </div>
<?php } ?>
                </div>
            </div>
        </div>
        <div id="menu">
            <div class="option-label">Name Color</div>
            <input id="moniker-color-top" class="jscolor" data-jscolor="{hash: true}" value="#ffca1a">
            <input id="moniker-color-bottom" class="jscolor" data-jscolor="{hash: true}" value="#fe6207" disabled>
            <input type="checkbox" checked>
            <label id="autograd">Automatic Gradient</label>
            <div class="option-label">Background Color</div>
            <input id="bg-color-hi" class="jscolor" data-jscolor="{hash: true}" value="#ffffff">
            <input id="bg-color-lo" class="jscolor" data-jscolor="{hash: true}" value="#000000">
            <input type="checkbox" checked>
            <label id="autograd2">Automatic Gradient</label>
            <div class="option-label">Card Art</div>
            <input type="file">
            <div>
                <input type="radio">
                <label>Translate</label>
                <input type="number">
                <label>X</label>
                <input type="number">
                <label>Y</label>
            </div>
            <div>
                <input type="radio">
                <label>Rotate</label>
                <input type="number">
                <label>Degrees</label>
            </div>
            <div>
                <input type="radio">
                <label>Scale</label>
                <input type="number">
                <label>Width</label>
            </div>
            <div class="option-label">Custom Assets</div>
            <div>
                <input type="file">
                <label>Card Background</label>
            </div>
            <div>
                <input type="file">
                <label>Name Background</label>
            </div>
            <div>
                <input type="file">
                <label>Infobox Background</label>
            </div>
            <div class="option-label">Export</div>
            <input type="button" value="PNG">
            <input type="button" value="PDF">
            <input type="button" value="JSON">
        </div>
    </div>
    <div id="aide" class="hidden">
        <img id="bgbg" src="img/bg/large/Background_01.jpg">
        <canvas id="bg-grad" width="256" height="1"></canvas>
    </div>
    <canvas id="card-canvas"></canvas>
</body>
</html>
