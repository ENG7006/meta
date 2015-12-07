#!/bin/sh

# download and install Homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# download Homebrew Cask
brew install caskroom/cask/brew-cask

# cask-install our five main gui apps;
# we will have to enter an admin password at this stage
brew cask install google-chrome
brew cask install atom
brew cask install github-desktop
brew cask install slack
brew cask install p5

# install the xcode cli tools, and a little applescript to avoid having to click buttons
xcode-select --install
sleep 1
osascript <<EOD
  tell application "System Events"
    tell process "Install Command Line Developer Tools"
      keystroke return
      click button "Agree" of window "License Agreement"
    end tell
  end tell
EOD

# install rbenv
brew install rbenv ruby-build

# set the English user's bash profile to work with rbenv, just because
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile

# install other CLI tools
brew install node
brew install heroku-toolbelt
