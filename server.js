const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const store = new session.MemoryStore();

const app = express();
const port = process.env.PORT || "3000";

const users = [
    { name: "Kevin", age: 25 },
    { name: "John", age: 30 },
    { name: "Jane", age: 20 }
];

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

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log(store)
    next();
});

app.use(express.static(path.join(__dirname, './views')));
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:name', (req, res) => {
    const { name } = req.params;
    const user = users.find(user => user.name === name);
    if (user) res.status(200).send(user);
    else res.status(404).send('User not found');
});

app.get('/', (req, res) => {
    res.status(200).render('index', { users });
});

app.get('/login' , (req, res) => {
    res.status(200).render('login');
});

app.get('/cart' , (req, res) => {
    res.status(200).render('cart');
});

app.get('/category1' , (req, res) => {
    res.status(200).render('category1');
});

app.get('/category2' , (req, res) => {
    res.status(200).render('category2');
});

app.get('/category3' , (req, res) => {
    res.status(200).render('category3');
});

app.get('/category4' , (req, res) => {
    res.status(200).render('category4');
});

function validateCookie(req, res, next) {
    const { cookies } = req;
    if ("session_id" in cookies) {
        console.log("session_id found");
        if (cookies.session_id === "123456") {
            next();
        } else {
            res.status(401).send("Unauthorized");
        }
    }
    next()
}

app.get('/signin', (req, res) => {
    res.cookie('session_id', '123456');
    res.status(200).json({ message: 'Logged in' });
});

app.post('/logon', (req, res) => {
    console.log(req.sessionID);
    const { username, password } = req.body;
    if (username && password) {
        if(req.session.authenticated) {
            res.json(req.session);
        } else {
            if (password === '123') {
                req.session.authenticated = true;
                req.session.user = { 
                    username, password
                };
                res.json(req.session);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } 
    }else {
        res.status(400).json({ message: 'Invalid request' });
}});

// Server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
