let controller = {};
const db = require('../models/index');

controller.getDM = async() => {
    const review = await db.sequelize.query(`select * from DANHMUC as dm where DanhMucCha>0`, { type: db.Sequelize.QueryTypes.SELECT });
    return review
}
controller.getMaSp = async() => {
    const review = await db.sequelize.query(`select max(MaSP) as masp from SANPHAM `, { type: db.Sequelize.QueryTypes.SELECT });
    return review
}
controller.createSP = async(sanpham) => {
    const review = await db.sequelize.query(`insert into SANPHAM values (${sanpham.masp},'${sanpham.ten}','${sanpham.mota}',getdate(),${sanpham.soluong},${sanpham.danhmuc},${sanpham.makh})`, { type: db.Sequelize.QueryTypes.INSERT });
    return review
}
controller.createLSGia = async(gia) => {
    const review = await db.sequelize.query(`insert into LICHSUGIA values (${gia.masp},getdate(),${gia.gias})`, { type: db.Sequelize.QueryTypes.INSERT });
    return review
}

module.exports = controller;