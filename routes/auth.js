const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.get('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});


module.exports = router;