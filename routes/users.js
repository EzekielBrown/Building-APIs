const { Router } = require('express');
const db = require('../database');
const { check, validationResult } = require('express-validator');

const router = Router();

router.use((req, res, next) => {
    console.log('Request made to user route');
    next();
});

router.get('/', async (req, res) => {
    if (req.user) {
        console.log(req.user);
        const results = await db.promise().query('SELECT * FROM users');
        res.status(200).send(results[0]);
    } else {
        res.status(401).send('Not logged in');
    }
});

router.get('/posts', (req, res) => {
    res.json({
        route: 'Posts'
    })
});

//sign up
router.post('/', [
    check('username').notEmpty().withMessage('Username is required').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    if (username && password) {
        try{
            db.promise().query(`INSERT INTO users VALUES ('${username}', '${password}')`);
            res.status(201).send({ message: 'User created' });
        } catch (err) {
            console.log(err);
        }
    }
})

module.exports = router;