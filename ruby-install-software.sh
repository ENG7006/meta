#!/bin/sh

# set the bash profile to work with rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile

# install ruby using rbenv
rbenv install 2.2.3
# make the ruby we use the rbenv ruby (not system ruby)
rbenv global 2.2.3
# make absolute sure our shell is up to date and using the right ruby
# this is almost certainly redundant
rbenv rehash
source ~/.bash_profile

# install jekyll (it will install with current ruby)
gem install jekyll

# be sure the shell is up to date
source ~/.bash_profile

# make sure these work the way they're supposed to
ruby -v
jekyll -v
