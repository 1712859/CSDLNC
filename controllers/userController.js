let controller = {};
const db = require('../models/index');
controller.loadUser = async(maKH) => {
    const review = await db.sequelize.query(`select * from KHACHHANG where MaKH = ${maKH}`, { type: db.Sequelize.QueryTypes.SELECT });
    return review[0]
}
module.exports = controller;