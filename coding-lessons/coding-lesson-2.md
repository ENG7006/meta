### Lab 2: Variables, Objects, Control, and Conditions

#### The Problem with ```triangle```
Let's take a look one of our basic p5.js shapes that we learned last time (and that you should be  used to a bit by now), ```triangle```:
```
triangle(90, 300, 200, 200, 310, 300); // Draw the main roof
```
This is the line of code from the example house where we drew a roof on the main house. Here we see a problem with p5.js (a problem it inherits from Processing, actually): long parameter lists. The comment tells us what we are doing, but not what all those numbers mean. This is especially bad since looking at six numbers in a row really isn't very easy to read, even for experienced coders. In fact, this is actually something like "bad programming practice": generally speaking, we should write functions with no more than four parameters, and, if that doesn't work, then we should at least use as few parameters as possible.

#### Variables
Let's tackle these problems in turn:

**First,** ```90, 300, 200, 200, 310, 300``` doesn't help us one bit. It just isn't human readable. If we look at [the p5.js documentation for triangle](http://p5js.org/reference/#/p5/triangle), we will see that the general form of the call is ```triangle(x1, y1, x2, y2, x3, y3);```. This makes good sense, but it's still hard to see a list of six numbers and figure out what they do. So we might actually get closer to what the reference for ```triangle``` describes, by giving our numbers names, or, **assigning them to variables**. Which is to say, we don't need to use the numbers raw, but can give them human-readable names that make it easier to understand what our code is doing:

```
var firstX = 90;
var firstY = 300;
var secondX = 200;
var secondY = 200;
var thirdX = 310;
var thirdY = 300;

triangle(firstX, firstY, secondX, secondY, thirdX, thirdY);
```
You'll notice a couple of things: each variable declaration consists of four parts: ```var```, the variable name (e.g. ```firstX``` or ```thirdY```), an **assignment operation** using the ```=``` operator, and the **value** of the variable.

##### Variables mean bugs.
The ```var``` keyword tells JavaScript that a variable declaration is coming. Technically speaking, with the ```var``` keyword, you don't need the assignment or the value. You could simply write: ```var firstX;``` That said, if you did that, you would end up with an "empty" variable, since it hasn't had any value assigned to it. Technically, its value when empty is actually ```undefined```, which is the source of perhaps the most common error you'll make: trying to do something to an ```undefined``` variable. Go ahead an test it now: in a new project, try to print an empty variable:
 ```
 function setup () {
   createCanvas(400, 400);
   var foo;
   rect(foo, foo, foo, foo);
}
 ```
 p5.js doesn't complain, but it doesn't do anything either. You may also forget to declare a variable at all, in which case you'll get another very common error:
 ```
 function setup () {
   createCanvas(400, 400);
   rect(foo, foo, foo, foo); // ##: Uncaught ReferenceError: foo is not defined
}
 ```
These are different, since ```undefined``` is technically a form of definition that arises from an empty declaration, whereas you'll get a ReferenceError when you forget to define the variable at all—or, as often happens to me, rename a variable and forget to change all its instances to the new name.

##### Assignment: ```=```
**Assignment** is super important. The equals sign—```=```—in JavaScript is **always** and assignment operator. It puts the value on the right into the value on the left. You should try not to think of it as "equals" in the mathematical sense. (When you test for equality in JavaScript, you actually use three equals signs strung together: ```x === y``` means: is ```x``` equal to ```y```?)

#### Problem: Two Houses
So let's say we decided we wanted to make a second house with a second roof. Let's forget all the fancy stuff and just make some simple boxy houses:

```
function setup () {
  // ...
  rect(100, 300, 200, 200); // Draw the main structure
  triangle(90, 300, 200, 200, 310, 300); // Draw the main roof
  // ...
}
```
If we wanted to add a second house, we would, at this point, probably do something like this:
```
function setup () {
  createCanvas(600, 600); // We still need a canvas

  rect(100, 300, 200, 200); // Draw a main structure
  triangle(90, 300, 200, 200, 310, 300); // Draw a main roof

  rect(350, 300, 200, 200); // Draw another main structure, increasing x by 250
  triangle(340, 300, 450, 200, 560, 300); // Draw another main roof; I had to dig out my calculator
}
```
Any time you have to dig out the calculator to figure out where to put the things, that's a good indication that you need to do some **refactoring**. **Refactoring** is what we do when we take some code that works, and rewrite it so that it does *the exact same thing*, but in a way that is somehow better: more readable, less repetitive, more extensible, faster, shorter, etc. It is, effectively, revising your code.

In this class, we will refactor code so that it gets more reusable, more readable, and less repetitive. Almost always, these are the same thing. Often, that will mean *more* code, but code that *makes more sense*.

Let's refactor this code to use some variables, and break it down step by step. First, let's make some names for the parts of the house:
```
var houseX = 100;
var houseY = 300;
var houseWidth = 200;
var houseHeight = 200;

rect(houseX, houseY, houseWidth, houseHeight); // Draw a main structure
```
There, isn't that better?

Now, since the roof is relative to the house, let's do some fancy footwork, and instead of passing variables as parameters straight, we can write some **expressions** that express the dimensions and values of the roof relative to that of the structure of the house:
```
var roofHeight = 100;
var roofPointX = 200;
triangle(houseX - 10, houseY, roofPointX, houseY - roofHeight, houseX + houseWidth + 10, houseY); // Draw a main roof
```
You'll notice a few things. First, we're beginning to notice and encode the relative structure of the house: e.g. the first and last x are 10 pixels outside of the main ```rect``` of the house.

Second, while there are variables here, and the ```rect``` is nice and readable, the ```triangle``` is a total mess. Let's leave it a mess for now. When you're refactoring, it's often a good idea to leave things a mess for a moment if it works, so that you can figure out what the mess is doing, how it will unfold.

So now we have one house. How do we build the second house? We've built it by increasing the various ```x```es by 250 pixels.

We can add this bewildering line of code:
```
houseX = houseX + 250;
```
If you're wondering how something can be equal to itself plus some value—that's not what *equals* means—you're making lots of sense. But you're forgetting that ```=``` is the *assignment* operator. It's not about equality in the algebraic sense. (Something that may or may not help: there's an **increment** operator, too, written like this: ```+=```. So you could rewrite this line as: ```houseX += 250;```, which also looks weird, but at least has the benefit of showing you that ```=``` isn't about *equality* but *assignment*.)

Note also that we can assign variables not only using strict numbers, but also *expressions*, even *expressions that include the variable itself*. The expression on the right is evaluated *first*, and then the result is assigned to the variable.

So now, we can copy-and-paste most of our code above, and it will draw us a house 250px to the right:
```
rect(houseX, houseY, houseWidth, houseHeight); // Draw another main structure
triangle(houseX - 10, houseY, roofPointX, houseY - roofHeight, houseX + houseWidth + 10, houseY); // Draw another roof
```
What are we missing?

The roof point! How can we fix it?

The best option is to figure out the **algorithm** for the roof point. Which is:
```
var roofPointX = houseX + houseWidth / 2;
```
Replace our original **declaration** of roofPointX with this expression, and instead of being hard-coded, it's relative! Yay! And it works!

But only for the first house. Why?

We can fix it two ways. We can increase ```roofPointX``` by 250, like ```houseX```: ```roofPointX = roofPointX + 250;``` Or, we can recalculate roofPointX with the new values once we increase ```houseX``` by writing an almost identical line of code: ```roofPointX = houseX + houseWidth / 2;```. (How is it different from its initial declaration?) Both work, and both suffer from the same problem, which is that they require this extra line of code to work; we can't just add 250 and be done with it. (Me, I want to add 250 and be done with it.) As far as we have it here, the way to fix it is actually to stop relying on the declaration of ```roofPointX``` to draw the roof, and instead to pass the algorithm expression into ```triangle```, so that each time, the function call reads:
```
triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY);
```
Actually, both times, we have the same two lines of code repeated verbatim:
```
rect(houseX, houseY, houseWidth, houseHeight);
triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY);
```
The first line is nice and simple and easy to read, the second one is a huge pain, for so very many reasons.

#### Functions: Hide the mess and DRY out your code
Here's a first principle in refactoring: **DRY**, or **don't repeat yourself**. When you have something like the two repeated lines above, that means it might be time to build yourself a function. In JavaScript, functions are actually held by variables, just like values. (In this, it is quite different from other programming languages.)

Effectively, in creating a function, we are giving a name to a block of code, so that when we want to invoke it, we don't have to repeat the instructions, instead, we can

So one thing we might do is this:
```
var drawHouse = function () {
  rect(houseX, houseY, houseWidth, houseHeight);
  triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY);
};
```
Where do we put this, though? One option is to declare it with all the other variables up at the top of ```setup()```. (This is a good habit to form, declaring all your variables at the beginning of your functions.)

```
function setup () {
	createCanvas(600, 600);

	var houseX = 100;
	var houseY = 300;
	var houseWidth = 200;
	var houseHeight = 200;
  var roofHeight = 100;

  var drawHouse = function () {
   rect(houseX, houseY, houseWidth, houseHeight); // Draw a structure
   triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY); // Draw a roof
  };

	drawHouse();

	var houseX = houseX + 250; // Increase x by 250

	drawHouse();
}
```
This means that you could draw as many houses as you like, in a bunch of different ways, by reassigning variables and then calling drawHouse() each time you redesign them.

#### Objects: I promise you, this makes things *less* complicated
This solution hides the problem by tucking it away under a function, so that now you can see, after some preamble, that ```setup()``` draws two houses. But you still have that awful line of code:
```
triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY);
```
Before we tackle how to refactor that monstrosity, let's turn back to the first, really annoying line of code that doesn't really tell us anything, either, the original roof:
```
triangle(90, 300, 200, 200, 310, 300);
```
It's less verbose, and possibly less vertiginous, but it sure isn't any more informative. Recall that our reference information says that the format is ```triangle(x1, y1, x2, y2, x3, y3);``` If you're thinking back to algebra class, you might think it will help you to write ```triangle((90, 300), (200, 200), (310, 300);```. This would indeed make it more readable! (Try it and see what happens.)

So that doesn't work. How can we group variables together? **Objects!!!** In JavaScript, objects are, at least at the most fundamental level, dead simple. They are collections of **properties**, which is a fancy word for variables: properties are variables that belong to an object. To write objects, instead of grouping parameters together in parentheses, you group properties together with curly braces:
```
var firstCorner = { x: 90, y: 300 };
```
To access these properties, you can use what is called "dot notation": put a dot after the name of the object, and then the name of the property:
```
print(firstCorner.x); // 90
print(firstCorner.y); // 300
```
So: if we wanted to make our ```triangle``` easier to read (and oh my, do we want our code to be easier to read), you could do it this way:
```
var firstCorner = { x: 90, y: 300 };
var secondCorner = { x: 200, y: 200 };
var thirdCorner = { x: 310, y: 300 };

triangle(firstCorner.x, firstCorner.y, secondCorner.x, secondCorner.y, thirdCorner.x, thirdCorner.y);
```
This is more characters (and maybe a bit overly verbose: do we really need to call them corners?), but it is way, way easier to understand what we are doing. Instead of an accumulation of numbers, we can see a thoroughly descriptive line of code—that tells us not only what *we* are doing, but what *p5.js's ```triangle``` is doing*.

A few points: First, each object gets its own ```x``` and ```y```. Each object gets a new **scope**, which simply means that you can reuse variable names without cross-contamination. (Scope is actually a really, really hard concept to grasp, so don't worry too much about it now.)

Second, **object variables can point to functions**, because *variables can point to functions*. This means that objects don't only hold *data* in variables, but can learn to *do* things with that data.

Third, **objects can contain other objects**, which sounds totally bonkers until you take seriously what it means to call these entities objects.

So, with these ideas in mind, let's keep refactoring our hosue. We might decide that a house contains a roof and a structure. We might decide to make a ```house``` object that somehow includes a ```structure``` and a ```roof```. (This is perhaps a bit of overkill for our current purposes, but bear with me.) And finally, we might decide that it doesn't make much sense for ```setup()``` to have to know all about what we mean by a house, we can pull it out of setup and give it its own domain.

```
var house = {
	x: 100,
	y: 300,
	width: 200,
	height: 200,
	roofHeight: 100,
	draw: function() {
		rect(this.x, this.y, this.width, this.height); // Draw a structure
		triangle(this.x - 10, this.y, this.width / 2 + this.x, this.y - this.roofHeight, this.x + this.width + 10, this.y);
	}
};

function setup () {
	createCanvas(600, 600);

	house.draw();
	house.x = house.x + 250;
	house.draw();
}
```
Look at how simple ```setup()``` is now! It's best to keep ```setup()``` and ```draw()``` as straightforward as possible. And here's a really, really good rule: functions (methods) should be no longer than five lines long (excluding things like empty lines, comments, and things like curly braces). This will keep things much, much simpler in the long run.

##### ```this```
One thing to notice, which I can promise you will be a source of confusion, is all the ```this```es in here. ```this``` is an object's way of referring to itself; it's kind of like a variable (it's a **keyword**, like ```var```, and, as we'll see below, ```new``` and ```if```, which for now simply means you can't use it as a variable name; it's reserved for the language). So before, in the example with the triangle corners, we used ```firstCorner.x``` to refer to the value stored there? ```this.x``` is just about exactly same thing. (You can treat it that way for now.)

We've refactored our code to make things more readable in general, but we're not done yet, because we still (still!) have our terrible line of code with the triangle. So let's get things as dead simple as possible, and do the same thing we did before: pull out lines of code into separate functions. Let's take the two lines of ```draw()``` and  a ```drawStructure()``` method and a ```drawRoof()``` method. The first is easy:

```
drawStructure: function () {
  rect(this.x, this.y, this.width, this.height); // Draw a structure
}
```
The ```drawRoof()``` method, if we do it right, gets us to a nice, readable place by pulling the expressions out of parameters and assigning them to variables, according to the model above. Now, if we had done this in ```setup()``` this would have been awful and confusing, giving ourselves so many variables to worry about. But now, only the ```drawRoof()``` method needs to know about them:
```
drawRoof: function () {
  var leftEaves = {
    x: this.x - 10,
    y: this.y
  };
  var roofPoint = {
    x: this.width / 2 + this.x,
    y: this.y - this.roofHeight
  };
  var rightEaves = {
    x: this.x + this.width + 10,
    y: this.y
  };
  triangle(leftEaves.x, leftEaves.y, roofPoint.x, roofPoint.y, rightEaves.x, rightEaves.y);
}
```
Now, we finally have something like a rational, readable way of drawing our house. Huzzah!

Notice a few different things here:
* This method is super-readable; in fact, everything about this code is. Notice that, after refactoring, you don't need to rely on comments nearly as much to tell you exactly what everything does. As a rule of thumb, "a comment is a lie waiting to happen" (once you change your code, or use it in another context). Try to write **expressive** code by refactoring it into very small actions with highly readable variable, function, and object names. For now, though, you should still absolutely be writing deeply commented code.
* Expressive code depends on good naming, which is hard: you know what leftEaves and rightEaves are because you know about houses. So while there might be lines of code you don't quite grok (and won't for a while), you know where that code lies.
* Notice that when you're writing expressive code, you've got two target audiences in mind: humans (others, but also yourself at a later date) and the computer (or, to be correct, the JavaScript interpreter). This corresponds to what Alex Galloway will call the "sciptural" and "executable" dimensions of code. Code that works isn't the whole story.
* The ```drawRoof()``` method breaks our rule about number of lines of code, but I'm willing to let that slide for now. You can cheat how you count the lines of code, reading each assignment as a single line of code. (In fact, this is how I would write and count for myself, but let's err on the side of expressive here.)
* And so, what I really, really like about this is that each bit of "complicated" math is on its own line. If any of these breaks or needs to change, it will be easy to update or debug.
* Finally, this lets you see one additional easy layer of abstraction which might be amenable to refactoring, which I leave to an exercise to you: the ```overhang``` of the ```leftEaves``` and ```rightEaves``` is the same, so DRY it out. How could you refactor this code so you can get rid of the hard-coded overhangs?

