function canvasInit() {
	canvas = document.getElementById("nome").getElementsByTagName("canvas")[0];
	context = canvas.getContext("2d");

	context.font = "110px Regular";
	context.textAlign = 'center';

	gradient = context.createLinearGradient(0, 0, 0, canvas.height);
	gradient.addColorStop("0", "rgb(255,200,26)");
	gradient.addColorStop(".5", "rgb(254,99,7)");

	context.fillStyle = gradient;
	context.fillText("Modifica nome PG", 748, 100);
}

function advancedName() {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		switch (xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					document.getElementById("lightcontents").innerHTML = xmlhttp.responseText;
					lightbox.show();
				} else {
					document.getElementById("lightcontents").innerHTML = "Trasmission error, retry";
				}
				break;
		}
	}
	xmlhttp.open("GET", "advancedName.php", true);
	xmlhttp.send();
}

function changeName(name) {
	canvas = document.getElementById("nome").getElementsByTagName("canvas")[0];
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	canvas.getContext('2d').fillText(name, 748, 100);
}

function changeColor(gna) {
	div = document.getElementById("advancedName");
	name = div.getElementsByTagName('input')[0].value;
	colors = div.getElementsByTagName('div');

	R = colors[0].getElementsByTagName('input')[0].value;
	G = colors[0].getElementsByTagName('input')[1].value;
	B = colors[0].getElementsByTagName('input')[2].value;

	check = colors[1].getElementsByTagName('input')[0].checked;
	Rg = colors[1].getElementsByTagName('input')[1].value;
	Gg = colors[1].getElementsByTagName('input')[2].value;
	Bg = colors[1].getElementsByTagName('input')[3].value;

	canvas = document.getElementById("nome").getElementsByTagName("canvas")[0];
	context = canvas.getContext("2d");
	gradient = context.createLinearGradient(0, 0, 0, canvas.height);

	if (check) {
		gradient.addColorStop("0", "rgb("+R+", "+G+", "+B+")");
		gradient.addColorStop(".5", "rgb("+Rg+", "+Gg+", "+Bg+")");
	} else {
		gradient.addColorStop("1", "rgb("+R+", "+G+", "+B+")");
	}
	context.fillStyle = gradient;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText(name, 748, 100);
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
}

function changeBg (bg) {
	document.getElementById("page").style.backgroundImage = 'url("img/bg/large/'+bg+'")';
}

function previewImage(image, canvas, wide) {
	var imageData = new Image();
	var file = new FileReader();
	file.readAsDataURL(image.files[0]);
	file.onload = function () {
		imageData.src = file.result;
		imageData.onload = function() {
			if (wide) {
				if (imageData.width > imageData.height) document.getElementById(canvas).style.backgroundSize = "100% auto";
				else document.getElementById(canvas).style.backgroundSize = "auto 100%";
			}
		};

		document.getElementById(canvas).style.backgroundImage = "url("+file.result+")";
	}
}

function imageResize(image, size) {
	document.getElementById(image).style.backgroundSize = "auto " + size + "%";
}

function checkEmpty(ipt, wht, sz) {
	if (sz > 0)
		if (ipt.value.length != 0) ipt.style.width = (ipt.value.length)+"ch";
		else ipt.style.width = sz+"ch";
	if (ipt.value) ipt.className = wht;
	else ipt.className = wht+" empty";
}

function selectSymbol(sym, sel, ele) {
	next = ele+1;
	if (document.getElementById("simbolo"+sel+"_"+ele).getElementsByTagName("span")[0].innerHTML != sym.innerHTML) {
		document.getElementById("simbolo"+sel+"_"+ele).getElementsByTagName("span")[0].innerHTML = sym.innerHTML;
		document.getElementById("simbolo"+sel+"_"+next).style.display = "block";
	} else {
		document.getElementById("simbolo"+sel+"_"+ele).getElementsByTagName("span")[0].innerHTML = "";
		document.getElementById("simbolo"+sel+"_"+next).style.display = "none";
	}
}

function addSymbol(whc, sel, next) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		switch (xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					document.getElementById("lightcontents").innerHTML = xmlhttp.responseText;
					lightbox.show();
				} else {
					document.getElementById("lightcontents").innerHTML = "Trasmission error, retry";
				}
				break;
		}
	}
	xmlhttp.open("GET", "symbol.php?which="+whc+"&tecnica="+sel+"&symbol="+next, true);
	xmlhttp.send();
}