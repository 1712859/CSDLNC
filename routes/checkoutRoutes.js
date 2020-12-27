let express = require('express');
let router = express.Router();
let CheckoutController = require('../controllers/CheckoutController');
router.get('/', async(req, res, next) => {
    if(res.locals.KhachHang)
    {   
        let KH = res.locals.KhachHang;
        let cart = await CheckoutController.loadcart(KH.MaKH);
       
        let Tien = await CheckoutController.TinhTien(KH.MaKH);
        res.render('checkout',{cart:cart,Tien:Tien});
    }
    else
    {
        res.redirect('/');
    }
});

module.exports = router;