<style>
	div#advancedName {
		width: 500px;
		height: 200px;
	}

	div#advancedName input[type=text] {
		position: relative;
		display: block;
		width: 500px;
		height: 50px;
		margin: 0;
		color: #ffffff;
		font-family: "Regular";
		font-size: 30pt;
		text-align: center;
		border: none;
		background: none;
	}

	div#advancedName div {
		width: 230px;
		height: 105px;
		padding-left: 20px;
	}

	div#advancedName div span {
		display: block;
		float: left;
		width: 100%;
		height: 35px;
		opacity: 1;
		transition: 1s;
	}

	div#advancedName div.inactive span {
		opacity: 0;
	}

	div#advancedName div span input {
		width: 200px;
	}

	div#advancedName input[type=button] {
		position: absolute;
		right: 10px;
		bottom: 5px;
	}
</style>

<div id="advancedName">
	<input type="text" value="Modifica nome PG" onkeyup="changeName(this.value);">
	<div class="adv">
		<br>
		<span>R: <input type="range" min="0" max="255" value="255" oninput="changeColor(this.parentNode.parentNode.parentNode);" onchange="changeColor(this.parentNode.parentNode.parentNode);"></span>
		<span>G: <input type="range" min="0" max="255" value="200" oninput="changeColor(this.parentNode.parentNode.parentNode);" onchange="changeColor(this.parentNode.parentNode.parentNode);"></span>
		<span>B: <input type="range" min="0" max="255" value="26" oninput="changeColor(this.parentNode.parentNode.parentNode);" onchange="changeColor(this.parentNode.parentNode.parentNode);"></span>
	</div>
	<div class="adv inactive">
		Attiva gradiente: <input type="checkbox" onclick="this.parentNode.classList.toggle('inactive'); changeColor(this.parentNode.parentNode);">
		<span>R: <input type="range" min="0" max="255" value="254" oninput="changeColor(this.parentNode.parentNode.parentNode);" onchange="changeColor(this.parentNode.parentNode.parentNode);"></span>
		<span>G: <input type="range" min="0" max="255" value="99" oninput="changeColor(this.parentNode.parentNode.parentNode);" onchange="changeColor(this.parentNode.parentNode.parentNode);"></span>
		<span>B: <input type="range" min="0" max="255" value="7" oninput="changeColor(this.parentNode.parentNode.parentNode);" onchange="changeColor(this.parentNode.parentNode.parentNode);"></span>
	</div>
	<input type="button" value="Conferma" onclick="lightbox.hide();">
</div>