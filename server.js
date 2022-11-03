const express = require('express');
const path = require('path');

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
})

app.get('/login' , (req, res) => {
    res.status(200).render('login');
})

app.get('/cart' , (req, res) => {
    res.status(200).render('cart');
})

app.get('/category1' , (req, res) => {
    res.status(200).render('category1');
})

app.get('/category2' , (req, res) => {
    res.status(200).render('category2');
})

app.get('/category3' , (req, res) => {
    res.status(200).render('category3');
})

app.get('/category4' , (req, res) => {
    res.status(200).render('category4');
})

// Server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
