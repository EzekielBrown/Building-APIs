const { Router } = require('express');
const db = require('../database');

const router = Router();

router.use((req, res, next) => {
    console.log('Request made to product route');
    next();
});

router.get('/', async (req, res) => {
    const results = await db.promise().query('SELECT * FROM products');
    res.status(200).send(results[0]);
});

moudle.exports = router;