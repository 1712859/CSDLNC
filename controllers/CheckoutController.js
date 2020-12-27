let controller = {};
const db = require('../models/index');
controller.loadcart = async(MaKH) =>{
    const review = await db.sequelize.query(`select sp.MaSP, sp.TenSP, gh.SoLuong, lsg.Gia
    from   GIOHANG gh,SANPHAM sp, LICHSUGIA lsg
    where gh.MaKH = ${MaKH} and gh.MaSP = sp.MaSP and sp.MaSP = lsg.MaSP 
    and  lsg.NgayCapNhat >= all (select NgayCapNhat from LICHSUGIA where MaSP = lsg.MaSP )`, { type: db.Sequelize.QueryTypes.SELECT });
    return review;
}

controller.TinhTien = async(MaKH) =>{
    const view = await db.sequelize.query(`select sum(gh.SoLuong*lsg.Gia) AS TongTien
    from   GIOHANG gh,SANPHAM sp, LICHSUGIA lsg
    where gh.MaKH = ${MaKH} and gh.MaSP = sp.MaSP and sp.MaSP = lsg.MaSP 
    and  lsg.NgayCapNhat >= all (select NgayCapNhat from LICHSUGIA where MaSP = lsg.MaSP )`, { type: db.Sequelize.QueryTypes.SELECT });
    return view;
}


module.exports = controller;