#### Prototypes, Instances, and Inheritance: A Primer
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

#### Have a Ball
Let's get away from houses with their complex, multipart shapes, and get back to basics. We'll be working with ```Ball```s this week. Here we're introducing a few things. The first of these is pragmatic: 1. Using multiple files in a project, and 2. Using GitHub and Atom to look at work.

Fork the ball repo in GitHub, then in GitHub desktop, clone it to your git directory. You may need to reload your repositories by going to File > Reload Repositories. Once you've downloaded it, you can use the contextual menu to open it in Atom. In the file drawer on the left, you'll see a directory and three files: libraries, sketch.js, ball.js, and index.html. All the JavaScript lives in the two .js files.

Here they are, more or less.

Sketch.js:
```
var ball1 = new Ball(20, 20);
var ball2 = new Ball(36, 232);
ball2.size = 20;

function setup() {
  createCanvas(400, 400);
}

function draw() {
	background(100);
  ball1.display();
  ball2.display();
  ball1.update();
  ball2.update();
}
```

Ball.js:
```
var Ball = function (x, y) {
	this.x = x;
	this.y = y;
}

Ball.prototype = {
  size: 15,

	display: function () {
		ellipse(this.x, this.y, this.size, this.size);
	},

	update: function () {
		this.checkForBounce();
		this.move();
	},

	move: function () {
		this.x += 1;
	},

	checkForBounce: function () {
		if (this.x > width - this.size / 2) this.bounce();
		if (this.x < this.size / 2) this.bounce();
	},

	bounce: function () {
    // how do we write this?
	}
};
```
There are a few important things here.

