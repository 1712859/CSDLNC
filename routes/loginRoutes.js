let express = require('express');
let router = express.Router();

router.post('/', async(req, res, next) => {
    let name = req.body.Email;
    let pass = req.body.password;

    if (name == "anhtu@gmail.com" && pass == "123456") {
        req.session.user = "true"

        console.log("oke")
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