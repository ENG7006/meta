# Lab 3: Prototypes, Data, and Control

### What is an Object?
Last time, we met objects, which in JavaScript are simply collections of properties. Among other ways, we saw that you can work with an object's properties in two ways. In **object literal notation**, you can define a set of properties between curly braces:

```javascript
var house = {
	x: 100,
	y: 300,
	//...
	draw: function() {
		this.drawStructure();
		this.drawRoof();
	},
	//...
}
```
Object literal notation is typically used only once, when an object is created, because if you subsequently wanted to change the ```roofHeight``` of the ```house``` to 25 (giving it a nice, modern, low-slung look), and you wrote ```house = { roofHeight: 25 };``` what would happen?

The way we access ```roofHeight``` and any other of the object's properties after an initial object literal definition, is to use dot notation:
```javascript
house.roofHeight = 25;
```
(There is one final way of accessing an object's properties, using square brackets, which is useful in certain cases—where you want variable access to an object's properties—but which will likely be confusing for now. It goes thus: ```house['roofHeight'] = 25;```. Don't use it unless you're really certain you need it. You'll see why it's confusing when we get to arrays, in a few moments.)

Recall also that object properties don't have to be individual static variables, but can also include functions (e.g. ```house.draw()```, above) and also other objects—and that this follows simply because variables can point to numbers, strings, functions, and objects. (At a conceptual level, this is just because, in JavaScript, variables point to objects, and numbers, strings, and functions are themselves just objects.)

### Prototypes, Instances, and Inheritance: A Very Brief Primer
There is one final way to work with an object's properties: inheritance. This will also take a long time to grok: **objects can inherit properties from other objects**, including both data and behavior, or, more precisely, both *properties* and *methods*.

I'm not going to go into all the details here, but it is, like many of the things we have covered so far, at once both totally straightforward *and* difficult to really get. The ```house``` object we defined is a single object, and conceptually and behaviorally, while it can draw more than one house, it is still the same object, making two drawings of a house whose difference lies in mashing around its innards. That's not a bad conceptual model, actually—although here it's more like a HouseDrawer than simply a House—but it has limitations when you want to have more than a handful of things to be doing something. And also, at a pragmatic level, in object-oriented programming, you want to do as little mashing of innards as possible, because it will keep your code clean, readable, and focused.

#### Prototype Objects
**Prototype objects** are objects, but they are, as they suggest, prototypes, or instructions on how to build more, similar objects. Prototype objects aren't just plain old objects (technical term: **object literals**). To build a prototype, we need a special function: a **constructor** function, which, similar to p5.js's ```setup()``` function, is called when you start building the object. And then instead of defining a ```house``` object, we instead define, in *exactly the same way*, a ```House.prototype``` object. Here's what ```house``` would look like as a prototype object, or, in the convention, a ```House```.
```javascript
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

var setup = function () {
	createCanvas(600, 600);

	var firstHouse = new House(100);
	firstHouse.draw();
	var secondHouse = new House(350);
	secondHouse.eavesOffset = 15;
	secondHouse.draw();
};
```
This is a somewhat silly, trivial example. But it shows a few important things:
* A prototype really is just a plain old object, and you define it just like a plain old object—with the important exception of the constructor method. It simply hands its properties and methods off to any subsequent **instance** of the object.
* This behavior, in which properties and methods flow from a prototype to instances, is called **inheritance**—instances *inherit* properties and methods from their prototype.
* JavaScript's model for inheritance is called **prototypical inheritance**, and in this it is rather unusual. (Other **object-oriented** programming languages like Java and Ruby use what is known as **classical inheritance**, in which **classical** comes from the use of **classes** in place of **prototypes**. The only thing you need to know about classes this semester is that, despite its prototypical inheritance model, JavaScript nevertheless reserves the ```class``` keyword to fake classical inheritance, so you can't use ```class``` as a variable name.)
* **Coding convention**: prototype objects get initial capitals, in what is known as UpperCamelCase, as opposed to plain old variables, which are in lowerCamelCase.
* Note the use of the ```new``` keyword. This tells JavaScript to make a new object following that prototype; each instance must be stored in its own variable. (Further note that ```new House(100)``` is an *expression* in the same way as ```this.x + this.width + this.eavesOffset```, which means it ```return```s a value. More on that next time.)
* Minor, annoying, totally important coding point which you may already have noticed: when you're writing normal lines of code, you assign variables using the ```=``` operator and end lines with ```;```s. When you're writing in what's known as **object literal** notation, setting properties of objects, you use the ```:``` operator to assign value, and separate entries with ```,```s. And the method in which p5.js defines its ```setup()``` and ```draw()``` functions don't require anything at all. (I don't believe we will use any notation that will look like that in our own coding.) The rules are clear, but they really are needlessly complicated. I'm sorry. JavaScript is a weird, complicated beast, and in many ways, like learning a natural language, things are the way they are "just because that's the way you do (say) it." In Atom we will use what is called a linter to help us figure out if and when we have made mistakes. Sometimes these mistakes will actually break things; sometimes they will not. You'll note that in this example, and in all subsequent examples, we will write ```setup()``` and ```draw()``` using the more idiomatically correct JavaScript pattern of ```var setup = function() { ... };``` rather than the p5.js IDE's more Java-esque version.

#### Instance Variables
The big conceptual point to draw from the above example, however, is that each instance of house carries its own x property, passed into its constructor as an argument. Note that the other properties—y, width, height, etc.—are hard-coded, and every ```new House``` you make shares those properties. However, each of these is nevertheless an instance variable, and can be changed willy-nilly on that instance, without affecting the other instances.

So let's say you wanted to make one or both of the houses just a little higher, you could do one of two things:

```javascript
//...
House.prototype = {
	y: 250,
	//...
};
//...
```
What would this do? Which houses would this affect?

Alternately:
```javascript
var setup = function () {
	//...
	var firstHouse = new House(100);
	firstHouse.y = 250;
	var secondHouse = new House(350);
	//...
};
```
And what would *this* do?

This is a very simple version of the thing, but it should be sufficient for our purposes for now. *Inheritance is some very subtle, powerful, and evil, mojo.*  (It's not quite the One Ring, but like Frodo, we will be forced to use powers that are beyond our ken.) The really short version is: instances inherit everything defined on their prototype, and **you should only ever interact with a prototype once, when you define the object** (although the language will allow you to do some especially subtle, evil mojo by changing prototypes in the middle of things; really—don't *ever* do that). **After you've defined a prototype, you should really only ever change properties and functions on individual instances.** (JavaScript is a language that allows all kind of subtle evil, which is why people tend to want beginning programmers to learn friendlier languages like Python. Sorry.)

### Not a Ball but a BallPit: Arrays


* Arrays
* Iteration
* forEach() and Callbacks
* Loops and Conditions
