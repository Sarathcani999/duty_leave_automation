const connection = require('../../config/connect')
const jwt = require('jsonwebtoken')

const authStaff = async (req, res, next) => {
    try {
        const token = req.cookies._auth
        const decoded = await jwt.verify(token, 'secret')
        let sql = "SELECT * FROM staff WHERE id = '" + decoded + "'"
        connection.query(sql, (error, results, fields) => {
            if (results.length == 1) {
                req.user = results[0]
                next()
            } else {

                res.redirect('/api/loginstaff')
            }

        })

    } catch (e) {
        res.redirect('/api/loginstaff')
    }
}


const notAuth = async (req, res, next) => {
    try {
        const token = req.cookies._auth
        const decoded = await jwt.verify(token, 'secret')
        let sql = "SELECT * FROM users WHERE id = '" + decoded + "'"
        connection.query(sql, (error, results, fields) => {
            if (results.length == 1) {
                req.user = results[0]
                console.log(results)
                if(results[0].usertype == 1){
                    res.redirect('/student/home')
                } else if (results[0].usertype == 2){
                    res.redirect('/api/staffhome')
                } else if (results[0].usertype == 0){
                    res.redirect('/admin/home')
                }
            } else {

                next()
            }

        })

    } catch (e) {
        next()
    }
}

const authStudent = async (req,res,next) => {
    try {
        const token = req.cookies._auth
        const decoded = await jwt.verify(token, 'secret')
        let sql = "SELECT * FROM student WHERE id = '" + decoded + "'"
        connection.query(sql, (error, results, fields) => {
            if (results.length == 1) {
                req.user = results[0]
                next()
            } else {

                res.redirect('/student/login')
            }

        })

    } catch (e) {
        res.redirect('/student/login')
    }
}

const authAdmin = async (req,res,next) => {
    try {
        const token = req.cookies._auth
        const decoded = await jwt.verify(token, 'secret')
        let sql = "SELECT * FROM users WHERE id = '" + decoded + "' AND usertype = 0"
        connection.query(sql, (error, results, fields) => {
            if (results.length == 1) {
                req.user = results[0].id
                next()
            } else {

                res.redirect('/admin/')
            }

        })

    } catch (e) {
        res.redirect('/admin/')
    }   
}

module.exports = { authStaff, notAuth , authStudent , authAdmin }