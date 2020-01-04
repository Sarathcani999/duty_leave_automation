const connection = require('../config/connect') // Connect Database
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')

router.get('/', auth.notAuth, (req, res) => {
    res.render('adminlogin')
})

router.post('/logout', (req, res) => {
    res.clearCookie('_auth')
    res.redirect('/admin/')
})

router.post('/login', (req, res) => {
    let sql = "SELECT * FROM users WHERE usertype = 0 AND id = '" + req.body.username + "' AND pass = '" + req.body.password + "'"
    connection.query(sql, async (error, results, fields) => {
        if (error) {
            res.redirect('/admin/')
        }
        if (results.length == 1) {
            const token = await jwt.sign(results[0].id, 'secret')
            res.cookie('_auth', token)
            res.redirect('/admin/home')

        } else {
            res.redirect('/admin/')
        }
    })
})

router.get('/home', auth.authAdmin, (req, res) => {
    res.render("adminhome")
})


router.get('/addStaff', auth.authAdmin, (req, res) => {
    res.render('adminaddstaff')
})

router.post('/addstaff', auth.authAdmin, (req, res) => {
    let type = 2
    if (req.body.id && req.body.name && req.body.password && req.body.dept) {
        let insertUser = "INSERT INTO users VALUES('" + req.body.id + "' , '" + req.body.password + "' , '" + type + "')"
        connection.query(insertUser, (error1, results1, fields1) => {
            if (error1) {
                console.log("ERROR INSERTING USER")
                res.redirect('/admin/addStaff')
            } else {
                // check for student or teacher
                if (type == 1) {          // Student
                    let insertStudent = "INSERT INTO student VALUES('" + req.body.id + "' , '" + req.body.name + "' , '" + req.body.dept + "' ," + req.body.sem + " )"
                    connection.query(insertStudent, (error2, results2, fields2) => {
                        if (error2) {
                            console.log("ERROR INSERING STUDENT")
                            res.redirect('/admin/addStudent')
                        } else {
                            res.redirect('/admin')
                        }

                    })
                } else {                              // Teacher
                    let insertStaff = "INSERT INTO staff VALUES('" + req.body.id + "' , '" + req.body.name + "' , '" + req.body.dept + "')"
                    connection.query(insertStaff, (error2, results2, fields2) => {
                        if (error2) {
                            console.log("ERROR INSERING STAFF")
                            res.redirect('/admin/addStaff')
                        } else {
                            res.redirect('/admin')
                        }
                    })
                }
            }
        })
    } else {
        res.redirect('/admin/addStaff')
    }
})

router.get('/addStudent', auth.authAdmin, (req, res) => {
    res.render('adminaddstudent')
})

router.post('/addstudent', auth.authAdmin, (req, res) => {
    let type = 1
    if (req.body.id && req.body.name && req.body.password && req.body.dept && req.body.sem) {
        let insertUser = "INSERT INTO users VALUES('" + req.body.id + "' , '" + req.body.password + "' , '" + type + "')"
        connection.query(insertUser, (error1, results1, fields1) => {
            if (error1) {
                console.log("ERROR INSERTING USER")
                res.redirect('/admin/addStaff')
            } else {
                // check for student or teacher
                if (type == 1) {          // Student
                    let insertStudent = "INSERT INTO student VALUES('" + req.body.id + "' , '" + req.body.name + "' , '" + req.body.dept + "' ," + req.body.sem + " )"
                    connection.query(insertStudent, (error2, results2, fields2) => {
                        if (error2) {
                            console.log("ERROR INSERING STUDENT")
                            res.redirect('/admin/addStudent')
                        } else {
                            res.redirect('/admin')
                        }

                    })
                } else {                              // Teacher
                    let insertStaff = "INSERT INTO staff VALUES('" + req.body.id + "' , '" + req.body.name + "' , '" + req.body.dept + "')"
                    connection.query(insertStaff, (error2, results2, fields2) => {
                        if (error2) {
                            console.log("ERROR INSERING STAFF")
                            res.redirect('/admin/addStaff')
                        } else {
                            res.redirect('/admin')
                        }
                    })
                }
            }
        })
    } else {
        res.redirect('/admin/addStudent')
    }
})

router.get('/modifyhod', auth.authAdmin, (req, res) => {
    res.render('adminaddhod')
})

