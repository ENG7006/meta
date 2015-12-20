# Lab 3: Prototypes, Data, and Control

### Prototypes, Instances, and Inheritance: A Primer
Finally, and this will also take a long time to grok, **objects can inherit properties from other objects**, including both data and behavior, or, more precisely, *properties* and *methods*.

I'm not going to go into all the details here, but it is, like many of the things we have covered so far, at once both totally straightforward *and* difficult to really get. The ```house``` object we defined is a single object, and conceptually and behaviorally, while it can draw more than one house, it is still the same object, making two drawings of a house whose difference lies in mashing around its innards. That's not a bad conceptual model, actually, but it has limitations when you want to have more than a handful of things to be doing something.

**Object prototypes** are objects, but they are, as they suggest, prototypes, or instructions on how to build more, similar objects. Object prototypes aren't just plain old objects (technical term: **object literals**). To build an object prototype, we need a special function: a **constructor** function, which, similar to ```setup()``` is called when you start building the object. And then instead of defining a ```house``` object, we instead define, in *exactly the same way*, a ```House.prototype``` object. Here's what ```house``` would look like as a prototypical object, or, in the convention, a ```House```.
```
var House = function (x) {
	this.x = x;
};

House.prototype = {
	y: 300,
	width: 200,
	height: 200,
	roofHeight: 100,
	eavesOffset: 10,

	draw: function () {
		this.drawStructure();
		this.drawRoof();
	},

	drawStructure: function () {
		rect(this.x, this.y, this.width, this.height); // Draw a structure
	},

	drawRoof: function () {
		var leftEaves = {
			x: this.x - this.eavesOffset,
			y: this.y
		};
		var roofPoint = {
			x: this.width / 2 + this.x,
			y: this.y - this.roofHeight
		};
		var rightEaves = {
			x: this.x + this.width + this.eavesOffset,
			y: this.y
		};
		triangle(leftEaves.x, leftEaves.y, roofPoint.x, roofPoint.y, rightEaves.x, rightEaves.y);
	}
};

function setup () {
	createCanvas(600, 600);

	var firstHouse = new House(100);
	firstHouse.draw();
	var secondHouse = new House(350);
	secondHouse.eavesOffset = 15;
	secondHouse.draw();
}
```
This is a somewhat silly, trivial example. But it shows a few important things:
* A prototype really is just a plain old object, and you define it just like a plain old object—with the important exception of the constructor method. It simply hands its properties and methods off to any subsequent **instance** of the object.
* This behavior, in which properties and methods flow from a prototype to instances, is called **inheritance**—instances *inherit* properties and methods from their prototype.
* JavaScript's model for inheritance is called **prototypical inheritance**, and in this it is rather unusual. (Other **object-oriented** programming languages like Java and Ruby use what is known as **classical inheritance**, in which **classical** comes from the use of **classes** in place of **prototypes**. The only thing you need to know about classes this semester is that, despite its prototypical inheritance model, JavaScript nevertheless reserves the ```class``` keyword to fake classical inheritance, so you can't use that as a variable name.)
* **Coding convention**: prototype objects get initial capitals, in what is known as UpperCamelCase, as opposed to plain old variables, which are in lowerCamelCase.
* Note the use of the ```new``` keyword. This tells JavaScript to make a new object following that prototype; each instance must be stored in its own variable. (Further note that ```new House(100)``` is an *expression* in the same way as ```this.x + this.width + this.eavesOffset```, which means it ```return```s a value. More on that next time.)
* Minor, annoying, totally important coding point which you may already have noticed: when you're writing normal lines of code, you assign variables using the ```=``` operator and end lines with ```;```s. When you're writing in what's known as **object literal** notation, setting properties of objects, you use the ```:``` operator to assign value, and end lines with ```,```s. And the method in which p5.js defines its ```setup()``` and ```draw()``` functions don't require anything at all. (I don't believe we will use any notation that will look like that in our own coding.) The rules are clear, but they really are needlessly complicated. I'm sorry. In Atom we will use what is called a linter to help us figure out if and when we have made mistakes. Sometimes these mistakes will actually break things; sometimes they will not.


Notes:
* Prototypes and Inheritance
* Arrays
* Iteration
* forEach() and Callbacks
* Loops and Conditions
