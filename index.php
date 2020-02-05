<!DOCTYPE html>
<html lang="it">
<head>
    <link type="text/css" rel="stylesheet" href="index.css">
    <title>Musha Shugyo Creator</title>
    <script type="text/javascript" src="index.js"></script>
</head>
<body>
    <div id="card">
        <img id="bkgImage" src="img/bg/large/Background_01.jpg">
        <img id="nomeImage" src="img/Nome.png">
        <input id="nome" type="text" placeholder="Modifica nome PG">
        <div id="info" class="colonna">
            <div id="stat">
<?php foreach (array("ra", "at", "de", "vo", "eq") as $id) { ?>
                <div id="<?php echo $id ?>">
<?php for ($i = 0; $i < 6; $i++) { ?>
                    <label><input type="radio" name="ra"></label>
<?php } ?>
                </div>
<?php } ?>
            </div>
        </div>
        <input type="text">
    </div>
    <input id="scale" type="range" min="10" max="100" step="1" value="50">
</body>
</html>
