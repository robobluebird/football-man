# football-man
express.js app for getting football stats for the week

# to try the service (this might not be active for very long)
http://ec2-34-215-133-35.us-west-2.compute.amazonaws.com/api/games/1

(try any week number from 1-17)

# to run the service locally

1. use your prefered package manager to install node (which will come with npm, the node package manager)
```
# this example is for Homebrew on Mac OS X
# note: other package managers like apt-get might have a different name for the node package, like "nodejs"
brew update
brew install node
node -v
npm -v
```
2. checkout the project from github
```
git clone https://github.com/robobluebird/football-man.git
cd football-man
```
3. install dependencies (npm will inspect the package.json file included in the repo to determine dependencies)
```
npm install
```
4. run the Express.js application @ http://localhost:3000
```
npm start
```

# why Express?
1. To familiarize myself with Node, and a very common framework used with Node
2. To test the feasibility of Express for quick prototyping
3. To get somewhat up to date on the latest ECMAScript goodness (I've been almost 100% Ruby for a while)

# why EC2? why not Elastic Beanstalk or Heroku
1. To remove some of the magic that Heroku et al provide in terms of code deployment, process starts, etc
2. To remember some nginx stuff that I continually forget
