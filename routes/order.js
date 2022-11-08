const { Router } = require('express');
const db = require('../database');

const router = Router();

router.use((req, res, next) => {
    console.log('Request made to order route');
    next();
});

router.get('/', async (req, res) => {
    const results = await db.promise().query('SELECT * FROM orders');
    res.status(200).send(results[0]);
});

router.post('/add', (req, res) => {
    const { username, product, quantity } = req.body;
    if (username && product && quantity) {
        try{
            db.promise().query(`INSERT INTO orders VALUES ('${username}', '${product}', '${quantity}')`);
            res.status(201).send({ message: 'Order created' });
        } catch (err) {
            console.log(err);
        }
    }
});

router.delete('/delete', (req, res) => {
    const { username, product } = req.body;
    if (username && product) {
        try{
            db.promise().query(`DELETE FROM orders WHERE username = '${username}' AND product = '${product}'`);
            res.status(201).send({ message: 'Order deleted' });
        } catch (err) {
            console.log(err);
        }
    }
});

router.put('/update', (req, res) => {
    const { username, product, quantity } = req.body;
    if (username && product && quantity) {
        try{
            db.promise().query(`UPDATE orders SET quantity = '${quantity}' WHERE username = '${username}' AND product = '${product}'`);
            res.status(201).send({ message: 'Order updated' });
        }
        catch (err) {
            console.log(err);
        }
    }
});

router.get('/search', async (req, res) => {
    const { username } = req.body;
    if (username) {
        try{
            const results = await db.promise().query(`SELECT * FROM orders WHERE username = '${username}'`);
            res.status(200).send(results[0]);
        }
        catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;