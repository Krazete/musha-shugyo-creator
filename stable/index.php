<!DOCTYPE html>
<html lang="it">
	<head>
		<link type="text/css" rel="stylesheet" href="css/layout.css">
		<title>Musha</title>
		<script type="text/javascript" src="script/dropdownMenu.js"></script>
		<script>
			function changeName(name) {
				document.getElementById("nome").getElementsByTagName("svg")[0].getElementsByTagName("text")[0].textContent = name;
			}
			function checklv (stat, lv) {
				health = document.getElementById(stat);
				sections = health.getElementsByTagName("label");
				i = 0;
				while (sections[i] != lv) {
					sections[i].getElementsByTagName("input")[0].checked = true;
					i++;
				}
				sections[i].getElementsByTagName("input")[0].checked = true;
				i++;
				while (sections[i] != lv) {
					sections[i].getElementsByTagName("input")[0].checked = false;
					i++;
				}
			}
			function changeSP (sp) {
				document.getElementById("simboloSP").getElementsByTagName("img")[0].src = sp.src;
				/*images = document.getElementById("exp").getElementsByTagName("img");
				i = 0;
				while (images[i] != sp) {
					images[i].className = "unselected";
					i++;
				}
				images[i].className = "selected";
				i++;
				while (images[i] != sp) {
					images[i].className = "unselected";
					i++;
				}*/
			}
			function changeBg (col) {
				document.getElementById("page").style.backgroundImage = 'url("img/bg/image/'+col+'")';
			}
			function PreviewImage() {
				var oFReader = new FileReader();
				oFReader.readAsDataURL(document.getElementById("bgImage").getElementsByTagName("input")[0].files[0]);
				oFReader.onload = function (oFREvent) {
					document.getElementById("pgImage").src = oFREvent.target.result;
				}
			}
			function checkEmpty(ipt, wht) {
				ipt.size = ipt.value.length - 1;
				if (ipt.value) ipt.className = wht;
				else ipt.className = wht+" empty";
			}
			function selectSymbol(sym, sel, next) {
				if (sym.parentNode.getElementsByTagName("span")[0].innerHTML != sym.innerHTML) {
					sym.parentNode.getElementsByTagName("span")[0].innerHTML = sym.innerHTML;
					document.getElementById("simbolo"+sel+"_"+next).style.display = "block";
				} else {
					sym.parentNode.getElementsByTagName("span")[0].innerHTML = "";
					document.getElementById("simbolo"+sel+"_"+next).style.display = "none";
				}
			}
		</script>
	</head>
	<body>
		<div id="page">
			<div id="nome">
				<svg width="378" height="80">
					<defs>
						<linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="30%" style="stop-color:rgb(255,200,26); stop-opacity:1" />
							<stop offset="100%" style="stop-color:rgb(254,99,7); stop-opacity:1" />
						</linearGradient>
					</defs>
					<text x="190" y="25" text-anchor="middle" font-family="Regular" font-size="30" fill="url(#grad1)">Inserisci il nome del PG</text>
				</svg>
				<input type="text" placeholder="Inserisci il nome del PG" onchange="changeName(this.value);">
			</div>
			<div id="content">
				<img id="pgImage" src="" alt="PGImage" width="" height="">
				<div id="info">
					<div id="stat">
						<div id="ra">
							<label onclick="checklv('ra', this);">
								<input form="myform" type="checkbox" name="ra[]" value="1">
								<span></span>
							</label>
							<label onclick="checklv('ra', this);">
								<input form="myform" type="checkbox" name="ra[]" value="2">
								<span></span>
							</label>
							<label onclick="checklv('ra', this);">
								<input form="myform" type="checkbox" name="ra[]" value="3">
								<span></span>
							</label>
							<label onclick="checklv('ra', this);">
								<input form="myform" type="checkbox" name="ra[]" value="4">
								<span></span>
							</label>
							<label onclick="checklv('ra', this);">
								<input form="myform" type="checkbox" name="ra[]" value="5">
								<span></span>
							</label>
							<label onclick="checklv('ra', this);">
								<input form="myform" type="checkbox" name="ra[]" value="6">
								<span></span>
							</label>
						</div>
						<div id="at">
							<label onclick="checklv('at', this);">
								<input form="myform" type="checkbox" name="at[]" value="1">
								<span></span>
							</label>
							<label onclick="checklv('at', this);">
								<input form="myform" type="checkbox" name="at[]" value="2">
								<span></span>
							</label>
							<label onclick="checklv('at', this);">
								<input form="myform" type="checkbox" name="at[]" value="3">
								<span></span>
							</label>
							<label onclick="checklv('at', this);">
								<input form="myform" type="checkbox" name="at[]" value="4">
								<span></span>
							</label>
							<label onclick="checklv('at', this);">
								<input form="myform" type="checkbox" name="at[]" value="5">
								<span></span>
							</label>
							<label onclick="checklv('at', this);">
								<input form="myform" type="checkbox" name="at[]" value="6">
								<span></span>
							</label>
						</div>
						<div id="de">
							<label onclick="checklv('de', this);">
								<input form="myform" type="checkbox" name="de[]" value="1">
								<span></span>
							</label>
							<label onclick="checklv('de', this);">
								<input form="myform" type="checkbox" name="de[]" value="2">
								<span></span>
							</label>
							<label onclick="checklv('de', this);">
								<input form="myform" type="checkbox" name="de[]" value="3">
								<span></span>
							</label>
							<label onclick="checklv('de', this);">
								<input form="myform" type="checkbox" name="de[]" value="4">
								<span></span>
							</label>
							<label onclick="checklv('de', this);">
								<input form="myform" type="checkbox" name="de[]" value="5">
								<span></span>
							</label>
							<label onclick="checklv('de', this);">
								<input form="myform" type="checkbox" name="de[]" value="6">
								<span></span>
							</label>
						</div>
					</div>
					<div id="exp">
						<div id="simboloSP" onclick="simboloSP.checkFlag();">
							<img src="" width="10" height="10">
							<img src="img/simboliSP/Combo.png" alt="Combo" width="10" height="10" onclick="changeSP(this);">
							<img src="img/simboliSP/Danni.png" alt="Danni" width="10" height="10" onclick="changeSP(this);">
							<img src="img/simboliSP/Difesa.png" alt="Difesa" width="10" height="10" onclick="changeSP(this);">
							<img src="img/simboliSP/Ferite.png" alt="Ferite" width="10" height="10" onclick="changeSP(this);">
							<img src="img/simboliSP/PA.png" alt="PA" width="10" height="10" onclick="changeSP(this);">
							<script type="text/javascript">var simboloSP = new dropdownMenu('simboloSP', 2500);</script>
						</div>
					</div>
					<div id="tecniche">
						<div class="tecnica">
							<input type="text" class="nome empty" placeholder="Nome tecnica" onchange="checkEmpty(this, 'nome');">
							<input type="text" class="pa empty" placeholder="PA" size="2" onchange="checkEmpty(this, 'pa');">
							<div id="simbolo1_1" onclick="simbolo1_1.checkFlag(); simbolo1_2.hideMenu(); simbolo1_3.hideMenu(); simbolo1_4.hideMenu(); simbolo1_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '1', '2');">B</span>
								<span onclick="selectSymbol(this, '1', '2');">C</span>
								<span onclick="selectSymbol(this, '1', '2');">D</span>
								<span onclick="selectSymbol(this, '1', '2');">E</span>
								<span onclick="selectSymbol(this, '1', '2');">F</span>
								<span onclick="selectSymbol(this, '1', '2');">G</span>
								<span onclick="selectSymbol(this, '1', '2');">H</span>
								<span onclick="selectSymbol(this, '1', '2');">I</span>
								<span onclick="selectSymbol(this, '1', '2');">L</span>
								<span onclick="selectSymbol(this, '1', '2');">M</span>
								<span onclick="selectSymbol(this, '1', '2');">N</span>
								<script type="text/javascript">var simbolo1_1 = new dropdownMenu('simbolo1_1', 2500);</script>
							</div>
							<div id="simbolo1_2" onclick="simbolo1_2.checkFlag(); simbolo1_1.hideMenu(); simbolo1_3.hideMenu(); simbolo1_4.hideMenu(); simbolo1_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '1', '3');">B</span>
								<span onclick="selectSymbol(this, '1', '3');">C</span>
								<span onclick="selectSymbol(this, '1', '3');">D</span>
								<span onclick="selectSymbol(this, '1', '3');">E</span>
								<span onclick="selectSymbol(this, '1', '3');">F</span>
								<span onclick="selectSymbol(this, '1', '3');">G</span>
								<span onclick="selectSymbol(this, '1', '3');">H</span>
								<span onclick="selectSymbol(this, '1', '3');">I</span>
								<span onclick="selectSymbol(this, '1', '3');">L</span>
								<span onclick="selectSymbol(this, '1', '3');">M</span>
								<span onclick="selectSymbol(this, '1', '3');">N</span>
								<script type="text/javascript">var simbolo1_2 = new dropdownMenu('simbolo1_2', 2500);</script>
							</div>
							<div id="simbolo1_3" onclick="simbolo1_3.checkFlag(); simbolo1_1.hideMenu(); simbolo1_2.hideMenu(); simbolo1_4.hideMenu(); simbolo1_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '1', '4');">B</span>
								<span onclick="selectSymbol(this, '1', '4');">C</span>
								<span onclick="selectSymbol(this, '1', '4');">D</span>
								<span onclick="selectSymbol(this, '1', '4');">E</span>
								<span onclick="selectSymbol(this, '1', '4');">F</span>
								<span onclick="selectSymbol(this, '1', '4');">G</span>
								<span onclick="selectSymbol(this, '1', '4');">H</span>
								<span onclick="selectSymbol(this, '1', '4');">I</span>
								<span onclick="selectSymbol(this, '1', '4');">L</span>
								<span onclick="selectSymbol(this, '1', '4');">M</span>
								<span onclick="selectSymbol(this, '1', '4');">N</span>
								<script type="text/javascript">var simbolo1_3 = new dropdownMenu('simbolo1_3', 2500);</script>
							</div>
							<div id="simbolo1_4" onclick="simbolo1_4.checkFlag(); simbolo1_1.hideMenu(); simbolo1_2.hideMenu(); simbolo1_3.hideMenu(); simbolo1_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '1', '5');">B</span>
								<span onclick="selectSymbol(this, '1', '5');">C</span>
								<span onclick="selectSymbol(this, '1', '5');">D</span>
								<span onclick="selectSymbol(this, '1', '5');">E</span>
								<span onclick="selectSymbol(this, '1', '5');">F</span>
								<span onclick="selectSymbol(this, '1', '5');">G</span>
								<span onclick="selectSymbol(this, '1', '5');">H</span>
								<span onclick="selectSymbol(this, '1', '5');">I</span>
								<span onclick="selectSymbol(this, '1', '5');">L</span>
								<span onclick="selectSymbol(this, '1', '5');">M</span>
								<span onclick="selectSymbol(this, '1', '5');">N</span>
								<script type="text/javascript">var simbolo1_4 = new dropdownMenu('simbolo1_4', 2500);</script>
							</div>
							<div id="simbolo1_5" onclick="simbolo1_5.checkFlag(); simbolo1_1.hideMenu(); simbolo1_2.hideMenu(); simbolo1_3.hideMenu(); simbolo1_4.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this);">B</span>
								<span onclick="selectSymbol(this);">C</span>
								<span onclick="selectSymbol(this);">D</span>
								<span onclick="selectSymbol(this);">E</span>
								<span onclick="selectSymbol(this);">F</span>
								<span onclick="selectSymbol(this);">G</span>
								<span onclick="selectSymbol(this);">H</span>
								<span onclick="selectSymbol(this);">I</span>
								<span onclick="selectSymbol(this);">L</span>
								<span onclick="selectSymbol(this);">M</span>
								<span onclick="selectSymbol(this);">N</span>
								<script type="text/javascript">var simbolo1_5 = new dropdownMenu('simbolo1_5', 2500);</script>
							</div>
							<input type="text" class="bonus empty" placeholder="Bonus" size="4" onchange="checkEmpty(this, 'bonus');">
						</div>
						<div class="tecnica">
							<input type="text" class="nome empty" placeholder="Nome tecnica" onchange="checkEmpty(this, 'nome');">
							<input type="text" class="pa empty" placeholder="PA" size="2" onchange="checkEmpty(this, 'pa');">
							<div id="simbolo2_1" onclick="simbolo2_1.checkFlag(); simbolo2_2.hideMenu(); simbolo2_3.hideMenu(); simbolo2_4.hideMenu(); simbolo2_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '2', '2');">B</span>
								<span onclick="selectSymbol(this, '2', '2');">C</span>
								<span onclick="selectSymbol(this, '2', '2');">D</span>
								<span onclick="selectSymbol(this, '2', '2');">E</span>
								<span onclick="selectSymbol(this, '2', '2');">F</span>
								<span onclick="selectSymbol(this, '2', '2');">G</span>
								<span onclick="selectSymbol(this, '2', '2');">H</span>
								<span onclick="selectSymbol(this, '2', '2');">I</span>
								<span onclick="selectSymbol(this, '2', '2');">L</span>
								<span onclick="selectSymbol(this, '2', '2');">M</span>
								<span onclick="selectSymbol(this, '2', '2');">N</span>
								<script type="text/javascript">var simbolo2_1 = new dropdownMenu('simbolo2_1', 2500);</script>
							</div>
							<div id="simbolo2_2" onclick="simbolo2_2.checkFlag(); simbolo2_1.hideMenu(); simbolo2_3.hideMenu(); simbolo2_4.hideMenu(); simbolo2_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '2', '3');">B</span>
								<span onclick="selectSymbol(this, '2', '3');">C</span>
								<span onclick="selectSymbol(this, '2', '3');">D</span>
								<span onclick="selectSymbol(this, '2', '3');">E</span>
								<span onclick="selectSymbol(this, '2', '3');">F</span>
								<span onclick="selectSymbol(this, '2', '3');">G</span>
								<span onclick="selectSymbol(this, '2', '3');">H</span>
								<span onclick="selectSymbol(this, '2', '3');">I</span>
								<span onclick="selectSymbol(this, '2', '3');">L</span>
								<span onclick="selectSymbol(this, '2', '3');">M</span>
								<span onclick="selectSymbol(this, '2', '3');">N</span>
								<script type="text/javascript">var simbolo2_2 = new dropdownMenu('simbolo2_2', 2500);</script>
							</div>
							<div id="simbolo2_3" onclick="simbolo2_3.checkFlag(); simbolo2_1.hideMenu(); simbolo2_2.hideMenu(); simbolo2_4.hideMenu(); simbolo2_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '2', '4');">B</span>
								<span onclick="selectSymbol(this, '2', '4');">C</span>
								<span onclick="selectSymbol(this, '2', '4');">D</span>
								<span onclick="selectSymbol(this, '2', '4');">E</span>
								<span onclick="selectSymbol(this, '2', '4');">F</span>
								<span onclick="selectSymbol(this, '2', '4');">G</span>
								<span onclick="selectSymbol(this, '2', '4');">H</span>
								<span onclick="selectSymbol(this, '2', '4');">I</span>
								<span onclick="selectSymbol(this, '2', '4');">L</span>
								<span onclick="selectSymbol(this, '2', '4');">M</span>
								<span onclick="selectSymbol(this, '2', '4');">N</span>
								<script type="text/javascript">var simbolo2_3 = new dropdownMenu('simbolo2_3', 2500);</script>
							</div>
							<div id="simbolo2_4" onclick="simbolo2_4.checkFlag(); simbolo2_1.hideMenu(); simbolo2_2.hideMenu(); simbolo2_3.hideMenu(); simbolo2_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '2', '5');">B</span>
								<span onclick="selectSymbol(this, '2', '5');">C</span>
								<span onclick="selectSymbol(this, '2', '5');">D</span>
								<span onclick="selectSymbol(this, '2', '5');">E</span>
								<span onclick="selectSymbol(this, '2', '5');">F</span>
								<span onclick="selectSymbol(this, '2', '5');">G</span>
								<span onclick="selectSymbol(this, '2', '5');">H</span>
								<span onclick="selectSymbol(this, '2', '5');">I</span>
								<span onclick="selectSymbol(this, '2', '5');">L</span>
								<span onclick="selectSymbol(this, '2', '5');">M</span>
								<span onclick="selectSymbol(this, '2', '5');">N</span>
								<script type="text/javascript">var simbolo2_4 = new dropdownMenu('simbolo2_4', 2500);</script>
							</div>
							<div id="simbolo2_5" onclick="simbolo2_5.checkFlag(); simbolo2_1.hideMenu(); simbolo2_2.hideMenu(); simbolo2_3.hideMenu(); simbolo2_4.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '2', '6');">B</span>
								<span onclick="selectSymbol(this, '2', '6');">C</span>
								<span onclick="selectSymbol(this, '2', '6');">D</span>
								<span onclick="selectSymbol(this, '2', '6');">E</span>
								<span onclick="selectSymbol(this, '2', '6');">F</span>
								<span onclick="selectSymbol(this, '2', '6');">G</span>
								<span onclick="selectSymbol(this, '2', '6');">H</span>
								<span onclick="selectSymbol(this, '2', '6');">I</span>
								<span onclick="selectSymbol(this, '2', '6');">L</span>
								<span onclick="selectSymbol(this, '2', '6');">M</span>
								<span onclick="selectSymbol(this, '2', '6');">N</span>
								<script type="text/javascript">var simbolo2_5 = new dropdownMenu('simbolo2_5', 2500);</script>
							</div>
							<input type="text" class="bonus empty" placeholder="Bonus" size="4" onchange="checkEmpty(this, 'bonus');">
						</div>
						<div class="tecnica">
							<input type="text" class="nome empty" placeholder="Nome tecnica" onchange="checkEmpty(this, 'nome');">
							<input type="text" class="pa empty" placeholder="PA" size="2" onchange="checkEmpty(this, 'pa');">
							<div id="simbolo3_1" onclick="simbolo3_1.checkFlag(); simbolo3_2.hideMenu(); simbolo3_3.hideMenu(); simbolo3_4.hideMenu(); simbolo3_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '3', '2');">B</span>
								<span onclick="selectSymbol(this, '3', '2');">C</span>
								<span onclick="selectSymbol(this, '3', '2');">D</span>
								<span onclick="selectSymbol(this, '3', '2');">E</span>
								<span onclick="selectSymbol(this, '3', '2');">F</span>
								<span onclick="selectSymbol(this, '3', '2');">G</span>
								<span onclick="selectSymbol(this, '3', '2');">H</span>
								<span onclick="selectSymbol(this, '3', '2');">I</span>
								<span onclick="selectSymbol(this, '3', '2');">L</span>
								<span onclick="selectSymbol(this, '3', '2');">M</span>
								<span onclick="selectSymbol(this, '3', '2');">N</span>
								<script type="text/javascript">var simbolo3_1 = new dropdownMenu('simbolo3_1', 2500);</script>
							</div>
							<div id="simbolo3_2" onclick="simbolo3_2.checkFlag(); simbolo3_1.hideMenu(); simbolo3_3.hideMenu(); simbolo3_4.hideMenu(); simbolo3_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '3', '3');">B</span>
								<span onclick="selectSymbol(this, '3', '3');">C</span>
								<span onclick="selectSymbol(this, '3', '3');">D</span>
								<span onclick="selectSymbol(this, '3', '3');">E</span>
								<span onclick="selectSymbol(this, '3', '3');">F</span>
								<span onclick="selectSymbol(this, '3', '3');">G</span>
								<span onclick="selectSymbol(this, '3', '3');">H</span>
								<span onclick="selectSymbol(this, '3', '3');">I</span>
								<span onclick="selectSymbol(this, '3', '3');">L</span>
								<span onclick="selectSymbol(this, '3', '3');">M</span>
								<span onclick="selectSymbol(this, '3', '3');">N</span>
								<script type="text/javascript">var simbolo3_2 = new dropdownMenu('simbolo3_2', 2500);</script>
							</div>
							<div id="simbolo3_3" onclick="simbolo3_3.checkFlag(); simbolo3_1.hideMenu(); simbolo3_2.hideMenu(); simbolo3_4.hideMenu(); simbolo3_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '3', '4');">B</span>
								<span onclick="selectSymbol(this, '3', '4');">C</span>
								<span onclick="selectSymbol(this, '3', '4');">D</span>
								<span onclick="selectSymbol(this, '3', '4');">E</span>
								<span onclick="selectSymbol(this, '3', '4');">F</span>
								<span onclick="selectSymbol(this, '3', '4');">G</span>
								<span onclick="selectSymbol(this, '3', '4');">H</span>
								<span onclick="selectSymbol(this, '3', '4');">I</span>
								<span onclick="selectSymbol(this, '3', '4');">L</span>
								<span onclick="selectSymbol(this, '3', '4');">M</span>
								<span onclick="selectSymbol(this, '3', '4');">N</span>
								<script type="text/javascript">var simbolo3_3 = new dropdownMenu('simbolo3_3', 2500);</script>
							</div>
							<div id="simbolo3_4" onclick="simbolo3_4.checkFlag(); simbolo3_1.hideMenu(); simbolo3_2.hideMenu(); simbolo3_3.hideMenu(); simbolo3_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '3', '5');">B</span>
								<span onclick="selectSymbol(this, '3', '5');">C</span>
								<span onclick="selectSymbol(this, '3', '5');">D</span>
								<span onclick="selectSymbol(this, '3', '5');">E</span>
								<span onclick="selectSymbol(this, '3', '5');">F</span>
								<span onclick="selectSymbol(this, '3', '5');">G</span>
								<span onclick="selectSymbol(this, '3', '5');">H</span>
								<span onclick="selectSymbol(this, '3', '5');">I</span>
								<span onclick="selectSymbol(this, '3', '5');">L</span>
								<span onclick="selectSymbol(this, '3', '5');">M</span>
								<span onclick="selectSymbol(this, '3', '5');">N</span>
								<script type="text/javascript">var simbolo3_4 = new dropdownMenu('simbolo3_4', 2500);</script>
							</div>
							<div id="simbolo3_5" onclick="simbolo3_5.checkFlag(); simbolo3_1.hideMenu(); simbolo3_2.hideMenu(); simbolo3_3.hideMenu(); simbolo3_4.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '3', '6');">B</span>
								<span onclick="selectSymbol(this, '3', '6');">C</span>
								<span onclick="selectSymbol(this, '3', '6');">D</span>
								<span onclick="selectSymbol(this, '3', '6');">E</span>
								<span onclick="selectSymbol(this, '3', '6');">F</span>
								<span onclick="selectSymbol(this, '3', '6');">G</span>
								<span onclick="selectSymbol(this, '3', '6');">H</span>
								<span onclick="selectSymbol(this, '3', '6');">I</span>
								<span onclick="selectSymbol(this, '3', '6');">L</span>
								<span onclick="selectSymbol(this, '3', '6');">M</span>
								<span onclick="selectSymbol(this, '3', '6');">N</span>
								<script type="text/javascript">var simbolo3_5 = new dropdownMenu('simbolo3_5', 2500);</script>
							</div>
							<input type="text" class="bonus empty" placeholder="Bonus" size="4" onchange="checkEmpty(this, 'bonus');">
						</div>
						<div class="tecnica">
							<input type="text" class="nome empty" placeholder="Nome tecnica" onchange="checkEmpty(this, 'nome');">
							<input type="text" class="pa empty" placeholder="PA" size="2" onchange="checkEmpty(this, 'pa');">
							<div id="simbolo4_1" onclick="simbolo4_1.checkFlag(); simbolo4_2.hideMenu(); simbolo4_3.hideMenu(); simbolo4_4.hideMenu(); simbolo4_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '4', '2');">B</span>
								<span onclick="selectSymbol(this, '4', '2');">C</span>
								<span onclick="selectSymbol(this, '4', '2');">D</span>
								<span onclick="selectSymbol(this, '4', '2');">E</span>
								<span onclick="selectSymbol(this, '4', '2');">F</span>
								<span onclick="selectSymbol(this, '4', '2');">G</span>
								<span onclick="selectSymbol(this, '4', '2');">H</span>
								<span onclick="selectSymbol(this, '4', '2');">I</span>
								<span onclick="selectSymbol(this, '4', '2');">L</span>
								<span onclick="selectSymbol(this, '4', '2');">M</span>
								<span onclick="selectSymbol(this, '4', '2');">N</span>
								<script type="text/javascript">var simbolo4_1 = new dropdownMenu('simbolo4_1', 2500);</script>
							</div>
							<div id="simbolo4_2" onclick="simbolo4_2.checkFlag(); simbolo4_1.hideMenu(); simbolo4_3.hideMenu(); simbolo4_4.hideMenu(); simbolo4_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '4', '3');">B</span>
								<span onclick="selectSymbol(this, '4', '3');">C</span>
								<span onclick="selectSymbol(this, '4', '3');">D</span>
								<span onclick="selectSymbol(this, '4', '3');">E</span>
								<span onclick="selectSymbol(this, '4', '3');">F</span>
								<span onclick="selectSymbol(this, '4', '3');">G</span>
								<span onclick="selectSymbol(this, '4', '3');">H</span>
								<span onclick="selectSymbol(this, '4', '3');">I</span>
								<span onclick="selectSymbol(this, '4', '3');">L</span>
								<span onclick="selectSymbol(this, '4', '3');">M</span>
								<span onclick="selectSymbol(this, '4', '3');">N</span>
								<script type="text/javascript">var simbolo4_2 = new dropdownMenu('simbolo4_2', 2500);</script>
							</div>
							<div id="simbolo4_3" onclick="simbolo4_3.checkFlag(); simbolo4_1.hideMenu(); simbolo4_2.hideMenu(); simbolo4_4.hideMenu(); simbolo4_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '4', '4');">B</span>
								<span onclick="selectSymbol(this, '4', '4');">C</span>
								<span onclick="selectSymbol(this, '4', '4');">D</span>
								<span onclick="selectSymbol(this, '4', '4');">E</span>
								<span onclick="selectSymbol(this, '4', '4');">F</span>
								<span onclick="selectSymbol(this, '4', '4');">G</span>
								<span onclick="selectSymbol(this, '4', '4');">H</span>
								<span onclick="selectSymbol(this, '4', '4');">I</span>
								<span onclick="selectSymbol(this, '4', '4');">L</span>
								<span onclick="selectSymbol(this, '4', '4');">M</span>
								<span onclick="selectSymbol(this, '4', '4');">N</span>
								<script type="text/javascript">var simbolo4_3 = new dropdownMenu('simbolo4_3', 2500);</script>
							</div>
							<div id="simbolo4_4" onclick="simbolo4_4.checkFlag(); simbolo4_1.hideMenu(); simbolo4_2.hideMenu(); simbolo4_3.hideMenu(); simbolo4_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '4', '5');">B</span>
								<span onclick="selectSymbol(this, '4', '5');">C</span>
								<span onclick="selectSymbol(this, '4', '5');">D</span>
								<span onclick="selectSymbol(this, '4', '5');">E</span>
								<span onclick="selectSymbol(this, '4', '5');">F</span>
								<span onclick="selectSymbol(this, '4', '5');">G</span>
								<span onclick="selectSymbol(this, '4', '5');">H</span>
								<span onclick="selectSymbol(this, '4', '5');">I</span>
								<span onclick="selectSymbol(this, '4', '5');">L</span>
								<span onclick="selectSymbol(this, '4', '5');">M</span>
								<span onclick="selectSymbol(this, '4', '5');">N</span>
								<script type="text/javascript">var simbolo4_4 = new dropdownMenu('simbolo4_4', 2500);</script>
							</div>
							<div id="simbolo4_5" onclick="simbolo4_5.checkFlag(); simbolo4_1.hideMenu(); simbolo4_2.hideMenu(); simbolo4_3.hideMenu(); simbolo4_4.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '4', '6');">B</span>
								<span onclick="selectSymbol(this, '4', '6');">C</span>
								<span onclick="selectSymbol(this, '4', '6');">D</span>
								<span onclick="selectSymbol(this, '4', '6');">E</span>
								<span onclick="selectSymbol(this, '4', '6');">F</span>
								<span onclick="selectSymbol(this, '4', '6');">G</span>
								<span onclick="selectSymbol(this, '4', '6');">H</span>
								<span onclick="selectSymbol(this, '4', '6');">I</span>
								<span onclick="selectSymbol(this, '4', '6');">L</span>
								<span onclick="selectSymbol(this, '4', '6');">M</span>
								<span onclick="selectSymbol(this, '4', '6');">N</span>
								<script type="text/javascript">var simbolo4_5 = new dropdownMenu('simbolo4_5', 2500);</script>
							</div>
							<input type="text" class="bonus empty" placeholder="Bonus" size="4" onchange="checkEmpty(this, 'bonus');">
						</div>
						<div class="tecnica">
							<input type="text" class="nome empty" placeholder="Nome tecnica" onchange="checkEmpty(this, 'nome');">
							<input type="text" class="pa empty" placeholder="PA" size="2" onchange="checkEmpty(this, 'pa');">
							<div id="simbolo5_1" onclick="simbolo5_1.checkFlag(); simbolo5_2.hideMenu(); simbolo5_3.hideMenu(); simbolo5_4.hideMenu(); simbolo5_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '5', '2');">B</span>
								<span onclick="selectSymbol(this, '5', '2');">C</span>
								<span onclick="selectSymbol(this, '5', '2');">D</span>
								<span onclick="selectSymbol(this, '5', '2');">E</span>
								<span onclick="selectSymbol(this, '5', '2');">F</span>
								<span onclick="selectSymbol(this, '5', '2');">G</span>
								<span onclick="selectSymbol(this, '5', '2');">H</span>
								<span onclick="selectSymbol(this, '5', '2');">I</span>
								<span onclick="selectSymbol(this, '5', '2');">L</span>
								<span onclick="selectSymbol(this, '5', '2');">M</span>
								<span onclick="selectSymbol(this, '5', '2');">N</span>
								<script type="text/javascript">var simbolo5_1 = new dropdownMenu('simbolo5_1', 2500);</script>
							</div>
							<div id="simbolo5_2" onclick="simbolo5_2.checkFlag(); simbolo5_1.hideMenu(); simbolo5_3.hideMenu(); simbolo5_4.hideMenu(); simbolo5_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '5', '3');">B</span>
								<span onclick="selectSymbol(this, '5', '3');">C</span>
								<span onclick="selectSymbol(this, '5', '3');">D</span>
								<span onclick="selectSymbol(this, '5', '3');">E</span>
								<span onclick="selectSymbol(this, '5', '3');">F</span>
								<span onclick="selectSymbol(this, '5', '3');">G</span>
								<span onclick="selectSymbol(this, '5', '3');">H</span>
								<span onclick="selectSymbol(this, '5', '3');">I</span>
								<span onclick="selectSymbol(this, '5', '3');">L</span>
								<span onclick="selectSymbol(this, '5', '3');">M</span>
								<span onclick="selectSymbol(this, '5', '3');">N</span>
								<script type="text/javascript">var simbolo5_2 = new dropdownMenu('simbolo5_2', 2500);</script>
							</div>
							<div id="simbolo5_3" onclick="simbolo5_3.checkFlag(); simbolo5_1.hideMenu(); simbolo5_2.hideMenu(); simbolo5_4.hideMenu(); simbolo5_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '5', '4');">B</span>
								<span onclick="selectSymbol(this, '5', '4');">C</span>
								<span onclick="selectSymbol(this, '5', '4');">D</span>
								<span onclick="selectSymbol(this, '5', '4');">E</span>
								<span onclick="selectSymbol(this, '5', '4');">F</span>
								<span onclick="selectSymbol(this, '5', '4');">G</span>
								<span onclick="selectSymbol(this, '5', '4');">H</span>
								<span onclick="selectSymbol(this, '5', '4');">I</span>
								<span onclick="selectSymbol(this, '5', '4');">L</span>
								<span onclick="selectSymbol(this, '5', '4');">M</span>
								<span onclick="selectSymbol(this, '5', '4');">N</span>
								<script type="text/javascript">var simbolo5_3 = new dropdownMenu('simbolo5_3', 2500);</script>
							</div>
							<div id="simbolo5_4" onclick="simbolo5_4.checkFlag(); simbolo5_1.hideMenu(); simbolo5_2.hideMenu(); simbolo5_3.hideMenu(); simbolo5_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '5', '5');">B</span>
								<span onclick="selectSymbol(this, '5', '5');">C</span>
								<span onclick="selectSymbol(this, '5', '5');">D</span>
								<span onclick="selectSymbol(this, '5', '5');">E</span>
								<span onclick="selectSymbol(this, '5', '5');">F</span>
								<span onclick="selectSymbol(this, '5', '5');">G</span>
								<span onclick="selectSymbol(this, '5', '5');">H</span>
								<span onclick="selectSymbol(this, '5', '5');">I</span>
								<span onclick="selectSymbol(this, '5', '5');">L</span>
								<span onclick="selectSymbol(this, '5', '5');">M</span>
								<span onclick="selectSymbol(this, '5', '5');">N</span>
								<script type="text/javascript">var simbolo5_4 = new dropdownMenu('simbolo5_4', 2500);</script>
							</div>
							<div id="simbolo5_5" onclick="simbolo5_5.checkFlag(); simbolo5_1.hideMenu(); simbolo5_2.hideMenu(); simbolo5_3.hideMenu(); simbolo5_4.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '5', '6');">B</span>
								<span onclick="selectSymbol(this, '5', '6');">C</span>
								<span onclick="selectSymbol(this, '5', '6');">D</span>
								<span onclick="selectSymbol(this, '5', '6');">E</span>
								<span onclick="selectSymbol(this, '5', '6');">F</span>
								<span onclick="selectSymbol(this, '5', '6');">G</span>
								<span onclick="selectSymbol(this, '5', '6');">H</span>
								<span onclick="selectSymbol(this, '5', '6');">I</span>
								<span onclick="selectSymbol(this, '5', '6');">L</span>
								<span onclick="selectSymbol(this, '5', '6');">M</span>
								<span onclick="selectSymbol(this, '5', '6');">N</span>
								<script type="text/javascript">var simbolo5_5 = new dropdownMenu('simbolo5_5', 2500);</script>
							</div>
							<input type="text" class="bonus empty" placeholder="Bonus" size="4" onchange="checkEmpty(this, 'bonus');">
						</div>
						<div class="spacer"></div>
						<div class="tecnica">
							<input type="text" class="nome empty" placeholder="Nome tecnica" onchange="checkEmpty(this, 'nome');">
							<input type="text" class="pa empty" placeholder="PA" size="2" onchange="checkEmpty(this, 'pa');">
							<div id="simbolo6_1" onclick="simbolo6_1.checkFlag(); simbolo6_2.hideMenu(); simbolo6_3.hideMenu(); simbolo6_4.hideMenu(); simbolo6_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '6', '2');">B</span>
								<span onclick="selectSymbol(this, '6', '2');">C</span>
								<span onclick="selectSymbol(this, '6', '2');">D</span>
								<span onclick="selectSymbol(this, '6', '2');">E</span>
								<span onclick="selectSymbol(this, '6', '2');">F</span>
								<span onclick="selectSymbol(this, '6', '2');">G</span>
								<span onclick="selectSymbol(this, '6', '2');">H</span>
								<span onclick="selectSymbol(this, '6', '2');">I</span>
								<span onclick="selectSymbol(this, '6', '2');">L</span>
								<span onclick="selectSymbol(this, '6', '2');">M</span>
								<span onclick="selectSymbol(this, '6', '2');">N</span>
								<script type="text/javascript">var simbolo6_1 = new dropdownMenu('simbolo6_1', 2500);</script>
							</div>
							<div id="simbolo6_2" onclick="simbolo6_2.checkFlag(); simbolo6_1.hideMenu(); simbolo6_3.hideMenu(); simbolo6_4.hideMenu(); simbolo6_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '6', '3');">B</span>
								<span onclick="selectSymbol(this, '6', '3');">C</span>
								<span onclick="selectSymbol(this, '6', '3');">D</span>
								<span onclick="selectSymbol(this, '6', '3');">E</span>
								<span onclick="selectSymbol(this, '6', '3');">F</span>
								<span onclick="selectSymbol(this, '6', '3');">G</span>
								<span onclick="selectSymbol(this, '6', '3');">H</span>
								<span onclick="selectSymbol(this, '6', '3');">I</span>
								<span onclick="selectSymbol(this, '6', '3');">L</span>
								<span onclick="selectSymbol(this, '6', '3');">M</span>
								<span onclick="selectSymbol(this, '6', '3');">N</span>
								<script type="text/javascript">var simbolo6_2 = new dropdownMenu('simbolo6_2', 2500);</script>
							</div>
							<div id="simbolo6_3" onclick="simbolo6_3.checkFlag(); simbolo6_1.hideMenu(); simbolo6_2.hideMenu(); simbolo6_4.hideMenu(); simbolo6_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '6', '4');">B</span>
								<span onclick="selectSymbol(this, '6', '4');">C</span>
								<span onclick="selectSymbol(this, '6', '4');">D</span>
								<span onclick="selectSymbol(this, '6', '4');">E</span>
								<span onclick="selectSymbol(this, '6', '4');">F</span>
								<span onclick="selectSymbol(this, '6', '4');">G</span>
								<span onclick="selectSymbol(this, '6', '4');">H</span>
								<span onclick="selectSymbol(this, '6', '4');">I</span>
								<span onclick="selectSymbol(this, '6', '4');">L</span>
								<span onclick="selectSymbol(this, '6', '4');">M</span>
								<span onclick="selectSymbol(this, '6', '4');">N</span>
								<script type="text/javascript">var simbolo6_3 = new dropdownMenu('simbolo6_3', 2500);</script>
							</div>
							<div id="simbolo6_4" onclick="simbolo6_4.checkFlag(); simbolo6_1.hideMenu(); simbolo6_2.hideMenu(); simbolo6_3.hideMenu(); simbolo6_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '6', '5');">B</span>
								<span onclick="selectSymbol(this, '6', '5');">C</span>
								<span onclick="selectSymbol(this, '6', '5');">D</span>
								<span onclick="selectSymbol(this, '6', '5');">E</span>
								<span onclick="selectSymbol(this, '6', '5');">F</span>
								<span onclick="selectSymbol(this, '6', '5');">G</span>
								<span onclick="selectSymbol(this, '6', '5');">H</span>
								<span onclick="selectSymbol(this, '6', '5');">I</span>
								<span onclick="selectSymbol(this, '6', '5');">L</span>
								<span onclick="selectSymbol(this, '6', '5');">M</span>
								<span onclick="selectSymbol(this, '6', '5');">N</span>
								<script type="text/javascript">var simbolo6_4 = new dropdownMenu('simbolo6_4', 2500);</script>
							</div>
							<div id="simbolo6_5" onclick="simbolo6_5.checkFlag(); simbolo6_1.hideMenu(); simbolo6_2.hideMenu(); simbolo6_3.hideMenu(); simbolo6_4.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '6', '6');">B</span>
								<span onclick="selectSymbol(this, '6', '6');">C</span>
								<span onclick="selectSymbol(this, '6', '6');">D</span>
								<span onclick="selectSymbol(this, '6', '6');">E</span>
								<span onclick="selectSymbol(this, '6', '6');">F</span>
								<span onclick="selectSymbol(this, '6', '6');">G</span>
								<span onclick="selectSymbol(this, '6', '6');">H</span>
								<span onclick="selectSymbol(this, '6', '6');">I</span>
								<span onclick="selectSymbol(this, '6', '6');">L</span>
								<span onclick="selectSymbol(this, '6', '6');">M</span>
								<span onclick="selectSymbol(this, '6', '6');">N</span>
								<script type="text/javascript">var simbolo6_5 = new dropdownMenu('simbolo6_5', 2500);</script>
							</div>
							<input type="text" class="bonus empty" placeholder="Bonus" size="4" onchange="checkEmpty(this, 'bonus');">
						</div>
						<div class="tecnica">
							<input type="text" class="nome empty" placeholder="Nome tecnica" onchange="checkEmpty(this, 'nome');">
							<input type="text" class="pa empty" placeholder="PA" size="2" onchange="checkEmpty(this, 'pa');">
							<div id="simbolo7_1" onclick="simbolo7_1.checkFlag(); simbolo7_2.hideMenu(); simbolo7_3.hideMenu(); simbolo7_4.hideMenu(); simbolo7_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '7', '2');">B</span>
								<span onclick="selectSymbol(this, '7', '2');">C</span>
								<span onclick="selectSymbol(this, '7', '2');">D</span>
								<span onclick="selectSymbol(this, '7', '2');">E</span>
								<span onclick="selectSymbol(this, '7', '2');">F</span>
								<span onclick="selectSymbol(this, '7', '2');">G</span>
								<span onclick="selectSymbol(this, '7', '2');">H</span>
								<span onclick="selectSymbol(this, '7', '2');">I</span>
								<span onclick="selectSymbol(this, '7', '2');">L</span>
								<span onclick="selectSymbol(this, '7', '2');">M</span>
								<span onclick="selectSymbol(this, '7', '2');">N</span>
								<script type="text/javascript">var simbolo7_1 = new dropdownMenu('simbolo7_1', 2500);</script>
							</div>
							<div id="simbolo7_2" onclick="simbolo7_2.checkFlag(); simbolo7_1.hideMenu(); simbolo7_3.hideMenu(); simbolo7_4.hideMenu(); simbolo7_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '7', '3');">B</span>
								<span onclick="selectSymbol(this, '7', '3');">C</span>
								<span onclick="selectSymbol(this, '7', '3');">D</span>
								<span onclick="selectSymbol(this, '7', '3');">E</span>
								<span onclick="selectSymbol(this, '7', '3');">F</span>
								<span onclick="selectSymbol(this, '7', '3');">G</span>
								<span onclick="selectSymbol(this, '7', '3');">H</span>
								<span onclick="selectSymbol(this, '7', '3');">I</span>
								<span onclick="selectSymbol(this, '7', '3');">L</span>
								<span onclick="selectSymbol(this, '7', '3');">M</span>
								<span onclick="selectSymbol(this, '7', '3');">N</span>
								<script type="text/javascript">var simbolo7_2 = new dropdownMenu('simbolo7_2', 2500);</script>
							</div>
							<div id="simbolo7_3" onclick="simbolo7_3.checkFlag(); simbolo7_1.hideMenu(); simbolo7_2.hideMenu(); simbolo7_4.hideMenu(); simbolo7_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '7', '4');">B</span>
								<span onclick="selectSymbol(this, '7', '4');">C</span>
								<span onclick="selectSymbol(this, '7', '4');">D</span>
								<span onclick="selectSymbol(this, '7', '4');">E</span>
								<span onclick="selectSymbol(this, '7', '4');">F</span>
								<span onclick="selectSymbol(this, '7', '4');">G</span>
								<span onclick="selectSymbol(this, '7', '4');">H</span>
								<span onclick="selectSymbol(this, '7', '4');">I</span>
								<span onclick="selectSymbol(this, '7', '4');">L</span>
								<span onclick="selectSymbol(this, '7', '4');">M</span>
								<span onclick="selectSymbol(this, '7', '4');">N</span>
								<script type="text/javascript">var simbolo7_3 = new dropdownMenu('simbolo7_3', 2500);</script>
							</div>
							<div id="simbolo7_4" onclick="simbolo7_4.checkFlag(); simbolo7_1.hideMenu(); simbolo7_2.hideMenu(); simbolo7_3.hideMenu(); simbolo7_5.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '7', '5');">B</span>
								<span onclick="selectSymbol(this, '7', '5');">C</span>
								<span onclick="selectSymbol(this, '7', '5');">D</span>
								<span onclick="selectSymbol(this, '7', '5');">E</span>
								<span onclick="selectSymbol(this, '7', '5');">F</span>
								<span onclick="selectSymbol(this, '7', '5');">G</span>
								<span onclick="selectSymbol(this, '7', '5');">H</span>
								<span onclick="selectSymbol(this, '7', '5');">I</span>
								<span onclick="selectSymbol(this, '7', '5');">L</span>
								<span onclick="selectSymbol(this, '7', '5');">M</span>
								<span onclick="selectSymbol(this, '7', '5');">N</span>
								<script type="text/javascript">var simbolo7_4 = new dropdownMenu('simbolo7_4', 2500);</script>
							</div>
							<div id="simbolo7_5" onclick="simbolo7_5.checkFlag(); simbolo7_1.hideMenu(); simbolo7_2.hideMenu(); simbolo7_3.hideMenu(); simbolo7_4.hideMenu();">
								<span>&nbsp;</span>
								<span onclick="selectSymbol(this, '7', '6');">B</span>
								<span onclick="selectSymbol(this, '7', '6');">C</span>
								<span onclick="selectSymbol(this, '7', '6');">D</span>
								<span onclick="selectSymbol(this, '7', '6');">E</span>
								<span onclick="selectSymbol(this, '7', '6');">F</span>
								<span onclick="selectSymbol(this, '7', '6');">G</span>
								<span onclick="selectSymbol(this, '7', '6');">H</span>
								<span onclick="selectSymbol(this, '7', '6');">I</span>
								<span onclick="selectSymbol(this, '7', '6');">L</span>
								<span onclick="selectSymbol(this, '7', '6');">M</span>
								<span onclick="selectSymbol(this, '7', '6');">N</span>
								<script type="text/javascript">var simbolo7_5 = new dropdownMenu('simbolo7_5', 2500);</script>
							</div>
							<input type="text" class="bonus empty" placeholder="Bonus" size="4" onchange="checkEmpty(this, 'bonus');">
						</div>
					</div>
				</div>
				<div id="background">
					<div id="bgImage">
						<input type="file" onchange="PreviewImage();" />
					</div>
					<div id="bgColor">
						<img src="img/bg/thumb/Background_02.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_02.jpg');">
						<img src="img/bg/thumb/Background_03.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_03.jpg');">
						<img src="img/bg/thumb/Background_04.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_04.jpg');">
						<img src="img/bg/thumb/Background_05.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_05.jpg');">
						<img src="img/bg/thumb/Background_06.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_06.jpg');">
						<img src="img/bg/thumb/Background_07.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_07.jpg');">
						<img src="img/bg/thumb/Background_08.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_08.jpg');">
						<img src="img/bg/thumb/Background_09.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_09.jpg');">
						<img src="img/bg/thumb/Background_10.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_10.jpg');">
						<img src="img/bg/thumb/Background_11.png" alt="Background_02" width="20" height="20" onclick="changeBg('Background_11.jpg');">
					</div>
				</div>
			</div>
		</div>
			<!--
				
			
			
			
				
				
					
						
					
					
					
						
					</div>
				</div>
				
			</div>
		</div>-->
	</body>
</html>