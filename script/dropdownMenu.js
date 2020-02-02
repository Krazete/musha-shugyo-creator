function dropdownMenu (id, speed) {
	this.id = id;
	this.speed = speed;
	this.div = document.getElementById(this.id);
	this.element = this.div.getElementsByTagName('span');
	this.elements = parseInt(this.element.length);
	this.flag = 0;
	this.base = 20;
	this.max = this.elements*20;
	this.size = this.base;

	this.checkFlag = function () {
		if (this.flag == 0) {
			this.showMenu();
		} else {
			this.hideMenu();
		}
	}

	this.showMenu = function () {
		if (navigator.appName == 'Microsoft Internet Explorer')
			this.div.style.height = this.max + 'px';
		else {
			clearInterval(this.closing);
			var self = this;
			this.opening = setInterval(function(){ self.open(); }, this.speed/1000);
		}
		this.flag=1;
	}

	this.open = function () {
		if (this.size > this.max) {
			this.size = this.max;
			clearInterval(this.opening);
		} else {
			this.div.style.height = this.size + 'px';
			this.size += this.speed/1000;
		}
	}

	this.hideMenu = function () {
		if (navigator.appName == 'Microsoft Internet Explorer')
			this.div.style.height = this.base + 'px';
		else {
			clearInterval(this.opening);
			var self = this;
			this.closing = setInterval(function(){ self.close(); }, this.speed/1000);
		}
		this.flag = 0;
	}

	this.close = function () {
		if (this.size < this.base) {
			this.size = this.base;
			clearInterval(this.closing);
		} else {
			this.div.style.height = this.size + 'px';
			this.size -= this.speed/1000;
		}
	}
}