let express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController');
let userController = require('../controllers/userController');
router.post('/', async(req, res, next) => {
    let name = req.body.Email;
    let pass = req.body.password;
    var user = await loginController.login(name, pass);
    if (user == null) {
        res.render('index', {
            message: 'Tài khoản không tồn tại'
        })

    } else
    if (name == user.TenDangNhap && pass == user.MatKhau) {
        req.session.user = user;
        var khachhang = await userController.loadUser(user.MaKH);
        if (khachhang.GioiTinh == true) {
            khachhang.gioi = "nữ"
        } else {
            khachhang.gioi = "Nam"
        }
        req.session.khachhang = khachhang;

        console.log(khachhang.MaKH);
        res.redirect('/')
    } else {

        res.render('index', {
            message: 'Bạn nhập Sai Mật Khẩu Hoặc Tên Đăng Nhập'
        })
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }
        return res.redirect('/');
    });
});


module.exports = router;