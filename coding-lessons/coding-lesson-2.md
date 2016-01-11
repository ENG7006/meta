# Lab 2: Variables and Objects, with a Small Taste of Conditions and Animation

### The Problem with ```triangle```
Let's take a look one of our basic p5.js shapes that we learned last time (and that you should be used to a bit by now), ```triangle```:
```javascript
triangle(90, 300, 200, 200, 310, 300); // Draw the main roof
```
This is the line of code from the example house where we drew a roof on the main house. Here we see a problem with p5.js (a problem it inherits from Processing, actually): long parameter lists. The comment tells us what we are doing, but not what all those numbers mean. This is especially bad since looking at six numbers in a row really isn't very easy to read, even for experienced coders. In fact, this is "bad programming practice": generally speaking, we should write functions with no more than four parameters, and, if that doesn't work, then we should at least use as few parameters as possible.

### Variables
Let's tackle these problems in turn:

**First,** ```90, 300, 200, 200, 310, 300``` doesn't help us one bit. It just isn't human readable. If we look at [the p5.js documentation for triangle](http://p5js.org/reference/#/p5/triangle), we will see that the general form of the call is ```triangle(x1, y1, x2, y2, x3, y3);```. This makes good sense, but it's still hard to see a list of six numbers and figure out what they do. So we might actually get closer to what the reference for ```triangle``` describes, by giving our numbers names, or, **assigning them to variables**. Which is to say, we don't need to use the numbers raw, but can give them human-readable names that make it easier to understand what our code is doing:

```javascript
var firstX = 90;
var firstY = 300;
var secondX = 200;
var secondY = 200;
var thirdX = 310;
var thirdY = 300;

triangle(firstX, firstY, secondX, secondY, thirdX, thirdY);
```
Each variable declaration consists of four parts:
* the ```var``` keyword
* the variable name (e.g. ```firstX``` or ```thirdY```)
* an **assignment operation** using the ```=``` operator
* and the **value** of the variable (which is actually the ```return``` value of an **expression**).

**Coding convention**: Variable and function names, generally speaking, should be in lowerCamelCase: they start with a lowercase, and each new word gets a capital letter to mark it, hence ```firstX```, but also, as we'll see below, ```roofPointX``` or ```leftEaves```.

##### The ```var``` Keyword: Declaring variables (and bugs to watch out for)
The ```var``` keyword tells JavaScript that a variable declaration is coming. Technically speaking, with the ```var``` keyword, you don't need the assignment or the value. You could simply write: ```var firstX;``` That said, if you did that, you would end up with an "empty" variable, since it hasn't had any value assigned to it. Technically, its value when empty is actually ```undefined```, which is the source of perhaps the most common error you'll make: trying to do something to an ```undefined``` variable. Go ahead an test it now: in a new project, try to print an empty variable:
```javascript
function setup () {
  createCanvas(400, 400);
  var foo;
  rect(foo, foo, foo, foo);
}
```
 p5.js doesn't complain, but it doesn't do anything either. You may also forget to declare a variable at all, in which case you'll get another very common error:
```javascript
function setup () {
  createCanvas(400, 400);
  rect(foo, foo, foo, foo); // ##: Uncaught ReferenceError: foo is not defined
}
```
These are different, since ```undefined``` is technically a form of definition that arises from an empty declaration, whereas you'll get a ReferenceError when you forget to define the variable at all—or, as often happens to me, rename a variable and forget to change all its instances to the new name.

There's a final, complimentary error, which comes from forgetting the ```var``` keyword. You could write:
```javascript
function setup () {
  createCanvas(400, 400);
  foo = 100;
  rect(foo, foo, foo, foo);
}
```
Here you'll get a ```rect``` at 100, 100 with dimensions of 100 x 100. It works! —which is what makes the problem so insidious. It'll take a long time to explain, but without the ```var``` keyword, variables are **universal**, meaning they have the same name everywhere in the program, and in complicated programs, that makes it easy to accidentally change the values in unrelated code. This is called **scope**, but don't worry too hard about it now. For now, just remember: **variable declarations must always start with the ```var``` keyword.**

##### Assignment: ```=```
**Assignment** is super important. The equals sign—```=```—in JavaScript is **always** and assignment operator. It puts the value on its right side into the variable on the left. You should try not to think of it as "equals" in the mathematical sense. (When you test for equality in JavaScript, you actually use three equals signs strung together: ```x === y``` means: is ```x``` equal to ```y```?)

### A Problem: Build Two Houses. Or, **Refactoring**.
So let's say we decided we wanted to make a second house with a second roof. Let's forget all the fancy stuff and just make some simple boxy houses:

```javascript
function setup () {
  // ...
  rect(100, 300, 200, 200); // Draw the main structure
  triangle(90, 300, 200, 200, 310, 300); // Draw the main roof
  // ...
}
```
If we wanted to add a second house, we would, at this point, probably do something like this:
```javascript
function setup () {
  createCanvas(600, 600); // We still need a canvas

  rect(100, 300, 200, 200); // Draw a main structure
  triangle(90, 300, 200, 200, 310, 300); // Draw a main roof

  rect(350, 300, 200, 200); // Draw another main structure, increasing x by 250
  triangle(340, 300, 450, 200, 560, 300); // Draw another main roof; I had to dig out my calculator
}
```
#### Refactoring
Any time you have to dig out the calculator to figure out where to put the things, that's a good indication that you need to do some **refactoring**. **Refactoring** is what we do when we take some code that works, and rewrite it so that it does *the exact same thing*, but in a way that is somehow better: more readable, less repetitive, more extensible, faster, shorter, etc. It is, effectively, revising your code. As with the writing you're used to, you're doing it wrong if you're not revising.

In this class, we will refactor code so that it gets more reusable, more readable, and less repetitive. Almost always, these are the same thing. Sometimes, that will mean *more* code, but code that *makes more sense*, or that will be shorter in the long run.

#### An interlude on refactoring and workflow
Refactoring, or the practice of revising code, makes a great deal of sense, but it's detailed work. Mostly, it involves figuring out what happens, and then grouping naming various bits of the process so that the code is easier to read, modify, and reuse.

But what that means is that you're going to take perfectly working (but not perfectly good!) code and then start rewriting it. Which means you *will* break it. Don't worry; programming is like 90% debugging, especially when you begin. So make a *small* change, test to see that everything still works, then make another *small* change, and test that change. You never want to be more than a few undo-able steps away from your original, working, messy code, or from a slightly less messy, still working, intermediate version.

But then also: git is your friend! Here's the real workflow, which will make you so much happier:
1. Make a small change.
2. Test to see if it works.
3. If it doesn't work, change the change.
4. When it works, commit the change to git.
5. Goto 1.

So now, let's switch from the p5.js IDE to our real development environment: GitHub Desktop, Atom, and Chrome. So let's rewrite this workflow:

1. Make a small change: edit the file in Atom.
2. Test to see if it works: save the sketch.js file in Atom, and (re)load the index.html file in Chrome.
3. If it doesn't work, change the change: back to Atom we go!
4. When it works, commit the change to git in GitHub desktop: give it a short, unique name and then describe the change in imperative language (House dimensions in variables: Put house dimensions in variables to make code more readable.)
5. Goto 1. But if there are bugs, make sure to open Chrome's developer tools and/or JavaScript console: View > Developer > JavaScript Console, or option+command+J.

#### And now, back to the house
Let's refactor this code to use some variables, and break it down step by step. First, let's make some names for the parts of the house:
```javascript
var houseX = 100;
var houseY = 300;
var houseWidth = 200;
var houseHeight = 200;

rect(houseX, houseY, houseWidth, houseHeight); // Draw a main structure
```
There, isn't that better?

Now, since the roof is relative to the house, let's do some fancy footwork, and instead of passing variables as parameters straight, we can write some **expressions** that express the dimensions and values of the roof relative to that of the structure of the house:
```javascript
var roofHeight = 100;
var roofPointX = 200;
triangle(houseX - 10, houseY, roofPointX, houseY - roofHeight, houseX + houseWidth + 10, houseY); // Draw a main roof
```
You'll notice a few things. First, we're beginning to notice and encode the structure of the house relative to itself: e.g. the first and last ```x```es of the ```triangle``` are 10 pixels outside of the main ```rect``` of the house.

Second, while there are variables here, and the ```rect``` is nice and readable, the ```triangle``` is a total mess. Let's leave it a mess for now. When you're refactoring, it's often a good idea to leave things a mess for a moment if it works, so that you can figure out what the mess is doing, how it will unfold. (When you're learning something, you'll often have those messes, which you need to leave to the side for a while to focus on something more important.)

So now we have one house. How do we build the second house? We've built it by increasing the various ```x```es by 250 pixels.

We can add this bewildering line of code:
```javascript
houseX = houseX + 250;
```
If you're wondering how something can be equal to itself plus some value—that's not what *equals* means—you're making lots of sense. You're remembering math class! Which is usually good. But you're forgetting that ```=``` is the *assignment* operator. It's not about equality in the algebraic sense, instead it's taking the value on the right and storing it under the name on the left. (Something that may or may not help: there's an **increment** operator, too, written like this: ```+=```. So you could rewrite this line as: ```houseX += 250;```, which also looks weird, but at least has the benefit of showing you that ```=``` isn't about *equality* but *assignment*.)

Note also that we can assign variables not only using strict numbers, but also *expressions*, even *expressions that include the variable itself*. The expression on the right is evaluated *first*, and then the result is assigned to the variable.

So now, we can copy-and-paste most of our code above, and it will draw us a house 250px to the right:
```javascript
rect(houseX, houseY, houseWidth, houseHeight); // Draw another main structure
triangle(houseX - 10, houseY, roofPointX, houseY - roofHeight, houseX + houseWidth + 10, houseY); // Draw another roof
```
What are we missing?

The roof point! How can we fix it?

The best option is to figure out the **algorithm** for the roof point. Which is:
```javascript
var roofPointX = houseX + houseWidth / 2;
```
Replace our original **declaration** of roofPointX with this expression, and instead of being hard-coded, it's relative! Yay! And it works!

But only for the first house. Why?

We can fix it two ways. We can increase ```roofPointX``` by 250, like ```houseX```: ```roofPointX = roofPointX + 250;``` Or, we can recalculate roofPointX with the new values once we increase ```houseX``` by writing an almost identical line of code: ```roofPointX = houseX + houseWidth / 2;```. (How is it different from its initial declaration?) Both work, and both suffer from the same problem, which is that they require this extra line of code to work; we can't just add 250 and be done with it. (Me, I want to add 250 and be done with it.) As far as we have it here, the way to fix it is actually to stop relying on the declaration of ```roofPointX``` to draw the roof, and instead to pass the algorithm expression into ```triangle```, so that each time, the function call reads:
```javascript
triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY);
```
Actually, both times, we have the same two lines of code repeated verbatim:
```javascript
rect(houseX, houseY, houseWidth, houseHeight);
triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY);
```
The first line is nice and simple and easy to read, the second one is a huge pain, for so very many reasons.

### Functions: Hide the mess and DRY out your code
Here's a first principle in refactoring: **DRY**, or **don't repeat yourself**. When you have something like the two repeated lines above, that means it might be time to build yourself a function. (And if you see the same lines of code three times in your project, you'll be sure it's time to build yourself a function.) In JavaScript, functions are actually held by variables, just like values. (In this, it is quite different from other programming languages.)

Effectively, in creating a function, we are giving a name to a block of code, so that when we want to invoke it, we don't have to repeat the instructions, instead, we can just tell JavaScript the name for that block of code. For example, ```drawHouse()```.

So one thing we might do is this:
```javascript
var drawHouse = function () {
  rect(houseX, houseY, houseWidth, houseHeight);
  triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY);
};
```
Where do we put this, though? One option is to declare it with all the other variables up at the top of ```setup()```. This is a good habit to form, declaring all your variables at the beginning of your functions:
```javascript
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

  houseX = houseX + 250; // Increase x by 250

  drawHouse();
}
```
This means that you could draw as many houses as you like, in a bunch of different ways, by reassigning variables and then calling ```drawHouse()``` each time you redesign them.

**Coding convention:** indentation. You'll notice that the editors we are using automatically indent the code a certain amount: every time you add a layer of curly braces, it adds two more spaces. Makes the code much easier to read! Please keep all code at the same level of embeddedness at the same level of indentation. You should avoid embedding too many levels, which means so you should try to keep your code as flat as possible.

#### Objects: I promise you, this makes things *less* complicated
This ```drawHouse()``` solution hides the problem by tucking it away under a function, so that now you can see that, after some preamble, ```setup()``` draws two houses. But we still have that awful line of code lurking in our shiny new ```drawHouse()``` function:
```javascript
triangle(houseX - 10, houseY, houseWidth / 2 + houseX, houseY - roofHeight, houseX + houseWidth + 10, houseY);
```
How do we start? To tackle how to refactor that monstrosity, let's turn back to the first, really annoying line of code that doesn't really tell us anything, either, the original roof:
```javascript
triangle(90, 300, 200, 200, 310, 300);
```
It's less verbose, and possibly less vertiginous, but it sure isn't any more informative. Recall that our reference information says that the format is ```triangle(x1, y1, x2, y2, x3, y3);``` If you're thinking back to geometry class, you might recall that a triangle is a collection of three points, which usually get written (x, y). You might then think it will help you to write ```triangle((90, 300), (200, 200), (310, 300);```. This would indeed make it more readable! (Try it and see what happens.)

#### Properties: how objects group variables together
So that doesn't work. How can we group variables together in this way? **Objects**!!! In JavaScript, objects are, at least at this most fundamental level, dead simple. They are collections of **properties**, which is a specific kind of variable: properties are variables that belong to an object. To write objects, instead of grouping parameters together in parentheses, you group properties together with curly braces:
```javascript
var firstCorner = { x: 90, y: 300 };
```
Notice a few things about this line of code: inside an object's curly braces (in the jargon, we say, in **object literal**) notation, we use ```:``` instead of ```=``` to do assignment, and instead of semicolons to end lines, we just need commas to separate assignments.

To access properties, you can use what is called "dot notation": put a dot after the name of the object, and then the name of the property. So actually, the following is equivalent to our object declaration above:
```javascript
var firstCorner = {}; // Make an empty object, which means it has no properties
firstCorner.x = 90; // Make a property, x, on firstCorner, and assign it the value of 90
firstCorner.y = 300; // And y becomes 300
```
It's less compact, but it does the identical thing. And in the same way that you can assign values in this way, you can also access them:
```javascript
print(firstCorner.x); // 90
print(firstCorner.y); // 300
```
##### Another whack at ```triangle```
So: if we wanted to make our ```triangle``` easier to read (and oh my, do we want our code to be easier to read), you could do it this way:
```javascript
var firstCorner = { x: 90, y: 300 };
var secondCorner = { x: 200, y: 200 };
var thirdCorner = { x: 310, y: 300 };

triangle(firstCorner.x, firstCorner.y, secondCorner.x, secondCorner.y, thirdCorner.x, thirdCorner.y);
```
This is more characters (and maybe a bit overly verbose: do we really need to call them corners?), but it is way, way easier to understand what that line of code is doing. Instead of an accumulation of numbers, we can see a thoroughly descriptive line of code—that tells us not only what *we* are doing, but what *p5.js's ```triangle``` is doing*.

A few points: First, each object gets its own ```x``` and ```y```. Each object gets a new **scope**, which simply means that you can reuse variable names without cross-contamination. (Once again, scope is a really, really hard concept to grasp, so don't worry too much about it now—just remember this: objects get to call their variables whatever they want, and you always need to use the ```var``` keyword with variable declarations.)

Second, **object variables can point to functions**, simply because *variables can point to functions*. This means that objects don't only hold *data* in variables, but can learn to *do* things with that data.

Third, **objects can contain other objects**, which may sound totally bonkers until you take seriously what it means to call these entities objects. Houses contain (are made of) roofs and walls, and contain kitchens which contain stoves and refrigerators and people and family drama and skeletons in the closet and so on.

So, with these ideas in mind, let's keep refactoring our house by making it its own object. We might decide that a house contains a roof and a structure. We might thus decide that a ```house``` object should somehow include a ```structure``` object and a ```roof``` object. And finally, we might decide that it doesn't make much sense for ```setup()``` to have to know all about what we mean by a house, and so we can pull it out of ```setup()``` and give it its own domain.

```javascript
var house = {
	x: 100, // was houseX
	y: 300, // was houseY
	width: 200, // was houseWidth
	height: 200, // etc.
	roofHeight: 100,
	draw: function() { // this is nearly identical to drawHouse(); what's different?
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

#### ```this```
One thing to notice, which I can promise you will be a source of confusion, is all the ```this```es in here. ```this``` is an object's way of referring to itself; it's kind of like a variable. In fact it's a **keyword**, like ```var```, and, as we'll see below, ```if```, and as we'll see next time, ```new```. For now, that simply means you can't use it as a variable name; it's reserved for the language. So before, in the example with the triangle corners, we used ```firstCorner.x``` to refer to the value stored there? ```this.x``` is just about exactly same thing. (You can treat it that way for now.) But because of scope (eek!), *inside* of an object, you refer to it as ```this```, and outside an object, you refer to it as the variable name you gave it (e.g. ```firstCorner```).

We've refactored our code to make things more readable in general, but we're not done yet, because we still (still!) have our terrible line of code with the triangle. So let's get things as dead simple as possible, and do the same thing we did before: pull out lines of code into separate functions. Let's take the two lines of ```draw()``` and  a ```drawStructure()``` method and a ```drawRoof()``` method. The first is easy:

```javascript
drawStructure: function () {
  rect(this.x, this.y, this.width, this.height); // Draw a structure
}
```
The ```drawRoof()``` method, if we do it right, gets us to a nice, readable place by pulling the expressions out of parameters and assigning them to variables, according to the model above. Now, if we had done this in ```setup()``` this would have been awful and confusing, giving ourselves so many variables to worry about. But now, only the ```drawRoof()``` method needs to know about them:
```javascript
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

Here is the code, all together:
```javascript
var house = {
	x: 100, // was houseX
	y: 300, // was houseY
	width: 200, // was houseWidth
	height: 200, // etc.
	roofHeight: 100,
	draw: function() {
		this.drawStructure();
		this.drawRoof();
	},
	drawStructure: function() {
		rect(this.x, this.y, this.width, this.height); // Draw a structure
	},
	drawRoof: function() {
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
};

function setup () {
	createCanvas(600, 600);

	house.draw();
	house.x = house.x + 250;
	house.draw();
}

function draw() {

}
```

Notice a few different things here:
* This method is super-readable; in fact, everything about this code is. Notice that, after refactoring, you don't need to rely on comments nearly as much to tell you exactly what everything does. As a rule of thumb, "a comment is a lie waiting to happen" (once you change your code, or use it in another context). Try to write **expressive** code by refactoring it into very small actions with highly readable variable, function, and object names. For now, though, you should still absolutely be writing deeply commented code. Here, you probably don't need comments for the ```triangle``` line, but each line with an assignment in ```drawRoof()``` is a good candidate for commenting.
* Expressive code depends on good naming, which is hard: you know what ```leftEaves``` and ```rightEaves``` are because you know about houses. What's good about these names is that, while there might be lines of code you don't quite grok in those expressions (and won't for a while), you know what the code that is there does at one remove: set the x of the left eaves of the house.
* Notice that when you're writing expressive code, you've got two target audiences in mind: humans (others, but also the human who is you at a later date) and the computer (or, to be correct, the JavaScript interpreter). This corresponds to what Alex Galloway will call the "sciptural" and "executable" dimensions of code. Code that works isn't the whole story—and that's a huge part of what we're learning this semester.
* The ```drawRoof()``` method breaks our rule about number of lines of code a function can have, but I'm willing to let that slide for now. First, because you can totally cheat how you count the lines of code—there are only three semicolons! This way, each object assignment is a single line of code. (In fact, this is how I would write and count those lines for myself, but let's err on the side of expressive here.)
* And so, what I really, really like about this is that each bit of "complicated" math is on its own line. If any of these breaks or needs to change, it will be easy to update or debug.
* Finally, this lets you see one or two additional easy layers of abstraction which might be amenable to refactoring, which I leave as exercises to you: the ```overhang``` of the ```leftEaves``` and ```rightEaves``` is the same, so DRY it out. How could you refactor this code so you can get rid of the hard-coded overhangs? Or, how might you express the height of the roof?

### Have a Ball
Let's get away from houses with their complex, multipart shapes, and get back to basics. We'll be working with ```Ball```s this week and next. Here we're introducing a few things. The first of these is pragmatic: 1. Using multiple files in a project, and 2. Using GitHub and Atom to look at work.

Fork the ball repo in GitHub, then in GitHub desktop, clone it to your git directory. You may need to reload your repositories by going to File > Reload Repositories. Once you've downloaded it, you can use the contextual menu to open it in Atom. In the file drawer on the left, you'll see a directory and three files: libraries, sketch.js, ball.js, and index.html. All the JavaScript lives in the two .js files.

Here they are, more or less.

Sketch.js:
```javascript
function setup() {
  createCanvas(600, 400);
}

function draw() {
	background(100); // pay special attention to this line
  ball.display();
  ball.update();
}
```

Ball.js:
```javascript
var ball = {
  x: 20,
  y: 200,
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
    // (Hint: it will entail changes outside the bounce() function.)
	}
};
```
There are a few important things here.

### Animation
The most important thing to notice is that we just started animating things. ```setup()``` now only has a single line of code: ```createCanvas()```. The work happens in three other places:

* In ```draw()```. Although you'll notice that even here, the code is very straightforward. What is it doing? It colors the background, draws the shape of the ```ball```, and then it asks the ```ball``` to update itself. The ```ball``` knows how to display and update itself!

* Which means the work also happens in the ball.js file, which lets us define the ```ball``` object. We can just include it in other projects if we want to reuse it. (This is why objects are so powerful. If you do it right, they're perfectly reusable and extensible.)

**In p5.js, animation comes from *making small changes in ```draw()```*. These changes occur approximately 60 times per second.**

### Conditions and Conditionals
The most important one, which we're just introducing today, is a **condition**. Look at ```checkForBounce()```:
```javascript
checkForBounce: function () {
  if (this.x > width - this.size / 2) this.bounce();
  if (this.x < this.size / 2) this.bounce();
},
```
You'll see here two if statements. They are extremely straightforward, at least in the way that they have been used here:
* The ```if``` keyword introduces a condition
* The condition is enclosed in parentheses: ```(this.x > width - this.size / 2)```
* If the conditional evaluates to **truthy**, then the code after the condition is executed
* If the conditional evaluates to **falsy**, then the code after the condition is *not* executed
* The ```width``` variable is a p5.js variable that describes the width of the canvas. There is also a ```height``` variable.

**Truthy** and **falsy** are weird neologisms that describe what happens in dynamically-typed languages like JavaScript (and Ruby). ```true``` and ```false```, evidently, are truthy and falsy respectively. But it doesn't stop there: 0 is falsy, and any other number is truthy. An empty string (```""```) is falsy, but every other string is truthy. ```undefined``` is falsy, and any object that isn't otherwise falsy is truthy.

We'll get into more complex conditional syntax next time. That said, it is almost always a good idea to keep your conditionals as simple as the ones presented here. The only thing I would change about this code would be to get expressive with the condition (defining a function, say, called ```hitsRightEdge()``` or something; for that, however, we will need ```return``` statements, which will have to wait until next time).

#### Dailies
This week there are six dailies:
* Refactor one of your sketches from last week so that it's more expressive
* Rewrite Ball so that the ball bounces vertically, rather than horizontally
* Rewrite Ball so that the ball moves and bounces in both directions at once
* Fork the MovableShape project twice, using it to animate two of your three moving objects from last week: car, rocket, and your own special moving object
* One of these must include some more complex behavior: acceleration, edge detection, or interaction with the mouse

Notes about MovableShape:
1. This is the first place where you'll be relying on "support code." I have not hidden this code away, so you can't see it. (Although actually, you'd be able to see all of it anyway, since that's the nature of this particular beast: since JavaScript is an interpreted language, that means if you can use it, you can also read it.) However, I've also left it in there so you can see what I've done, how the object works internally. It's pretty straightforward, using a very simple algorithm, so that you can move whole complex shapes very easily. Be sure to follow the instructions in the code comments.
2. **Acceleration** can happen linearly (adding a small amount to a ```delta``` (or ```speed```) in each ```update()``` or ```draw()```) or exponentially (multiplying ```delta``` by a small, fixed amount on each ```update```). For example, ```delta.x = delta.x + 0.25;``` or ```delta.x = delta.x * 1.05;```. In this last one, note ```*``` is the multiplication operator, and in much the same way ```x = x + 1;``` can be rewritten as ```x += 1;```, ```x = x * 0.25;``` can be rewritten as ```x *= 0.25;```.
3. Recall from last lesson that we discovered how to get the position of the mouse: ```mouseX``` and ```mouseY```. So if you simply replaced the x and y of the ```movableShape``` to read ```mouseX``` and ```mouseY```, the object will just follow the mouse. Although beware: where do you need to do this?

Sketch.js:
```javascript
// give movableShape a nice, descriptive name to work with here
// (i.e., replace myShape with something more descriptive.)
var myShape = movableShape;  

// Redefine drawShape() by putting your moving shape in here
// (Basically, you can copy and paste your code from last time, although you may wish to refactor it so that it's more readable.)
myShape.drawShape = function () {
	// your code goes here
};

// You will also need to do some work to set the speed of the shape. How do you want it to move? What do you need to change to get it to move?

setup = function() {
	createCanvas(600, 600);
};

draw = function() {
  background(100); // refresh the background
  myShape.display(); // display myShape
  myShape.update(); // and then update it
};
```
MovableShape.js:
```javascript
var movableShape = {
	// x and y indicate the current position of the shape
  // x and y can be offset in setup() to move the shape wherever you'd like it to go
	x: 0,
	y: 0,
	// origin is used to store the original position of the shape
	origin: { x: 0, y: 0},
	// delta.x and delta.y indicate how much to move() the shape
	speed: { x: 0, y: 0 },

	/*
		Put your shape(s) in drawShape()
		You can simply override what is here in your sketch.js:
			myShape.drawShape = function () {
				// your code goes here
			};
		It is blank here so the code runs without any revision.
	*/
	drawShape: function () {},

	// A common pattern in Processing is to give each object its own display() and update() methods, each of which are called in draw().

	// The display method uses translate() to move the shape, en masse, to the current x and y.
	display: function () {
		push();
		translate(this.x - this.origin.x, this.y - this.origin.y); // this is where the magic happens
		this.drawShape(); // this is where your drawShape() gets called
		pop();
	},

	// update() groups together all the things that happen each time draw() is called
	// If you wanted to build some acceleration in here, you might add a line or two to modify the speed
	update: function () {
		this.move();
	},

	// Applies speed.x and speed.y to the shape
	move: function () {
		this.x = this.x + this.speed.x;
		this.y = this.y + this.speed.y;
	}

};
```
