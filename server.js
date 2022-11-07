if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')


const initializePassport = require('./passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )

const app = express();
const port = process.env.PORT || "3000";

const users = []

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Middleware

app.use(express.static(path.join(__dirname, './views')));
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


// Routes

app.get('/', checkNotAuthenticated, (req, res) => {
    res.render('index', { name: req.user.username });
});

app.get('/login' , checkNotAuthenticated, (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        username: req.body.username,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
    console.log(users);
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


app.get('/cart', checkNotAuthenticated, (req, res) => {
    res.render('cart');
});

app.get('/category1',checkNotAuthenticated, (req, res) => {
    res.render('category1');
});

app.get('/category2' ,checkNotAuthenticated, (req, res) => {
    res.render('category2');
});

app.get('/category3' ,checkNotAuthenticated, (req, res) => {
    res.render('category3');
});

app.get('/category4' ,checkNotAuthenticated,(req, res) => {
    res.render('category4');
});

// Server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
