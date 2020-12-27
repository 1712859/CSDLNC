let express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController');
let userController = require('../controllers/userController');
router.post('/', async(req, res, next) => {
    let name = req.body.Email;
    let pass = req.body.password;
    var user = await loginController.login(name, pass);

    if (name == user.TenDangNhap && pass == user.MatKhau) {
        req.session.user = user;
        var khachhang = await userController.loadUser(user.MaKH);
        console.log(khachhang)
        req.session.khachhang = khachhang;
        res.redirect('/')
    } else {
        res.redirect('/')
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }
        return res.redirect('/login');
    });
});


module.exports = router;