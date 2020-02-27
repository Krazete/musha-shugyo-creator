<!DOCTYPE html>
<html lang="it">
<head>
    <link type="text/css" rel="stylesheet" href="index.css">
    <title>Musha Shugyo Creator</title>
    <script type="text/javascript" src="index.js"></script>
</head>
<body>
    <div id="card-type-options">
        <label><input type="radio" name="type" value="char">Character</label>
        <label><input type="radio" name="type" value="armor">Armor</label>
        <label><input type="radio" name="type" value="agon">Agon</label>
        <p>lol</p>
    </div>
    <canvas id="card-render"></canvas>
    <div id="card">
        <img id="bg" src="img/bg/large/Background_01.jpg">
        <img id="nome-bg" src="img/Nome.png">
        <img id="nome-render">
        <input id="nome" type="text" placeholder="Modifica nome PG">
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
                    <input class="nome" type="text" placeholder="Nome tecnica">
                    <input class="pa" type="text" placeholder="PA">
                    <input class="bonus" type="text" placeholder="Bonus">
                </div>
<?php } ?>
            </div>
        </div>
    </div>
</body>
</html>
