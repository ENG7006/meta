### Lab 1
The first lab involves the following non-coding material:
* Overview of the class website
* Introduction to our software tools
* Setting up the relevant accounts: GitHub & Slack
* (Also: choose good passwords! [cf. XKCD])
* Getting started with GitHub & desktop
* Setting up Jekyll blogs
* Intro to writing with Jekyll

#### ...and also the first coding lesson: Intro to Drawing with p5.js
Before we get down to brass tacks with p5.js:
* Make a sandwich

Now, p5.js:
* p5.js is primarily a graphics library
* But we can write the simplest program ever in the IDE, which is everybody's first program: *Hello World!* (Or, if you're an English professor: *Hello, world!*)

When we open a p5.js project, notice there's already some code in there for you. It looks like this:
```
function setup () {

}

function draw () {

}
```

These two things,```setup()``` and ```draw()``` are, perhaps obviously, **functions**. Much of what we will do this semester is specify what happens in these two core p5.js functions. The code in ```setup()``` runs once (in the jargon: it is *called* once), at the very beginning of the program. The code in ```draw()``` runs over and over again, approximately 60 times per second. You can forget about that for now.

Let's write our first Hello World!:

```
function setup () {
  print("Hello, world!");
}

function draw () {

}
```
Now press the play button. What happens? Our first program! It runs!

But notice that in addition to the output in the frame at the bottom of the main coding window (this is called the **console**), we get an empty window, and a line of text in the console. The console is usually hidden from users; anybody loading this up in a browser would just see a blank window. So clearly, that's not the right way to go. How can we point the text at the user?

Instead, let's try ```text("Hello, world!", 20, 20);```:

```
function setup () {
  text("Hello, world!", 20, 20);
}

function draw () {

}
```

Let's take that apart: ```print()``` sends something out to what we call the console; ```text()``` sends text to our target graphics window. (Both, I should note, are functions that belong to p5.js.)

