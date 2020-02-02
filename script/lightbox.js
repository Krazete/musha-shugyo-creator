var lightbox = {};

lightbox.init = function () {
	lightbox.page = window.top.document.createElement("div");
	lightbox.page.id = 'lightbox';
	lightbox.page.style.position = 'fixed';
	lightbox.page.style.width = '500px';
	lightbox.page.style.height = '200px';
	lightbox.page.style.top = '50%';
	lightbox.page.style.left = '50%';
	lightbox.page.style.marginLeft = '-253px';
	lightbox.page.style.marginTop = '-103px';
	lightbox.page.style.border = '6px solid #ffffff';
	lightbox.page.style.display = 'none';
	lightbox.page.style.zIndex = '10';
	lightbox.page.style.overflow = 'hidden';
	
	lightbox.background = document.createElement("div");
	lightbox.background.style.position = 'absolute';
	lightbox.background.style.width = '100%';
	lightbox.background.style.height = '100%';
	lightbox.background.style.top = '0px';
	lightbox.background.style.left = '0px';
	lightbox.background.style.backgroundColor = '#000000';
	lightbox.background.style.opacity = 0.7;
	lightbox.background.style.zIndex = '1';
	
	lightbox.contents = document.createElement("div");
	lightbox.contents.id = 'lightcontents';
	lightbox.contents.style.position = 'absolute';
	lightbox.contents.style.width = '100%';
	lightbox.contents.style.height = '100%';
	lightbox.contents.style.zIndex = '2';

	lightbox.page.appendChild(lightbox.background);
	lightbox.page.appendChild(lightbox.contents);

	window.top.document.getElementById("page").insertBefore(lightbox.page, window.top.document.getElementById("page").firstChild);
}

lightbox.show = function (content) {
	document.getElementById("lightbox").style.display = 'block';
}

lightbox.hide = function () {
	document.getElementById("lightbox").style.display = 'none';
}