#### Animation
The most important thing to notice is that we just started animating things. ```setup()``` now only has a single line of code: ```createCanvas()```. The work happens in three other places:

* In ```draw()```. Although you'll notice that even here, the code is very straightforward. What is it doing? It colors the background, draws the shape of each ```ball1``` and ```ball2```, and then updates each of them.

* Neither in ```setup()``` nor in ```draw()```, but in the base p5.js context. This is for reasons of scope: variables declared in a function are only accessible in that function. To get access to ```ball1``` and ```ball2``` in both ```setup()``` and ```draw()```, we need to declare them outside all functions. (We don't actually need to assign them there, but why not? It's fewer lines of code.)

* And finally, in the ball.js file, which lets us define ball. We can just include it in other projects if we want to reuse it. (This is why objects are so powerful. If you do it right, they're perfectly reusable and extensible.)

**In p5.js, animation comes from *making small changes in ```draw()```*. These changes occur approximately 60 times per second.**

####
The most important one, which we're just introducing today, is a **condition**. Look at ```checkForBounce()```:
```
checkForBounce: function () {
  if (this.x > width - this.size / 2) this.bounce();
  if (this.x < this.size / 2) this.bounce();
},
```
You'll see here two if statements. They are extremely straightforward, at least in the way that they have been used here:
* The ```if``` keyword introduces a condition
* The condition is enclosed in parentheses: ```this.x > width - this.size / 2```
* If the conditional evaluates to **truthy**, then the code after the condition is executed
* If the conditional evaluates to **falsy**, then the code after the condition is *not* executed
* The ```width``` variable is a p5.js variable that describes the width of the canvas. There is also a ```height``` variable.

We'll get into more complex conditional syntax next time. That said, it is almost always a good idea to keep your conditionals as simple as the ones presented here. The only thing I would change about this to get expressive with the condition. For that, we need return statements, which will wait until next time.

#### Dailies
This week there are five dailies:
* Rewrite Ball so that the balls bounce vertically, rather than horizontally
* Rewrite Ball so that the balls bounce in all directions
* Fork the Shape project three times, using it to animate each of your three moving objects from last week: car, rocket, and the object of your choosing.
* One of these must include some more complex behavior: acceleration, edge detection, or interaction with the mouse 
