var Ball = function(x, y) {
	this.x = x;
	this.y = y;

	this.speed = {x: 1, y: 1}; // because our speed is represented by an object, we *must* put it in the constructor
};

Ball.prototype = {

	radius: 7,

	update: function() {
		this.bounce();
		this.x += this.speed.x;
		this.y += this.speed.y;
	},

	display: function() {
		ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
	},

	bounce: function() {
		this.bounceX();
		this.bounceY();
	},

	bounceX: function() {
		if (this.x + this.radius > width) {
			this.speed.x *= -1;
		}
		if (this.x - this.radius < 0) {
			this.speed.x *= -1;
		}
	},

	bounceY: function() {
		if (this.y + this.radius > height) {
			this.speed.y *= -1;
		}
		if (this.y - this.radius < 0) {
			this.speed.y *= -1;
		}
	}
};

var ballPit = []; // creates an empty array

var setup = function() {
  createCanvas (600, 600);
};

var draw = function() {
  background(100);
  var index = 0;
	while(index < ballPit.length) {
		ballPit[index].update();
		ballPit[index].display();
		index += 1;
	}
  if (mouseIsPressed) ballPit[ballPit.length] = new Ball(mouseX, mouseY); // array.push() adds the argument to the end of the array
};
