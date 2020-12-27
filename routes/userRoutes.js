let express = require('express');
let router = express.Router();
let userCOntroller = require('../controllers/userController')
let sanphamController = require('../controllers/sanphamController')
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
            let dm = await sanphamController.getDM()
            res.render('user_sell', { doanhmuc: dm })
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }


});
router.post('/sell/:id', async(req, res, next) => {


});





module.exports = router;