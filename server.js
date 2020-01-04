const express = require('express')
const app = express()
const path = require('path')
const cookieparser = require('cookie-parser')
const connection = require('./config/connect')
const auth = require('./routes/middleware/auth')
//Opening connection
connection.connect((err) => {
    if (err) {
        throw err
    }

    console.log("Mysql connected")
});

// Body Parsers
app.use(express.urlencoded({ extended : false }))
app.use(express.json())
app.use(cookieparser())
app.set('views' , path.join( __dirname , './views'))
app.set('view engine' , 'hbs')
app.use(express.static(path.join(__dirname , './public')))


app.get('/' , auth.notAuth , (req,res) => {
    res.render('index')
})

app.use('/api' , require('./routes/api'))
app.use('/student' , require('./routes/student'))
app.use('/admin' , require('./routes/admin'))

app.listen(3000 , () => {
    console.log("Port estalbished at 3000")
})
