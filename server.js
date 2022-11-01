const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, './view')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './view/index.html'));
    });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './view/category1.html'));
    })

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    });

