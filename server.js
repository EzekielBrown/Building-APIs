const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const local = require('./strategies/local');

const authRouter = require('./routes/auth');
const usersRoute = require('./routes/users');

const store = new session.MemoryStore();
const app = express();
const port = process.env.PORT || "3000";

// Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Middleware
app.use(session({
    secret: 'some secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    store
}))


app.use(express.static(path.join(__dirname, './views')));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRoute);
app.use('/auth', authRouter);


// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login' , (req, res) => {
    res.render('login');
});

app.get('/register' , (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword =  await bcrypt.hashSync(password, 10);
        const user = { username, password: hashedPassword };
        users.push(user);
        res.redirect('/login');
    }
    catch (err) {
        console.log(err);
    }
})

app.post('/login', (req, res) => {
})

app.get('/cart' , (req, res) => {
    res.render('cart');
});

app.get('/category1' , (req, res) => {
    res.render('category1');
});

app.get('/category2' , (req, res) => {
    res.render('category2');
});

app.get('/category3' , (req, res) => {
    res.render('category3');
});

app.get('/category4' , (req, res) => {
    res.render('category4');
});

// Server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
