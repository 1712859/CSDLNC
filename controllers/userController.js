let controller = {};
const db = require('../models/index');
controller.loadUser = async(maKH) => {
    const review = await db.sequelize.query(`select * from KHACHHANG where MaKH = ${maKH}`, { type: db.Sequelize.QueryTypes.SELECT });
    return review[0]
}
controller.create_user = async(khachhang) => {
    const review = await db.sequelize.query(`insert into KHACHHANG  values (${khachhang.MaKH},'${khachhang.TenKH}','${khachhang.NgaySinh}','${khachhang.SDT}','${khachhang.Email}',${khachhang.GioiTinh},'',null)`, { type: db.Sequelize.QueryTypes.INSERT });
    return review;
}
controller.getMakh = async() => {
    const review = await db.sequelize.query(`select max(MaKH) as makh from KHACHHANG`, { type: db.Sequelize.QueryTypes.SELECT });
    return review
}
controller.getID = async() => {
    const review = await db.sequelize.query(`select max(ID) as ID from TAIKHOAN`, { type: db.Sequelize.QueryTypes.SELECT });
    return review
}
controller.create_TK = async(taikhoan) => {
    const review = await db.sequelize.query(`insert into TAIKHOAN  values (${taikhoan.id},'${taikhoan.email}','${taikhoan.pass}',${taikhoan.makh})`, { type: db.Sequelize.QueryTypes.INSERT });
    return review;
}

controller.checkemail = async(email) => {
    const review = await db.sequelize.query(`select *  from TAIKHOAN where TenDangNhap = '${email}'`, { type: db.Sequelize.QueryTypes.SELECT });
    return review
}
module.exports = controller;