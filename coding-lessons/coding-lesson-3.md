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
The big conceptual point to draw from the above example, however, is that each instance of house carries its own x property, passed into its constructor as an argument. Note that the other properties—y, width, height, etc.—are hard-coded, and every ```new House``` you make shares those properties. And they share those properties communistically: *every house is affected by changes to properties defined on the prototype*. This makes good sense, if you think about it. Change something on the prototype, and everything changes. That means that the properties that are specific to individual instances—**instance variables** in the jargon—have to be dealt with in the constructor.

Conceptually, take the *constructor* metaphor seriously: the constructor actually *makes* the houses, so any properties that are specific to an instance should be dealt with there. The prototype is like a blueprint, and so anything that belongs to the prototype is passed on to each instance.

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
And what would *this* do? As I said, inheritance is some subtle, evil magic. (The very short version is this: for most kinds of properties—numbers, strings, and so on—this is a perfectly fine thing to do, but if a property points to an *object*, that object is *the same object for all instances*. This is a feature, not a bug, since part of the point of objects is that they persist in certain ways. But it will lead to bugs in your code, and so you should get in the good coding practice of putting)

If we decide that we want a house to have a few different independent variables—```x``` and ```y``` and ```roofHeight```, but not, say, ```eavesOffset```, then here's how we ought to code it:

```javascript
var House = function (x, y) {
	this.x = x;
	this.y = y;
	this.roofHeight = 100;
};

House.prototype = {
	eavesOffset: 10,

	draw: function() {
		this.drawStructure();
		this.drawRoof();
	},
	//...
};

```
This example puts all of the instance variables in the constructor function. This is what you should do.

This is a very simple version of the thing, but it should be sufficient for our purposes for now. *Inheritance is some very subtle, powerful, and evil, mojo.*  (It's not quite the One Ring, but like Frodo, we will be forced to use powers that are beyond our ken.) The really short version is: instances inherit everything defined on their prototype, and **you should only ever interact with a prototype once, when you define the object** (although the language will allow you to do some especially subtle, evil mojo by changing prototypes in the middle of things; really—don't *ever* do that). **After you've defined a prototype, you should really only ever change properties and functions on individual instances.** (JavaScript is a language that allows all kind of subtle evil, which is why people tend to want beginning programmers to learn friendlier languages like Python. Sorry.)

### Not a Ball but a BallPit: Arrays
Balls aren't much fun when they're by themselves. What if we want lots of balls? A ```BallPit``` perhaps?

Here's a ```Ball```:
```javascript
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
```
It's a nice ```Ball```. It moves around, and bounces. (This should look a great deal like one of your dailies from this week; what's the major difference?) Probably there's some refactoring we could do with the bouncing (how do I know that?). But it works well enough.

If we want to make a ball, the code in sketch.js is really pretty simple:
```javascript
var myBall = new Ball(100, 100); // make a new ball at 100, 100

var setup = function () {
	createCanvas(600, 600);
};

var draw = function () {
	background(100);
	myBall.update(); // update the ball
	myBall.display(); // and display it
};
```
Nicely done! We have a bouncing ```Ball```!

But what if we want more balls? What if we wanted 10 ```Ball```s? 100? An arbitrary number, based on what the user does?

If we wanted 10 ```Ball```s, it might be plausible to do this:
```javascript
var myBall1 = new Ball(100, 100);
var myBall2 = new Ball(103, 106);
var myBall3 = new Ball(20, 32);
var myBall4 = new Ball(60, 40);
var myBall5 = new Ball(306, 242);
var myBall6 = new Ball(206, 542);
var myBall7 = new Ball(486, 367);
var myBall8 = new Ball(506, 102);
var myBall9 = new Ball(599, 1);
var myBall10 = new Ball(200, 200);
```
But then, what would ```draw()``` have to look like?
```javascript
var draw = function() {
	myBall1.update();
	myBall1.display();
	myBall2.update();
	myBall2.display();
	myBall3.update();
	myBall3.display();
	//...
	myBall10.update();
	myBall10.display();
};
```
I couldn't even bother to type out the necessary ```draw()```. And lord help me with more than 10; I have not the patience.

How else might we do this? How have we grouped variables in the past? Objects! But that's not so much better in this case. Let's say we made a ```ballPit``` object: ```var ballPit = { //... };``` What goes in the curly braces? ```var ballPit = { first: new Ball(100, 100), second: new Ball(103, 106), //... };```

That didn't help us at all.

What we need is something that lets us group together a bunch of variables and then do work on all of them in an easy way.

The answer lies in an **array**. An array is like an object, but instead of curly braces, it is indicated by square brackets:
```javascript
var anEmptyObject = {};
var anEmptyArray = [];
```
Arrays are designed to make accessing all their elements easy, and they [come with a whole bunch of useful functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) that allow for some really, really powerful computing. And actually, JavaScript really excels at array work compared to a language like Java.

