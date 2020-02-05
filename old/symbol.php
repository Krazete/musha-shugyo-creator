<style>
	div#symbol {
		width: 480px;
		height: 180px;
		padding: 10px;
	}
	
	div#symbol span {
		display: block;
		float: left;
		width: 20px;
		height: 20px;
		padding: 5px;
	}

	div#symbol input[type=button] {
		position: absolute;
		right: 10px;
		bottom: 5px;
	}
</style>

<div id="symbol">
	<?php
		switch ($_GET['which']) {
			case "SP":
				$img = array_diff(scandir('image/simboliSTD/SP'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb"));
				sort($img);
				$n = count($img);

				for ($i = 0; $i < $n; $i++) {
					?><span><img src="image/simboliSTD/SP/<?php echo ($img[$i]); ?>"alt="<?php echo($img[$i]); ?>" width="20" height="20" onclick="changeSP(this); lightbox.hide();"></span><?php
				}
				$img = array_diff(scandir('image/simboliADV/SP'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb"));
				sort($img);
				$n = count($img);

				for ($i = 0; $i < $n; $i++) {
					?><span><img src="image/simboliADV/SP/<?php echo ($img[$i]); ?>"alt="<?php echo($img[$i]); ?>" width="20" height="20" onclick="changeSP(this); lightbox.hide();"></span><?php
				}
			break;
			case "TC":
				$img = array_diff(scandir('image/simboliSTD/TC'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb"));
				sort($img);
				$n = count($img);
				
				for ($k = 0; $k < $n; $k++) {
					?><span onclick="selectSymbol(this, <?php echo($_GET["tecnica"]); ?>, <?php echo($_GET["symbol"]); ?>); lightbox.hide();"><img src="image/simboliSTD/TC/<?php echo ($img[$k]); ?>"alt="<?php echo($img[$k]); ?>"  width="20" height="20" onclick="show(this);" /></span><?php
				}
				$img = array_diff(scandir('image/simboliADV/TC'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb"));
				sort($img);
				$n = count($img);
				
				for ($k = 0; $k < $n; $k++) {
					?><span onclick="selectSymbol(this, <?php echo($_GET["tecnica"]); ?>, <?php echo($_GET["symbol"]); ?>); lightbox.hide();"><img src="image/simboliADV/TC/<?php echo ($img[$k]); ?>"alt="<?php echo($img[$k]); ?>"  width="20" height="20" onclick="show(this);" /></span><?php
				}
			break;
		}
	?>
	<input type="button" value="Annulla" onclick="lightbox.hide();">
</div>