var Bubble = function (x, y) {
	this.x = x;
	this.y = y;
};

Bubble.prototype = {
	radius: 5,

	update: function() {
		this.x += random(-1, 1);
		this.y += random(0, -2);
    if (this.y - this.radius <= 0) this.y = this.radius + random(0, 2);
		//if (this.y - this.radius <= 0) this.y = this.radius + height;
	},

	display: function () {
		noStroke();
		fill(102, 217, 255, 100); // rgba color
		ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
	}

};

var bubbles = [];
var numBubbles = 500;

var setup = function() {
  createCanvas(600, 600);
  while (bubbles.length < numBubbles) {
		bubbles.push(new Bubble(random(0, width), random(0, height)));
	}
};

var draw = function() {
  background(0);
  bubbles.forEach(function updateAndDisplay(bubble) {
  	bubble.update();
  	bubble.display();
  });
  if (mouseIsPressed) bubbles.push(new Bubble(mouseX, mouseY));
};
