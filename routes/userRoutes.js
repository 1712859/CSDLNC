let express = require('express');
let router = express.Router();
let userCOntroller = require('../controllers/userController')
router.get('/:id', async(req, res, next) => {
    if (res.locals.KhachHang) {
        const user = res.locals.KhachHang
        console.log(res.locals.KhachHang)
        console.log(req.params.id)
        if (user.MaKH == req.params.id) {
            res.render('user')
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }


});
router.get('/sell/:id', async(req, res, next) => {
    if (res.locals.KhachHang) {
        const user = res.locals.KhachHang
        console.log(res.locals.KhachHang)
        console.log(req.params.id)
        if (user.MaKH == req.params.id) {
            res.render('user_sell')
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }


});





module.exports = router;