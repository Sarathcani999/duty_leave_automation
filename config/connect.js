/*
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dutyleave', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected")
}).catch((err) => {
    console.log("Connection failed")
})
*/

const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodemysql'
});

module.exports = connection