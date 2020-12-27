let express = require('express');
let router = express.Router();
let userController = require('../controllers/loginController');


router.get('/', async(req, res, next) => {

    res.render('index')
});


module.exports = router;