What comes between the parentheses is the information that gets sent to different places. In JavaScript terms, ```print()``` and ```text()``` are **functions** or **methods**, and ```"Hello World!"``` and ```20``` are **parameters** or **arguments**. (Each pair are nearly exact synonyms; one thing about programming is that nobody agrees, quite, what to call things. In fact, there are subtle distinctions: parameter is the abstract term, while arguments are what are concretely passed into a function; function is the general term, and methods are functions that belong to an object. This distinction won't yet make sense, and for now you can treat them more or less as synonyms. I will use correct terminology, and if you have questions or confusions, please ask.)

So, what are those ```20```s doing there?

Let's dissect: ```text("Hello, world!", 20, 20);```
* ```text``` is the function
* ```(``` and ```)``` enclose the list of arguments
* The arguments are separated by ```,```s
* ```;``` indicates the end of a line
* ```"Hello, world!"``` is the ```string``` to be printed.
* ```Hello, world!``` is the text itself, and there are quotation marks (```"```) around it; you could also use single quotes (```'```). These indicate that it's a string—as opposed to code.
* The ```20```s indicate the x and y position of the text (hold onto this, we'll come back to it.)

One additional note here:

So I said before that p5.js is primarily about graphics, so the text is just a specific instance of a broader principle. Let's try a few alternatives, placing each of these in the ```setup()``` function in turn (or, all at once):

* ```ellipse(40, 20, 10, 20);```
* ```rect(40, 20, 10, 20);```
* ```triangle(10, 10, 10, 40, 40, 10);```

Now, you'll notice these is actually a super tiny area. That's because the default canvas that p5.js gives us is really small. Try:
```
rect(20, 20, 400, 400);
```
The rectangle is cut off! What if we want to see more of our drawing? We need a bigger ```canvas```!

Before your draw statements, let's add a little bit of code:
```
function setup () {
  createCanvas(600, 600);
  background(100);
  rect(20, 20, 400, 400);
}
```
We've now added two new p5.js functions: ```createCanvas()``` and ```background()```. What do they do?

There are few ways of thinking about this.

First, we can look up the [p5.js reference](http://p5js.org/reference/) for each of the functions: [createCanvas](http://p5js.org/reference/#/p5/createCanvas), [background](http://p5js.org/reference/#/p5/background), and [rect](http://p5js.org/reference/#/p5/rect).

Second, we might instead write our intentions next to each line of code, like this:
```
/*
  Define the p5.js setup function to draw a big rectangle
*/
function setup () {
  createCanvas(600, 600); // Create a canvas 600 x 600 pixels
  background(100); // Set the background to gray: 100 on a scale of 0 to 255
  rect(20, 20, 400, 400); // draw a 400x400 rectangle with the top corner at 20, 20
}
```
What you see here after the code are **comments**, or human-readable bits that the JavaScript parser ignores. There are two ways of making comments. **Inline comments** are indicated by two slashes—```//```—and indicate that the rest of the line is a comment. A return will break you out of the comment. **Block comments** are indicated by slashes and asterisks. They begin with ```/*``` and end with ```*/```, and everything between these is skipped, no matter how long.

Now, this is a bit like the "make me a sandwich" exercise: you'll have to break down your intentions into little itty bitty commands (function calls, expressions, and so on). Often, it helps if you write down your intentions line by line in comments.

The practice of describing to yourself your intentions in almost-code is a practice called writing **pseudocode**, and it will be enormously helpful as you learn to begin to code. I encourage you to write pseudocode for each line, or almost each line, of code in a comment. You can do it one of two ways: after the code, as above, or on the line before each line of code.

We've met three different p5.js shapes: ```rect```, ```ellipse```, and ```triangle```. With a triangle, an ellipse, and a rectangle. With that we can draw a great many things! For the rest of lab, let's work on drawing a house.

Finishing (and/or embellishing) the house will be one of your five daily assignments this week, along with two specific assignments and two non-specific assignments. Draw: a car, a rocket, something of your choosing that moves in some way, and something of your choosing that does not move. Don't worry about animating the moving things; that will be our task for next class.

##### In-class Project 1: Build a House
First, let's draw a house and decompose it into its primitive shapes and make some decisions about the house we'd like to build. Let's begin it together.

Here is one possible house sketch:
```
function setup() {
	createCanvas(600, 600); // build us a canvas
	background(0); // I think it should be night time
	noStroke(); // Draw shapes without an outline
	fill(100); // The ground should be dark but not black
	rect(0, 500, 600, 100); // Draw the ground

	fill(150); // Make the house a medium gray
	rect(100, 300, 200, 200); // Draw the main structure
	triangle(90, 300, 200, 200, 310, 300); // Draw the main roof

	rect(300, 400, 150, 100); // Draw an addition
	// Draw the addition roof
	rect(300, 350, 100, 50); // the rect part
	triangle(460, 400, 400, 350, 400, 400); // the triangle part

	// Draw a chimney
	rect(125, 215, 25, 100);

	// I originally drew all the house's architecture just a wee bit too far left
	translate(15, 0); // everything below this will be 15 px to the right

	// Draw a door
	fill(0);
	rect(125, 425, 45, 75);
	// and a doorknob...
	fill(150); // the same color as the rest of the house
	ellipse(135, 460, 7, 7);

	// Draw some windows
	fill(255); // windows are lit up at night

	// Draw the first window
	rect(200, 425, 20, 20); // first pane, top left
	rect(225, 425, 20, 20); // second pane, top right
	rect(200, 450, 20, 30); // third pane, bottom left, a little taller
	rect(225, 450, 20, 30);	// fourth pane, bottom right

	// increase x by 75 px for second window
	rect(275, 425, 20, 20);
	rect(300, 425, 20, 20);
	rect(275, 450, 20, 30);
	rect(300, 450, 20, 30);

	// and again by 75 px for third window
	rect(350, 425, 20, 20);
	rect(375, 425, 20, 20);
	rect(350, 450, 20, 30);
	rect(375, 450, 20, 30);

	// draw two upstairs windows
	// above the door by 110 px
	rect(125, 315, 20, 20); // upstairs they're square
	rect(150, 315, 20, 20);
	rect(125, 340, 20, 20);
	rect(150, 340, 20, 20);

	// and another 75px to the right for the second upstairs window
	rect(200, 315, 20, 20);
	rect(225, 315, 20, 20);
	rect(200, 340, 20, 20);
	rect(225, 340, 20, 20);

	// and finally, make a moon
	fill(255);
	ellipse(450, 100, 75, 75);
}
```
