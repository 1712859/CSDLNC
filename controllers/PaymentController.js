let controller = {};
const db = require('../models/index');

controller.loadcard = async(MaKH) =>{
    const review = await db.sequelize.query(`select MaThe,TenNguoiDung,NgayHetHan
    from THONGTINTHETHANHTOAN
    where MaKH = ${MaKH}`, { type: db.Sequelize.QueryTypes.SELECT });
    return review;
}
controller.loadMaSP = async(MaKH) =>{
    const load = await db.sequelize.query(`select MaSP,SoLuong from GIOHANG where MaKH = ${MaKH}`,{ type: db.Sequelize.QueryTypes.SELECT });
    return load;
}
controller.TaoHoaDon = async(MaKH) =>{
    const mahd = await db.sequelize.query(`select (Max(Mahoadon) + 1) as MaHD from HOADON`, { type: db.Sequelize.QueryTypes.SELECT });
    const add = await db.sequelize.query(`insert HOADON(MaHoaDon,NgayTao,Tongtien,LoaiThanhToan,MaKH,MaKM,FlagTT) 
    values (${mahd[0].MaHD} ,(SELECT CONVERT(VARCHAR(8), GETDATE(), 1) AS [MM/DD/YY]),0,0,${MaKH},NULL,0)`, { type: db.Sequelize.QueryTypes.INSERT });
    return mahd;
   
}
controller.TaoCTHD = async(MaSP,SoLuong,MaHD) =>{
    const add = await db.sequelize.query(`insert CT_HOADON(MaHoaDon,MaSP,SoLuong,MaKM) values (${MaHD},${MaSP},${SoLuong},NULL)`,{ type: db.Sequelize.QueryTypes.UPDATE });
    return add;
}
controller.updateLoai = async(MaKH,loai,mahd) =>{
    const up = await db.sequelize.query(`update HOADON set LoaiThanhToan = N'${loai}' where MaKH = ${MaKH} and MaHoaDon = ${mahd}  `, { type: db.Sequelize.QueryTypes.UPDATE});
    return up;
}
controller.XoaGio = async(MaKH) =>{
    const xoa = await db.sequelize.query(`delete from GIOHANG where MaKH = ${MaKH}`, { type: db.Sequelize.QueryTypes.DELETE });
    return xoa;
}
module.exports = controller;