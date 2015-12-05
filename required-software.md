# Required Software for ENG 7006

ENG 7006 uses [p5.js](https://p5js.org) and JavaScript as a platform for creative coding practice, [GitHub](https://github.com) as a system for distributing project files and submitting coding work, and [GitHub Pages](https://pages.github.com/) + [Jekyll](https://jekyllrb.com/) as a platform for blogging, and [Slack](https://slack.com) as a communication tool. We will all be using a standard set of software tools (in coding practice: a *development environment*) and a standard set of procedures (in the jargon: a *workflow*) to write code and write blogs, to download project files and access readings.

All of this software is "free as in beer" (meaning you don't have to pay for it); some of it is "free as in speech" (open source, or OSS [= "open source software"], or, more preceisly, FOSS [= "free and open source software"]).

To that end, here is a list of necessary software:
* The p5.js IDE (IDE = "integrated development environment")
* GitHub Desktop
* Atom
* Google Chrome (make sure it is up to date if you've been using it for a while)
* Slack (although slack.com includes a web interface, so installing the software is optional)

And, for some work late in the semester, we will need some command-line tools:
* Git CLI (CLI = "command line interface"; these can be and should be installed when you install GitHub Desktop)
* Node.js
* NPM (NPM used to stand for "node package manager"; now it stands for nothing, apparently)
* Jekyll
* Pandoc
* Heroku CLI

Please note: the CLI software will not be necessary, although may be desirable, on your personal computers. These tools, along with a few others that might make life easier, will be on the iMacs in 029 State. They should be easy enough to acquire and use on a Mac, but I have no idea what these look like on a Windows machine; I haven't used a PC on a regular basis for 15 years, and even then I mostly ran Linux).

#### Software Installation Process
* Upgrade current Mac OS X
* Upgrade to OS X 10.11.1 El Capitan
* Copy the following programs to ```/Applications```: Atom, GitHub Desktop, Google Chrome, p5.js IDE, Slack
* Open GitHub Desktop, install CLI git, and install XCode CLI Tools
* Install the following packages: node.js, pandoc, and Heroku toolbelt
* Installing Jekyll can be accomplished simply, but problematically, with a single command: ```sudo gem install jekyll```.

##### Installing Jekyll properly
If we're going to do it right, it's gonna take a minute, not only because it's complicated, but it involves downloading a whole bunch of stuff every time. (Meh.)

First, install a Ruby that is *not* the Ruby that comes with the system:
* Install Homebrew: ```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
* Install rbenv and ruby-build: ```brew install rbenv ruby-build```
* ```rbenv``` only sets things locally, for each particular user. So, log in as Student, open a terminal, in which goes the following:
* ```echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile``` (This sets the terminal environment properly so rbenv works properly.)
* ```rbenv install 2.2.3``` (This actually installs Ruby, which will take a minute.)
* ```rbenv global 2.2.3``` (This sets the version of Ruby to use as 2.2.3, instead of the system version.)
* Next, type ```ruby -v```, and it should come up ```ruby 2.2.3``` and then a bunch of other stuff. If not, oy.

(Note that for other users on the machine, installing Ruby 2.2.3, which takes a while, will be a separate process. So will setting their ```.bash_profile``` file. [Meh.])

Now, we can install Jekyll, making sure that we're still logged in as Student:
* ```gem install jekyll```
* To make sure it installed properly, open a new terminal window (cmd-N) or tab (cmd-T) and type ```jekyll```. This should give you a whole bunch of output that starts by complaining that you didn't tell it to do anything.

The good thing about this is that we can install some of our other software this way in more proper ways:
* ```brew install node```
* ```brew install heroku-toolbelt```

(Although actually, I might put this off if/until we get to node, and heroku deployment.)

(Although actually actually, I think I just wrote a shell script or two that do[es] all the things.)
