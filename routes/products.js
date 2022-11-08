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


router.post('/add', (req, res) => {
    const { name,  description, price, category} = req.body;
    if (name && description && price && category) {
        try{
            db.promise().query(`INSERT INTO products VALUES ('${name}', '${description}', '${price}', '${category}')`);
            res.status(201).send({ message: 'Product created' });
        } catch (err) {
            console.log(err);
        }
    }
})

router.delete('/delete', (req, res) => {
    const { name } = req.body;
    if (name) {
        try{
            db.promise().query(`DELETE FROM products WHERE name = '${name}'`);
            res.status(201).send({ message: 'Product deleted' });
        } catch (err) {
            console.log(err);
        }
    }
})

router.put('/update', (req, res) => {
    const { name, price, description, category} = req.body;
    if (name && price && description && category) {
        try{
            db.promise().query(`UPDATE products SET price = '${price}', description = '${description}', category = '${category}' WHERE name = '${name}'`);
            res.status(201).send({ message: 'Product updated' });
        }
        catch (err) {
            console.log(err);
        }
    }
})

router.get('/search', async (req, res) => {
    const { name } = req.body;
    if (name) {
        try{
            const results = await db.promise().query(`SELECT * FROM products WHERE name = '${name}'`);
            res.status(200).send(results[0]);
        }
        catch (err) {
            console.log(err);
        }
    }
})



module.exports = router;