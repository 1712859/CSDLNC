let controller = {};
const db = require('../models/index');
controller.login = async(user, pass) => {
    const review = await db.sequelize.query(`select * from TAIKHOAN where TenDangNhap = '${user}' and MatKhau = '${pass}'`, { type: db.Sequelize.QueryTypes.SELECT });
    return review[0]
}
module.exports = controller;