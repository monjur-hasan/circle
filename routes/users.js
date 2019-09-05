/* const express = require('express'), 
router = express.Router(),
passport = require('passport'),
mongoose = require('mongoose'),
User = mongoose.model('User');

router.get('/register', (req, res) => {
  res.render('register', {message:""});
});

router.post('/register', (req, res) => {
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
      
router.get('/login', (req, res) => {
  res.render('login', {message:""});
});

router.post('/login', (req, res, next) => {
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

router.get('/logout', (req,res) => {
      req.logout();
      res.redirect('/');
});

module.exports = router; */