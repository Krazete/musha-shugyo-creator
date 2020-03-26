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
                <img id="card-art">
            </div>
            <div id="card-name-bg"></div>
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
                <div id="info-sp" class="blocked"></div>
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
                        <div class="move-icons blocked"></div>
                        <input class="move-bonus" type="text" placeholder="Bonus">
                    </div>
<?php } ?>
                </div>
            </div>
        </div>
        <div id="menu">
            <div class="menu-title">Background</div>
            <div class="row">
                <input id="bg-file-standard" type="checkbox">
                <label for="bg-file-standard">Default</label>
                <input id="bg-file" type="file" accept="image/*">
                (2:3)
                <a href="img/bg/large/Background_01.jpg" download>Template</a>
            </div>
            <div class="row">
                <input id="bg-color-standard" type="checkbox">
                <label for="bg-color-standard">Default</label>
                <input id="bg-color-0" class="jscolor" data-jscolor="{hash: true}" value="#c8c9c5">
                <input id="bg-color-1" class="jscolor" data-jscolor="{hash: true}" value="#000000">
                <input id="bg-color-auto" type="checkbox">
                <label for="bg-color-auto">Auto</label>
            </div>

            <div class="menu-title">Nameplate</div>
            <div class="row">
                <input id="np-file-standard" type="checkbox">
                <label for="np-file-standard">Default</label>
                <input id="np-file" type="file" accept="image/*">
                (1:6)
                <a href="img/Nome.png" download>Template</a>
            </div>
            <div class="row">
                <input id="np-color-standard" type="checkbox">
                <label for="np-color-standard">Default</label>
                <input id="np-color-0" class="jscolor" data-jscolor="{hash: true}" value="#c8c9c5">
                <input id="np-color-1" class="jscolor" data-jscolor="{hash: true}" value="#000000">
                <input id="np-color-auto" type="checkbox">
                <label for="np-color-auto">Auto</label>
            </div>

            <div class="menu-title">Name</div>
            <div class="row">
                <input id="name-color-standard" type="checkbox">
                <label for="name-color-standard">Default</label>
                <input id="name-color-0" class="jscolor" data-jscolor="{hash: true}" value="#ffca1a">
                <input id="name-color-1" class="jscolor" data-jscolor="{hash: true}" value="#fe6207">
                <input id="name-color-auto" type="checkbox">
                <label for="name-color-auto">Auto</label>
            </div>

            <div class="menu-title">Infobox</div>
            <div class="row">
                <input id="ib-file-standard" type="checkbox">
                <label for="ib-file-standard">Default</label>
                <input id="ib-file" type="file" accept="image/*">
                (4:9)
                <a id="ib-template" href="img/Colonna.png" download>Template</a>
            </div>
            <div class="row">
                <input id="ib-color-standard" type="checkbox">
                <label for="ib-color-standard">Default</label>
                <input id="ib-color-0" class="jscolor" data-jscolor="{hash: true}" value="#c8c9c5">
                <input id="ib-color-1" class="jscolor" data-jscolor="{hash: true}" value="#000000">
                <input id="ib-color-auto" type="checkbox">
                <label for="ib-color-auto">Auto</label>
            </div>

            <div class="menu-title">Card Art</div>
            <div class="row">
                <input id="art" type="file" accept="image/*">
            </div>
            <div class="row blocked">
                <input type="radio">
                <label>Translate</label>
                <input type="number">
                <label>X</label>
                <input type="number">
                <label>Y</label>
            </div>
            <div class="row blocked">
                <input type="radio">
                <label>Rotate</label>
                <input type="number">
                <label>Degrees</label>
            </div>
            <div class="row blocked">
                <input type="radio">
                <label>Scale</label>
                <input type="number">
                <label>Width</label>
            </div>
            <div class="menu-title">Export</div>
            <div class="row blocked">
                <input type="button" value="PNG">
                <input type="button" value="PDF">
                <input type="button" value="JSON">
            </div>
        </div>
    </div>
    <canvas id="card-canvas"></canvas>
</body>
</html>
