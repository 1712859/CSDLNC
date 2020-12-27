let express = require('express');
let router = express.Router();

router.get('/', async(req, res, next) => {

    res.render('user')
});

module.exports = router;