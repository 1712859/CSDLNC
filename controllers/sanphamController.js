let controller = {};
const db = require('../models/index');

controller.getDM = async() => {
    const review = await db.sequelize.query(`select * from DANHMUC as dm where DanhMucCha>0`, { type: db.Sequelize.QueryTypes.SELECT });
    return review
}

module.exports = controller;