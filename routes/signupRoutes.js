const e = require('express');
let express = require('express');
const controller = require('../controllers/userController');
let router = express.Router();
let userController = require('../controllers/userController')
router.get('/', async(req, res, next) => {
    res.render('signup')
});
router.post('/', async(req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let sdt = req.body.sdt;
    let cmnd = null;
    let gioi = req.body.gioi;
    let date = req.body.date;
    let pass = req.body.pass;
    let makh = await userController.getMakh();
    let id = await userController.getID();
    console.log(makh[0].makh)

    if (name == "") {
        res.render('signup', { message: "Bạn chưa nhập tên" })
        console.log('1')
    } else {
        if (email == "") {
            res.render('signup', { message: "Bạn chưa nhập Email" })
            console.log('2')
        } else {
            if (sdt == "") {
                res.render('signup', { message: "Bạn chưa nhập Sdt" })
                console.log('3')
            } else {
                if (cmnd == "") {
                    res.render('signup', { message: "Bạn chưa nhập CMND" })
                    console.log('4')
                } else {
                    if (gioi == "") {
                        res.render('signup', { message: "Bạn chưa nhập Giới" })
                        console.log('5')
                    } else {
                        if (date == "") {
                            res.render('signup', { message: "Bạn chưa nhập ngày sinh" })
                            console.log('6')
                        } else {
                            if (pass == "") {
                                res.render('signup', { message: "Bạn chưa nhập Mật Khẩu" })
                                console.log('7')
                            } else {
                                if (date == "") {
                                    res.render('signup', { message: "Bạn chưa nhập ngày sinh" })
                                    console.log('8')
                                } else {
                                    let GT = 1;
                                    if (gioi == 'female') GT = 0;
                                    let emailss = await userController.checkemail(email)
                                    console.log(emailss)
                                    if (emailss == null) {
                                        let khachhang = {
                                            MaKH: makh[0].makh + 1,
                                            TenKH: name,
                                            NgaySinh: date,
                                            SDT: sdt,
                                            Email: email,
                                            GioiTinh: GT,
                                            LoaiKh: '',
                                            CMND: null
                                        }
                                        let a = await userController.create_user(khachhang);
                                        let b = {
                                            id: id[0].ID + 1,
                                            email: email,
                                            pass: pass,
                                            makh: makh[0].makh + 1
                                        }
                                        let c = await userController.create_TK(b);

                                        res.redirect('/')
                                    } else {
                                        res.render('signup', { message: "Email đã tồn tại" })
                                    }

                                }

                            }
                        }
                    }
                }
            }
        }
    }
});

module.exports = router;