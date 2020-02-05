<!DOCTYPE html>
<html lang="it">
	<head>
		<link type="text/css" rel="stylesheet" href="css/layout.css">
		<link type="text/css" rel="stylesheet" media="screen" href="css/screen.css">
		<link type="text/css" rel="stylesheet" media="print" href="css/print.css">
		<title>Musha</title>

		<script type="text/javascript" src="script/misc.js"></script>
		<script type="text/javascript" src="script/dropdownMenu.js"></script>
		<script type="text/javascript" src="script/lightbox.js"></script>
	</head>
	<body onload="canvasInit(); lightbox.init();">
		<div id="page">
			<div id="bkgImage"></div>
			<div id="pgImage"></div>
			
			<div id="sysStyle" class="sys" onclick="this.classList.toggle('flipped'); document.getElementById('page').classList.toggle('adv');">
				<img id="front" src="img/S.gif" alt="Standard" width="50" height="50">
				<img id="back" src="img/A.gif" alt="Advanced" width="50" height="50">
			</div>

			<div id="nome">
				<canvas width="1496" height="240" onclick="advancedName();"></canvas>
			</div>

			<div id="content">
				<div id="info">
					<div id="stat">
						<div id="ra">
							<?php for ($i = 1; $i < 7; $i++) { ?>
								<label onclick="checklv('ra', this);">
									<input class="print sys" type="checkbox" name="ra[]" value="<?php echo($i); ?>">
									<span></span>
								</label>
							<?php } ?>
						</div>
						<div id="at">
							<?php for ($i = 1; $i < 7; $i++) { ?>
								<label onclick="checklv('at', this);">
									<input class="print sys" type="checkbox" name="at[]" value="<?php echo($i); ?>">
									<span></span>
								</label>
							<?php } ?>
						</div>
						<div id="de">
							<?php for ($i = 1; $i < 7; $i++) { ?>
								<label onclick="checklv('de', this);">
									<input class="print sys" type="checkbox" name="de[]" value="<?php echo($i); ?>">
									<span></span>
								</label>
							<?php } ?>
						</div>
					</div>

					<div id="exp">
						<div id="simboloSP">
							<input type="button" class="sys adv" onclick="addSymbol('SP');">
							<span onclick="simboloSP.checkFlag();"><img src="" alt="" width="20" height="20"></span>
							<?php
								$img = array_diff(scandir('image/simboliSTD/SP'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb"));
								sort($img);
								$n = count($img);

								for ($i = 0; $i < $n; $i++) {
									?><span><img src="image/simboliSTD/SP/<?php echo ($img[$i]); ?>" alt="<?php echo($img[$i]); ?>" width="20" height="20" onclick="changeSP(this); simboloSP.hideMenu();"></span><?php
								}
							?>
							<script type="text/javascript">var simboloSP = new dropdownMenu('simboloSP', 2500);</script>
						</div>
					</div>

					<div id="tecniche">
						<?php for ($i = 1; $i < 6; $i++) { ?>
							<div class="tecnica">
								<input type="text" class="nome empty" placeholder="Nome tecnica" onkeyup="checkEmpty(this, 'nome', 0);">
								<input type="text" class="pa empty" placeholder="PA" size="2" onkeyup="checkEmpty(this, 'pa', 2);">
								<?php
									for ($j = 1; $j < 6; $j++) {
										echo("<div id=\"simbolo".$i."_".$j."\">");
											?><input type="button" class="sys adv" onclick="addSymbol('TC', <?php echo($i); ?>, <?php echo($j); ?>);"><?php
											echo("<span onclick=\"");
												for ($k = 1; $k < 6; $k++) {
													if ($k == $j) echo("simbolo".$i."_".$k.".checkFlag();");
													else echo("simbolo".$i."_".$k.".hideMenu();");
												}
											echo("\">&nbsp;</span>");
											$img = array_diff(scandir('image/simboliSTD/TC'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb"));
											sort($img);
											$n = count($img);

											for ($k = 0; $k < $n; $k++) {
												?><span onclick="selectSymbol(this, <?php echo($i); ?>, <?php echo($j); ?>); simbolo<?php echo($i."_".$j); ?>.hideMenu();"><img src="image/simboliSTD/TC/<?php echo ($img[$k]); ?>" alt="<?php echo($img[$k]); ?>"  width="20" height="20" onclick="show(this);" /></span><?php
											}
											?><script type="text/javascript">var simbolo<?php echo($i); ?>_<?php echo($j); ?> = new dropdownMenu('simbolo<?php echo($i); ?>_<?php echo($j); ?>', 2500);</script><?php
										echo("</div>");
									}
								?>
								<input type="text" class="bonus empty" placeholder="Bonus" size="4" onkeyup="checkEmpty(this, 'bonus', 4);">
							</div>
						<?php } ?>
						<div class="spacer"></div>
						<?php for ($i = 6; $i < 8; $i++) { ?>
							<div class="tecnica">
								<input type="text" class="nome empty" placeholder="Nome tecnica" onkeyup="checkEmpty(this, 'nome', 0);">
								<input type="text" class="pa empty" placeholder="PA" size="2" onkeyup="checkEmpty(this, 'pa', 2);">
								<?php
									for ($j = 1; $j < 6; $j++) {
										echo("<div id=\"simbolo".$i."_".$j."\">");
											?><input type="button" class="sys adv" onclick="addSymbol('TC', <?php echo($i); ?>, <?php echo($j); ?>);"><?php
											echo("<span onclick=\"");
												for ($k = 1; $k < 6; $k++) {
													if ($k == $j) echo("simbolo".$i."_".$k.".checkFlag();");
													else echo("simbolo".$i."_".$k.".hideMenu();");
												}
											echo("\">&nbsp;</span>");
											$img = array_diff(scandir('image/simboliSTD/TC'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb"));
											sort($img);
											$n = count($img);

											for ($k = 0; $k < $n; $k++) {
												?><span onclick="selectSymbol(this, <?php echo($i); ?>, <?php echo($j); ?>); simbolo<?php echo($i."_".$j); ?>.hideMenu();"><img src="image/simboliSTD/TC/<?php echo ($img[$k]); ?>" alt="<?php echo($img[$k]); ?>"  width="20" height="20" onclick="show(this);" /></span><?php
											}
											?><script type="text/javascript">var simbolo<?php echo($i); ?>_<?php echo($j); ?> = new dropdownMenu('simbolo<?php echo($i); ?>_<?php echo($j); ?>', 2500);</script><?php
										echo("</div>");
									}
								?>
								<input type="text" class="bonus empty" placeholder="Bonus" size="4" onkeyup="checkEmpty(this, 'bonus', 4);">
							</div>
						<?php } ?>
					</div>
				</div>

				<div id="background" class="sys">
					<div>
						<?php
							$thumb = array_diff(scandir('img/bg/thumb'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb")); sort($thumb);
							$large = array_diff(scandir('img/bg/large'), array(".", "..", "._DS_Store", "__MACOSX", "Thumb")); sort($large);
							$n = count($thumb);

							for ($i = 0; $i < $n; $i++) {
								?><img src="img/bg/thumb/<?php echo ($thumb[$i]); ?>" alt="<?php echo ($large[$i]); ?>" width="40" height="40" onclick="changeBg('<?php echo ($large[$i]); ?>');"><?php
							}
						?>
					</div>
					<div>
						<span>Modifica immagine PG</span>
						<input type="file" onchange="previewImage(this, 'pgImage', 0);">
						<input type="range" oninput="imageResize('pgImage', this.value);" onchange="imageResize('pgImage', this.value);">
					</div>
					<div class="sys adv">
						<span>Modifica sfondo scheda</span>
						<input type="file" onchange="previewImage(this, 'bkgImage', 1);">
						<input type="range" oninput="imageResize('bkgImage', this.value);" onchange="imageResize('bkgImage', this.value);">
					</div>
				</div>
			</div>
		</div>
	</body>
</html>