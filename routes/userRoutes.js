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
router.post('/sell/sp/:id', async(req, res, next) => {
    if (res.locals.KhachHang) {
        const user = res.locals.KhachHang
        let ten = req.body.tensp;
        let mota = req.body.mota;
        let gia = req.body.gia;
        let danhmuc = req.body.danhmuc;
        let soluong = req.body.soluong;

        if (user.MaKH == req.params.id) {
            let masp = await sanphamController.getMaSp();
            let sanpham = {
                masp: masp[0].masp + 1,
                ten: ten,
                mota: mota,
                danhmuc: danhmuc,
                soluong: soluong,
                makh: user.MaKH
            }
            let giass = {
                masp: masp[0].masp + 1,
                gias: gia
            }
            let a = await sanphamController.createSP(sanpham);
            let b = await sanphamController.createLSGia(giass);
            console.log(masp[0].masp + 1)
            res.redirect('/user/sell/' + user.MaKH)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }

});





module.exports = router;