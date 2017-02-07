function Widget(width,height) {
	this.width = width || 50;
	this.height = height || 50;
	this.$elem = null;
}

Widget.prototype.render = function($where){
	if (this.$elem) {
		this.$elem.css({
			width: this.width + "px",
			height: this.height + "px"
		}).appendTo($where);
	}
};

function Button(width, height, label) {
    Widget.call(this, width, height);
    this.label = label;
    this.$elem = $("<button>").text(this.label);
}

Button.prototype = Object.create(Widget.prototype);

Button.prototype.render = function ($where) {
    this.__proto__.__proto__.render.call(this, $where);
    this.$elem.on('click', function configHandle(evt) {
        this.$elem.onClick(evt);
    });
}

Button.onClick = function (evt) {
    console.log('Button ' + evt.target.text + 'clicked!');
}

$(document).ready(function(){
    var $body = $(document.body);
    var btn1 = new Button(100, 100, "button 1");
    //var btn2 = new Button(100, 100, "button 2");

    btn1.render($body);
    //btn2.render($body);
});