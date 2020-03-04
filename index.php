<!DOCTYPE html>
<html lang="it">
<head>
    <link type="text/css" rel="stylesheet" href="index.css">
    <title>Musha Shugyo Creator</title>
    <script type="text/javascript" src="script/jscolor.js"></script>
    <script type="text/javascript" src="index.js"></script>
</head>
<body>
    <canvas id="card-canvas"></canvas>
    <div id="creator">
        <div id="variations">
            <input id="char" type="radio" name="variation" value="char"><label for="char">Character</label>
            <input id="armor" type="radio" name="variation" value="armor"><label for="armor">Armor</label>
            <input id="agon" type="radio" name="variation" value="agon"><label for="agon">Agon</label>
        </div>
        <img id="bgbg" src="img/bg/large/Background_01.jpg" style="display:none">
        <div id="card">
            <img id="moniker-bg" src="img/Nome.png">
            <input id="moniker" type="text" placeholder="Modifica nome PG" autocomplete="undefined" spellcheck="false">
            <canvas id="moniker-canvas"></canvas>
            <div id="infobox" class="colonna">
                <!-- <img id="info" src="img/Colonna.png"> -->
                <input id="type" type="text" placeholder="Type">
                <div id="stat">
<?php foreach (array("ra", "at", "de", "vo", "eq") as $id) { ?>
                    <div id="<?php echo $id; ?>">
<?php for ($i = 0; $i < 6; $i++) { ?>
                        <label><input type="radio" name="<?php echo $id; ?>"></label>
<?php } ?>
                    </div>
<?php } ?>
                </div>
                <div id="armorstat">
<?php foreach (array("st", "da") as $id) { ?>
                    <div id="<?php echo $id; ?>">
<?php for ($i = 0; $i < 7; $i++) { ?>
                        <label><input type="radio" name="<?php echo $id; ?>"></label>
<?php } ?>
                    </div>
<?php } ?>
                </div>
                <div id="moves">
<?php for ($i = 0; $i < 8; $i++) { ?>
                    <div id="move-<?php echo $i; ?>">
                        <input class="name" type="text" placeholder="Nome tecnica">
                        <input class="pa" type="text" placeholder="PA">
                        <input class="bonus" type="text" placeholder="Bonus">
                    </div>
<?php } ?>
                </div>
            </div>
        </div>
    </div>
    <div id="menu">
        <div>
            <div class="option-label" name="Name Color"></div>
            <input id="moniker-color-top" class="jscolor {hash: true}" value="#ffca1a">
            <input id="moniker-color-bottom" class="jscolor {hash: true}" value="#fe6207">
            <div class="option-label" name="Background Color"></div>
            <input id="bg-color-hi" class="jscolor {hash: true}" value="#ffffff">
            <input id="bg-color-lo" class="jscolor {hash: true}" value="#000000">
            <div class="option-label" name="Image"></div>
        </div>
    </div>
</body>
</html>
