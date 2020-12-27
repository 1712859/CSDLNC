let express = require('express');
let router = express.Router();
let PaymentController = require('../controllers/PaymentController');
router.get('/', async(req, res, next) => {
    if(res.locals.KhachHang)
    {   
        let KH = res.locals.KhachHang;
        let card = await PaymentController.loadcard(KH.MaKH);

        res.render('payment',{card:card[0]});
    }
    else
    {
        res.render('index');
    }
    
});
router.post('/', async(req, res, next) => {
    if(res.locals.KhachHang)
    {   
        let KH = res.locals.KhachHang;
        let card = req.body.card;
        let numbercard = req.body.numbercard;
        let date = req.body.date;
        let loai = req.body.loai;
        let masp = await PaymentController.loadMaSP(KH.MaKH);
        let hoadon = await PaymentController.TaoHoaDon(KH.MaKH);
        let i = 0;
        while(masp[i] != null)
        {
            let CTHoaDon = await PaymentController.TaoCTHD(masp[i].MaSP,masp[i].SoLuong,hoadon[0].MaHD)
            i++;
        }
        let up = await PaymentController.updateLoai(KH.MaKH,loai,hoadon[0].MaHD);
        let xoa = await PaymentController.XoaGio(KH.MaKH);
        console.log(up);
        res.redirect('/')
    }

    else
    {
        res.redirect('/');
    }
    
});
module.exports = router;