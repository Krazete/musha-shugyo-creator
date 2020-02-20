<!DOCTYPE html>
<html lang="it">
<head>
    <link type="text/css" rel="stylesheet" href="index.css">
    <title>Musha Shugyo Creator</title>
    <script type="text/javascript" src="index.js"></script>
</head>
<body>
    <canvas id="card-render"></canvas>
    <div id="card">
        <img id="bg" src="img/bg/large/Background_01.jpg">
        <img id="nome-bg" src="img/Nome.png">
        <img id="nome-render">
        <input id="nome" type="text" placeholder="Modifica nome PG">
        <img id="info" class="colonna" src="img/Colonna.png">
        <div id="stat">
<?php foreach (array("ra", "at", "de", "vo", "eq") as $id) { ?>
            <div id="<?php echo $id; ?>">
<?php for ($i = 0; $i < 6; $i++) { ?>
                <label><input type="radio" name="<?php echo $id; ?>"></label>
<?php } ?>
            </div>
<?php } ?>
        </div>
        <div id="sp"></div>
    </div>
<?php for ($i = 0; $i < 6000; $i++) { ?>
    @
<?php } ?>
</body>
</html>
