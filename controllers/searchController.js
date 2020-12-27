const controller = {};
const { MAX } = require("mssql");
const db = require("../models/index");

controller.handleSearchWithName = async (name) => {
  const result = await db.sequelize.query(
    `SELECT * FROM SANPHAM SP JOIN LICHSUGIA LSG ON SP.MaSP=LSG.MaSP WHERE SP.TenSP LIKE N'${name}%'`,
    { type: db.Sequelize.QueryTypes.SELECT }
  );
  return result;
};

controller.handleSearchWithPrice = async (min, max) => {
  const result = await db.sequelize.query(
    `
SELECT * FROM SANPHAM SP 
WHERE SP.MaSP = ANY(SELECT LSG.MaSP FROM LICHSUGIA LSG 
    WHERE LSG.Gia BETWEEN ${Number(min)} AND ${Number(max)});`,
    { type: db.Sequelize.QueryTypes.SELECT }
  );
  return result;
};

controller.handleSearchWithType = async (type) => {
  const result = await db.sequelize.query(
    `
SELECT * FROM SANPHAM SP 
WHERE SP.MaDanhMuc = 
ANY(SELECT DM.MaDanhMuc FROM DANHMUC DM 
WHERE TenDanhMuc LIKE N'${type}%');`,
    { type: db.Sequelize.QueryTypes.SELECT }
  );
  return result;
};

module.exports = controller;
