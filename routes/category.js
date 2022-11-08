const { Router } = require('express');
const db = require('../database');

const router = Router();

router.use((req, res, next) => {
    console.log('Request made to category route');
    next();
});

router.get('/', async (req, res) => {
    const results = await db.promise().query('SELECT * FROM categories');
    res.status(200).send(results[0]);
});

router.post('/add', (req, res) => {
    const { name } = req.body;
    if (name) {
        try{
            db.promise().query(`INSERT INTO categories VALUES ('${name}')`);
            res.status(201).send({ message: 'Category created' });
        } catch (err) {
            console.log(err);
        }
    }
});

router.delete('/delete', (req, res) => {
    const { name } = req.body;
    if (name) {
        try{
            db.promise().query(`DELETE FROM categories WHERE name = '${name}'`);
            res.status(201).send({ message: 'Category deleted' });
        } catch (err) {
            console.log(err);
        }
    }
});

router.put('/update', (req, res) => {
    const { name, newName } = req.body;
    if (name && newName) {
        try{
            db.promise().query(`UPDATE categories SET name = '${newName}' WHERE name = '${name}'`);
            res.status(201).send({ message: 'Category updated' });
        }
        catch (err) {
            console.log(err);
        }
    }
});

router.get('/search', async (req, res) => {
    const { name } = req.body;
    if (name) {
        try{
            const results = await db.promise().query(`SELECT * FROM categories WHERE name = '${name}'`);
            res.status(200).send(results[0]);
        }
        catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;