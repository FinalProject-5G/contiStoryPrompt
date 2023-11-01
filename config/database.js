// 내가 연결할 DB에 대한 정보ss
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'nodejs'
});
conn.connect();

module.exports = conn;