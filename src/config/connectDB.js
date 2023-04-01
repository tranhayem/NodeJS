const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => { // sử dụng async để thông báo đây là hàm bất đồng bộ, phải chờ thời gian chạy để trả kết quả

    try {
        await sequelize.authenticate();
        console.log('Kết nối cơ sở dữ liệu thành công!');
    } catch (error) {
        console.error('Không thể kết nối với cơ sở dữ liệu:', error);
    }
}

module.exports = connectDB;