Here's an example that creates a new ```Ball``` whenever and wherever the user has the mouse pressed:
```javascript
var ballPit = []; // creates an empty array

var setup = function() {
  createCanvas (600, 600);
};

var draw = function() {
  background(100);
  ballPit.forEach(function updateAndDisplay (ball) { // this may seem a bit confusing, but what does this seem like it will do?
  	ball.update();
  	ball.display();
  });
  if (mouseIsPressed) ballPit.push(new Ball(mouseX, mouseY)); // array.push() adds the argument to the end of the array
};
```
In this example, we are meeting a few things for the first time:
* Arrays
* Callback functions
* Iteration
* Mouse events

Let's take these in turn.

#### Arrays and Helper Functions
Before we get to the magic bit above, take a look at the very last line of code there:
```javascript
if (mouseIsPressed) ballPit.push(new Ball(mouseX, mouseY));
```
The ```if``` statement looks familiar, but ```mouseIsPressed``` doesn't look like the conditions we've seen so far—it has no comparison in it! ```mouseIsPressed``` is actually a p5.js variable that is truthy when the mouse is down, and falsy when it isn't. Effectively, it does what it's named!

Also notice the ```array.push()``` function there. Essentially, it adds whatever you pass it to the array. In fact, arrays come with a whole host of helper functions (detailed in the reference above), of which we will use only a few.

#### Callbacks
Many of the array helper functions employ **callbacks**. In this example: ```array.forEach()```. The ```ballPit``` array holds all our balls, and then lets us do something crucial if we want to have lots of ```Ball```s in our sketch: we call ```forEach()``` on the array, and it then very nicely does the same thing to each element of the array. It reads really nicely: for each ```Ball``` in ```ballPit```, ```update()``` it and then ```display()``` it.

The subtle evil in *this* instance lies in the argument we pass to ```forEach()```. It's a function! (Again: variables—and by the same token, arguments—can point to any old thing equally.) Weirdly—and admittedly, this is weird—we wrote the function *inside* the arguments. This is common, idiomatic JavaScript, and it's not beautiful, and it's a bit confusing, but it does work, and you should get used to it.

**Callback arguments** are a bit tricky. The documentation of ```forEach()``` specifies that the first argument passed into the callback function is the element of the array currently being worked on. As with any function, you get to call that argument whatever you want to inside the function; in this case, I have decided to call it ```ball``` to make the code readable, but it might just as well be ```foo```, ```bar```, or ```gazorninplat```. It is just name, locally, for whatever is passed in. In ```forEach()```, that's the array element.

**Extended, parenthetical note on function names:** You could do this a different way (you can write JavaScript in so many ways!) by assigning the function to a variable elsewhere and passing it in as the variable. For example:
```javascript
var ballPit = []; // creates an empty array

var updateAndDisplay = function(ball) { // this assigns our function to a variable
	ball.update();
	ball.display();
};

var setup = function() {
  createCanvas (600, 600);
};

var draw = function() {
  background(100);
  ballPit.forEach(updateAndDisplay); // the variable name refers to the function now
  if (mouseIsPressed) ballPit.push(new Ball(mouseX, mouseY)); // array.push() adds the argument to the end of the array
};
```
This is identical to the example above, but you'll notice that when we pass the function, which usually comes with parentheses afterwards, there aren't any parentheses. Indeed, you put the parentheses with any arguments after a function to actually *call* the function, but, as with other variables, you can simply refer to functions in the normal way of variables, without parentheses.

This kind of a thing—a function passed as an argument to another function—is called a **callback function**. Usually, callbacks are defined right there in the arguments, but they can be defined elsewhere and called. The reason to define the callback in the arguments is to make clear to your reader (yourself, your collaborators) that it is a callback.

Meanwhile, in the previous example, the ```forEach()``` could be written slightly differently:
```javascript
ballPit.forEach(function (ball) {
	ball.update();
	ball.display();
});
```
Here, the callback function is not named—anonymous. The code works just fine, but it's a bit harder to read. More importantly, if you have a bug in the callback function, if it's named, the stack trace in the console will tell you that the error is in an anonymous funciton; if it's named, it will give you the name of the function. Naming your callback functions is not, strictly speaking, necessary, but it is a very good idea: it makes your code easier to read and it makes your code easier to debug.

**(End of parenthesis.)**

There are a bunch of handy array helper functions, such as ```reduce()``` and ```map()``` which take callbacks, and which may be useful to you this semester, but probably won't be. ```forEach()```, however, is really super handy, and lets you do the same thing to each element of an array, which is a very, very common use case for arrays.

#### Arrays, ordering, and accessing elements
So far we know how to do something to *all* the elements in an array, but not a specific one. How do you access a specific element?