router.post('/modifyhod', auth.authAdmin, (req, res) => {
    let initial = "SELECT * FROM advisor WHERE advisor.s_id = '" + req.body.hod + "'"
    connection.query(initial, (error, results, fields) => {
        if (error) {
            res.send({
                msg: "SQL Error"
            })
        }
        if (results.length == 0) {
            let sql = "UPDATE dept_hod set hod_id = '" + req.body.hod + "' where dept = '" + req.body.id + "'"
            console.log(sql)
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    res.redirect('/admin/modifyhod')
                } else {
                    res.redirect('/admin')
                }
            })
        } else {
            res.redirect('/admin/home')
        }
    })

})

// router.post('/modifyhod', auth.authAdmin, (req, res) => {

//     let sql = "UPDATE dept_hod set hod_id = '" + req.body.hod + "' where dept = '" + req.body.id + "'"
//     console.log(sql)
//     connection.query(sql, (error, results, fields) => {
//         if (error) {
//             res.redirect('/admin/modifyhod')
//         } else {
//             res.redirect('/admin')
//         }
//     })
// })

router.post('/modifyhod', auth.authAdmin, (req, res) => {
    if (req.body.id && req.body.hod) {
        let sql = "INSERT INTO dept_hod(hod_id) VALUES('" + req.body.hod + "') WHERE dept = '" + req.body.id + "'"
        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.send("Error linking HoD to Department")
            } else {
                res.redirect("/admin/home")
            }
        })
    } else {
        res.redirect("/admin/modifyhod")
    }
})

router.get('/addcourse', auth.authAdmin, (req, res) => {
    res.render('adminaddcourse')
})

router.post('/addCourse', auth.authAdmin, (req, res) => {
    if (req.body.id && req.body.name) {
        let sql = "INSERT INTO courses VALUES('" + req.body.id + "' , '" + req.body.name + "')"

        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.redirect("/admin/addcourse")
            } else {
                res.redirect("/admin/home")
            }
        })
    } else {
        console.log(req.body)
        res.send("Please fill all fields")
    }
})

router.get('/addstaffadvisor', auth.authAdmin, (req, res) => {
    res.render('adminaddstaffadvisor')
})

router.post('/addstaffadvisor', auth.authAdmin, (req, res) => {
    if (req.body.id && req.body.dept && req.body.semester) {
        let initial = "SELECT * FROM dept_hod WHERE hod_id = '" + req.body.id + "'"
        connection.query(initial, (error, results, fields) => {
            if (error) {
                res.send({
                    msg: "SQL Error"
                })
            }
            if (results.length == 0) {
                let sql = "INSERT INTO advisor(s_id , dept,semester ) VALUES ('" + req.body.id + "' , '" + req.body.dept + "' ," + req.body.semester + ")"
                connection.query(sql, (error, results, fields) => {
                    if (error) {
                        res.redirect('/admin/addstaffadvisor')
                    } else {
                        res.redirect('/admin/')
                    }
                })
            } else {
                res.redirect('/admin/addStaffadvisor')
            }
        })


    } else {
        res.send("Fill all parameters")
    }
})

router.get('/linkcourseclassstaff', auth.authAdmin, (req, res) => {
    res.render('adminlinkcourseclassstaff')
})

router.post('/linkcourseclassstaff', auth.authAdmin, (req, res) => {
    if (req.body.c_id && req.body.dept && req.body.semester && req.body.s_id) {
        let initial = "SELECT * FROM dept_sem_course WHERE c_id = '" + req.body.c_id + "' AND dept = '" + req.body.dept + "' AND semester = '" + req.body.semester + "'"
        connection.query(initial, (error, results, fields) => {
            if (error) {
                res.send({
                    msg: "SQL Error"
                })
            }
            if (results.length == 0) {
                let sql = "INSERT INTO dept_sem_course (c_id , dept , semester , s_id) VALUES('" + req.body.c_id + "' , '" + req.body.dept + "' , " + req.body.semester + " , '" + req.body.s_id + "')"
                connection.query(sql, (error, results, fields) => {
                    if (error) {
                        res.redirect('/linkcourseclassstaff')
                    } else {
                        res.redirect('/admin/')
                    }
                })

            } else {
                let sql = "UPDATE dept_sem_course SET s_id = '"+req.body.s_id+"' WHERE dept = '"+req.body.dept+"' AND semester = '"+req.body.semester+"' AND c_id = '"+ req.body.c_id +"'"
                // console.log(sql)
                connection.query(sql , (error,results , fields) => {
                    if (error) {
                        res.send({
                            msg : "SQL Error"
                        })
                    }
                })
                res.redirect('/admin/home')
            }
        })

    } else {
        res.send("Fill all parameters")
    }
})

router.get('/*', (req, res) => {
    res.send("<h1>Error!</h1>")
})

module.exports = router