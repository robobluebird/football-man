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

# what i learned
1. Express makes it dead simple to fire up a Node app with RESTful routing built right in
2. Node has a lot of power that i didn't even touch on yet (the whole non-blocking IO thing)
3. Heroku spoils me
4. Javascript is getting better syntactically (thank the lord for the => function def!)

# my nginx config
I'm using nginx to reverse-proxy to the Node app, here's my tiny config for that:
```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  # listen 443 ssl default_server;
  # listen [::]:443 ssl default_server;

  root /home/ubuntu/apps/football-man;

  server_name football-man;

  location / {
    root /home/ubuntu/apps/football-man/public;
    try_files $uri @nodejs;
  }

  location @nodejs {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
The only interesting part is where we let nginx handle static assets served from the Node app's public directory (that way we don't waste cycles doing it in-app)