Arrays are **ordered**, which means that aren't just a collection of elements, but rather, they organize their elements in a particular order. And arrays are **indexed**, which means that their order comes ready-made for easy access. ```array[i]``` accesses the ```i```th element of the array.

In the instance above, since ```array.push()``` adds the element to the *end* of the array, the ordering of the ```Ball```s is simply the order in which they were added.

Arrays aren't merely indexed, but **zero-indexed**, which means that the first element in an array is ```array[0]```. This will be the source of no small confusion, and off-by-one errors will cause you pain. This is less a prediction and more a fact. I'm sorry. That said, it ends up being pretty handy.

In JavaScript, if you ask an array for an element at an index where it doesn't have an element, it returns ```undefined```, which may also give you an error. The good news is that you can test whether an index will be out of range by comparing it to the number of elements in the array, which is handily stored in a property of the array, ```array.length```, which will give you the number of elements in the array. Note that because arrays are zero-indexed, this means any index that is less than ```array.length``` and not negative should give you what you're looking for (absent any funny business).

Note, then, another very important difference between objects and arrays, which is what makes arrays so useful (beyond their awesome helper functions): to access a property defined on an object, you have to know the name of that property: ```x```, ```y```, ```speed```, ```roofHeight```, etc. To access a property defined on an array, you have to know its index in the array. And indexes are numbers, and computers are really, really good at counting.

### Iteration and Looping
The process of doing something to every element of an array is called **iteration**, and we're going to learn two basic methods. The first, which we've already seen, is *functional*, using *callback functions*. The second, which is the "more traditional" method, is more complicated and uses what are called **loops**.

#### What is a loop?
Like a function or a conditional, loop is a block of code surrounded by curly braces. A function executes its block of code only when it's called; a conditional executes its block of code only if its condition is true. A loop, perhaps obviously, executes its block of code over and over and over again. There are two different kinds of loops, ```while``` loops and ```for``` loops. The difference is how they determine when to stop looping through their blocks.

#### ```while``` loops
The ```while``` loop is the simpler of the two, and is very, very similar to a basic conditional. The basic syntax for a conditional, recall, is:
```javascript
if (condition) {
	// code here runs if condition is truthy
}
```
A ```while``` loop looks like this:
```javascript
while (condition) {
	// code here runs as long as condition is truthy
}
```
There's a world of difference between "*if* a condition is truthy" and "*as long as* a condition is truthy." Consider a trivial example:
```javascript
if (true) {
	print("True!");
}
```
This produces the output:
```
True!
```
...and then it's over.

Meanwhile, consider this very different example:
```javascript
while (true) {
	print("True!");
}
```
This produces the output:
```
True!
True!
True!
True!
True!
True!
True!
True!
True!
True!
True!
True!
True!
True!
...
```
Because ```true``` is always truthy, your program will simply execute the block of code infinitely, without ever moving on. This means that you should be very careful to design your condition so that it will, at some point, be false. Otherwise, your program will get stuck in an infinite loop, which can crash a browser.

So let's take a look at a first alternative to our ```Ball``` example above, writing it using a ```while``` loop instead of ```forEach()```:
```javascript
var ballPit = []; // creates an empty array

var setup = function() {
  createCanvas (600, 600);
};

var draw = function() {
  background(100);
	var index = 0;
	while (index < ballPit.length) {
		ballPit[index].update();
		ballPit[index].draw();
		index += 1; // this line is REALLY important; I forgot it while preparing this example and crashed the browser tab hard.
	}
  if (mouseIsPressed) ballPit[ballPit.length] = new Ball(mouseX, mouseY); // instead of the functional array.push(), this is an indexed version of the same line of code
};
```
You'll notice a few things about this: it's a bit further away from readable, and it makes you do a few things explicitly. Among these, two especially important ones: incrementing the index and accessing the array element directly, using square bracket notation.

**On square brackets**: You may remember that you may access object properties using square bracket notation, ```foo.bar``` can be accessed also via ```foo['bar']```. One very important reason to avoid this notation unless you must use it is to ensure you don't confuse arrays and object.

**On incrementing**: Incrementing is something that we do pretty frequently in coding; and before JavaScript's friendly helper methods, was something we had to do *very* frequently indeed. JavaScript (like C, its ancestor) provides an increment operator: ```++```. You could write ```index += 1``` as ```++index``` or ```index++```, which are all (approximately) the equivalent of ```index = index + 1;```. (There is a slight difference between putting the increment operator before vs. after the variable name, but it's not necessary or advisable to worry about it now. Prefer the ```++index``` version for now.)

#### ```for``` loops
The ```for``` loop is a complex, unsightly, extremely common beast. It is the canonical way of writing loops in C and its offspring (which include JavaScript). It's mostly not subject to the worry of infinite loops as ```while``` loops are, but it's not exactly expressive. Here's our example of the ```ballPit```, written using a ```for``` loop:

