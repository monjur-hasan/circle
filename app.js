const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('./db.js');
require('./auth');
const moment = require('moment');
const passport = require('passport');
const session = require('express-session');

const app = express();
const sessionOptions = {
	secret: 'secret cookie thang (store this elsewhere!)',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  app.locals.user = req.user;
  if(req.user === undefined){
      app.locals.logged = false; 
  }
  else{
      app.locals.logged = true;
      app.locals.username = req.user.username;
      res.locals.res = res;
  }
  app.locals.domain = req.headers.host;
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const Comment = mongoose.model('Comments');
const Topic = mongoose.model('Topic');
const User = mongoose.model('User');

app.get('/', function(req, res) {
  if(req.user){
    Topic.find({}).lean().exec(function(err, data){

      const log = data.map(topic => { //higher order function #1
          return topic.comments.filter(ele => { //hof #2
            ele["topic"] = topic.title;
            ele["slug"] = topic.slug;
            return ele.user === req.user.username;
          });
      });

      const CommentLog = log.reduce((accum, ele) => { //hof #3
          ele.forEach(obj => {
            accum.push(obj);
          });
          return accum;
      }, []).reverse();
      res.render('home', {topic: CommentLog});
    });
  } else {
    res.render('home');
  }
  
});

app.get('/new-topic', (req, res) => {
  res.render('new-topic', {err:""});
});

app.post('/new-topic', (req, res) => {

  if(req.body.name && req.body.desc){
    new Topic({
      title: req.body.name,
      desc: req.body.desc,
      user: req.user.username,
      time: moment().format('MMMM Do YYYY, h:mm:ss a')
  
    }).save(function(err, topic){
      if(err){
        res.send("DB SAVE ERROR");
      } else {
        res.redirect(`/topic/${topic.slug}`);
      }
    });
  } else {
    res.render('new-topic', {err: "Name or description cannot be empty"});
  }
});

app.get('/topic/:slug', (req, res) => {
    const id = req.params.slug;
    Topic.findOne({slug: id }, function(err, topic) {
      topic.comments.reverse();
      res.render('topic', {topic: topic});
    });
});

app.post('/new-comment', (req, res) => {
    const id = req.body.id;
    const comment = req.body.comment;
    const time = moment().format('MMMM Do YYYY, h:mm:ss a');

    if(comment){
      Topic.findOneAndUpdate({slug: id}, 
        {$push: {comments: {desc: comment, user: req.user.username, time: time}}}, 
        function(err, topic) {
          res.redirect(`/topic/${id}`);
      });
      
    } else {
      res.redirect(`/topic/${id}`);
    }    
});

app.get('/register', (req, res) => {
  res.render("register", {message:""});
});

app.post('/register', (req, res) => {
  User.register(new User({username:req.body.username}), 
    req.body.password, function(err, user){
  if (err) {
    res.render('register',{message:'Your registration information is not valid'});
  } else {
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  }
}); 
});

app.get('/login', (req, res) => {
  res.render("login", {message:""});
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err,user) {
      if(user) {
        req.logIn(user, function(err) {
          res.redirect('/');
        });
      } else {
        res.render('login', {message:'Username does not exist or password does not match.'});
      }
    })(req, res, next);
});

app.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/');
});

app.get('/search', (req, res) => {
    const txt = req.query.txt;
    if(txt){
      Topic.find({$text: {$search: txt}}).limit(10).exec(function(err, docs){
        if(!err){
          res.render('search',{topic: docs, txt: txt});
        } else {
          res.redirect('/');
        }
      });
    } else {
      res.redirect('/');
    }
});

/* app.use((req, res) => {
  res.redirect('/');
}); */

module.exports = app.listen(process.env.PORT || 3000);