```javascript
var draw = function () {
	background(100);
	for (var index = 0; index < ballPit.length; ++index) {
		ballPit[index].update();
		ballPit[index].draw();
	}
	if (mouseIsPressed) ballPit[ballPit.length] = new Ball(mouseX, mouseY);
};
```
The ```for``` consists of three main parts:
* First, the reserved keyword ```for```
* Last, the code block
* And in between, that gobbledigook.

The gobbledigook, like the condition in a ```while``` loop, is what governs the loop's behavior. It does so in three parts:
* Initialization: ```var index = 0;```. This code gets run once, at the beginning of the loop. In this instance, it defines a variable, ```index``` and sets it to 0.
* Condition: ```index < ballPit.length;```. The code block will be run as long as the condition is truthy.
* Final expression: ```++index;```. The final expression is run at the end of each time through the loop.

In fact, you'll see all three of these items in the ```while``` loop version of the ```draw()``` function in our example.

Compare them more closely:
```javascript
var index = 0;
while (index < ballPit.length) {
	ballPit[index].update();
	ballPit[index].draw();
	index += 1; // recall that this can be rewritten as ++index
}
```
```javascript
for (var index = 0; index < ballPit.length; ++index) {
	ballPit[index].update();
	ballPit[index].draw();
}
```
One way of thinking about the ```for``` loop is that it collects all the bits of the loop that govern its behavior, and put it at the beginning of the loop, in close proximity. Almost all ```for``` loops you'll ever encounter are very simple, as this example is, with the initialization defining a counter, a final expression incrementing that counter, and the condition testing to see that the counter doesn't exceed a certain amount.

Furthermore, you'll notice that the code block in these two examples is (of course) substantially identical. The ```for``` loop pulls the last line of the ```while``` loop's block into its final expression.

Finally, the sort of thing we did in this example, using a ```for``` loop to iterate across an array, is so common that there is an accepted and idiomatic way to abbreviate this, which you can think of as a template of sorts:
```javascript
for (var i = 0; i < array.length; ++i) {
	array[i].doStuff();
}
```

### Summary
* Objects can inherit properties from prototypes.
* Prototype objects also define a constructor function, which is called when the object is built using the ```new``` keyword.
* Instance variables should be managed in the constructor, not defined as properties on the prototype.
* Once you've built a prototype, you can have lots of instances of a single object.
* If you have lots of a thing, you need some kind of data structure to handle them; this data structure is called an array.
* Arrays in JavaScript come with lots of important helper functions, the most readily useful being ```forEach()```, which executes the same code on every element of the array.
* ```forEach()``` takes a function as an argument, called a callback function, which is idiomatically written as the argument.
* Arrays are ordered and zero indexed, meaning that each element is assigned a position, beginning at 0. Elements can be accessed using the notation ```array[index]```.
* But there is an additional way of iterating across all elements in an array, using loops.
* There are two kinds of loops, ```while``` and ```for```. They look a bit different, but conceptually, a ```for``` loop is a ```while``` loop that collects all the bits that govern the loop at the top.

### Dailies: Bubbles!
Unlike ```Ball```s, ```Bubble```s fizz. But, like a ```Ball```, you want lots and lots of ```Bubble```s.

Here's a ```Bubble```:
```javascript
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
	},

	display: function () {
		noStroke();
		fill(102, 217, 255, 100);
		ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
	}

};
```
A few notes about the code here:
* ```random()``` is a p5.js function that ```return```s a random number between the first argument and the second.
* The ```fill()``` line in ```Bubble.display()``` uses a four argument color statement. Instead of grayscale, we're using rgba color: red, green, blue, and alpha. More on rgba color here.

Your first project is, without copying and pasting, and with as little retyping as possible, the ```setup()``` and ```draw()``` functions for bubbles. Give yourself a nice, large canvas, and a black background.

#### Dailies
There are five dailies this week.

* In a first iteration, your sketch should start with a blank canvas, adding new bubbles when the mouse is pressed.
* In a second iteration, your sketch should begin with 500 bubbles on the canvas. (Hint: this is best done with a loop; doing it functionally requires a hack and use of the ```Array.map()``` function.)
* In a third iteration, your bubbles should not collect at the top, but move upwards continuously.
* In a fourth iteration, rewrite the iteration you use in ```draw()``` to use the other technique (if you used ```forEach()```, rewrite it using a loop).
* Finally, in a last daily project, create a sketch that animates a lot of somethings that aren't ```Bubble```s or ```Ball```s. You should adapt the pattern from those objects to your new object: prototype object, constructor, ```new``` keyword, instance variables, etc. Your object should be something that there are obviously lot of, and that move in some way that's different from ```Bubble``` and ```Ball```. If you don't have your own ideas, here are two: snow falling and shooting stars.
