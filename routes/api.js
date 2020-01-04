const connection = require('../config/connect') // Connect Database
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')



// Admin Function

// adding department - working
router.post('/addDept', (req, res) => {
    let sql = "insert into department (d_code , name) values('" + req.body.code + "' , '" + req.body.name + "')"

    connection.query(sql, (error, results, fields) => {
        console.log("Result \n" + results)
        res.send("Query successful")
    })

})
// display department - working
router.get('/displaydept', (req, res) => {            // login authntication for admin
    let sql = "SELECT * FROM department WHERE d_code = 'CS'"
    connection.query(sql, (error, results, fields) => {
        res.send(results)
    })
})
// Linking HoD and department - working
router.post('/modifyhod', (req, res) => {
    if (req.body.id && req.body.hod) {

        let initial = "SELECT * FROM staff WHERE id = '" + req.body.hod + "' AND dept = '" + req.body.id + "'"
        connection.query(initial, (error1, results1, fields1) => {
            if (results1.length == 1) {
                let sql = "INSERT INTO dept_hod VALUES('" + req.body.id + "' , '" + req.body.hod + "')"
                connection.query(sql, (error, results, fields) => {
                    if (error) {
                        res.send("Error linking HoD to Department")
                    } else {
                        res.send("HoD Linked to Department")
                    }
                })
            } else {
                res.send("No entry in Staff found")
            }
        })


    } else {
        res.send("Please fill all fields")
    }
})
// Adding a User - working
router.post('/addUser', (req, res) => {
    if (req.body.id && req.body.name && req.body.password && req.body.dept && req.body.usertype) {
        let insertUser = "INSERT INTO users VALUES('" + req.body.id + "' , '" + req.body.password + "' , '" + req.body.usertype + "')"
        connection.query(insertUser, (error1, results1, fields1) => {
            if (error1) {
                console.log("ERROR INSERTING USER")
                res.send("Try another value")
            } else {
                // check for student or teacher
                if (req.body.usertype == 1) {          // Student
                    let insertStudent = "INSERT INTO student VALUES('" + req.body.id + "' , '" + req.body.name + "' , '" + req.body.dept + "' ," + req.body.sem + " )"
                    connection.query(insertStudent, (error2, results2, fields2) => {
                        if (error2) {
                            console.log("ERROR INSERING STUDENT")
                            res.send("Try another value")
                        } else {
                            res.send("Successfully added a Student")
                        }

                    })
                } else {                              // Teacher
                    let insertStaff = "INSERT INTO staff VALUES('" + req.body.id + "' , '" + req.body.name + "' , '" + req.body.dept + "')"
                    connection.query(insertStaff, (error2, results2, fields2) => {
                        if (error2) {
                            console.log("ERROR INSERING STAFF")
                            res.send("Try another value")
                        } else {
                            res.send("Successfully added a Teacher")
                        }
                    })
                }
            }
        })
    } else {
        res.send("Please fill all fields")
    }
})
// Adding a course - working
router.post('/addCourse', (req, res) => {
    if (req.body.id && req.body.name) {
        let sql = "INSERT INTO courses VALUES('" + req.body.id + "' , '" + req.body.name + "')"

        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.send("SQL Error")
            } else {
                res.send("Record inserted successfully")
            }
        })
    } else {
        console.log(req.body)
        res.send("Please fill all fields")
    }
})

// Add/Link staff advisor - working
router.post('/addAdvisor', (req, res) => {
    if (req.body.id && req.body.dept && req.body.semester) {
        let initial = "SELECT * FROM staff WHERE id = '" + req.body.id + "'"
        connection.query(initial, (error1, results1, fields1) => {
            if (results1.length == 1) {
                let sql = "INSERT INTO advisor VALUES ('" + req.body.id + "' , '" + req.body.dept + "' ," + req.body.semester + ")"
                connection.query(sql, (error, results, fields) => {
                    if (error) {
                        res.send("Error adding record")
                    } else {
                        res.send("Staff advisor set")
                    }
                })
            } else {
                res.send("No entry in Staff found")
            }
        })

    } else {
        res.send("Fill all parameters")
    }
})
// Link dept semester course and staff - working
router.post('/linkdepsemcourse', (req, res) => {
    if (req.body.c_id && req.body.dept && req.body.semester && req.body.s_id) {
        let sql = "INSERT INTO dept_sem_course (c_id , dept , semester , s_id) VALUES('" + req.body.c_id + "' , '" + req.body.dept + "' , " + req.body.semester + " , '" + req.body.s_id + "')"
        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.send("Error adding record")
            } else {
                res.send("Department Course and staff linked successfully")
            }
        })

    } else {
        res.send("Fill all parameters")
    }
})



// ***************************************************************************************************

const inserttoattendance = async (student_id, tt_id, dsc_id) => {
    let sql = "INSERT INTO attandence (student_id , tt_id , dsc_id) VALUES ('" + student_id + "' , " + tt_id + " , " + dsc_id + ")"
    // INSERT INTO attandence (student_id , tt_id) VALUES ('TVE17CS003' , 1);
    await connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log("SQL Error")
        } else {
            console.log("Value inserted")
        }
    })
}

// Staff Operations - Testing Phase

router.get('/selectclass', auth.authStaff, (req, res) => {
    let sql = "SELECT dept_sem_course.id , name , dept_sem_course.dept , dept_sem_course.c_id , semester from dept_sem_course INNER JOIN courses ON dept_sem_course.c_id = courses.id WHERE dept_sem_course.s_id = '" + req.user.id + "' "
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.redirect('/api/staffhome')
        } else {
            if (results.length > 0) {
                res.render("selectclass", { results: results })
            } else {
                res.render("selectclass", { err: true })
            }
        }
    })
})

router.post('/tickabsent', (req, res) => {
    console.log(JSON.stringify(req.body))
    console.log("Req.body :\nhour : " + req.body.hour + "\nDate : " + req.body.date + "\nAbsent : " + req.body.absent)
    console.log("DSC id : " + req.body.dsc_id)

    let initial = "SELECT * FROM timetable WHERE timetable.ymd = '" + req.body.date + "' AND timetable.hour = " + req.body.hour + ""

    connection.query(initial, (error, results, fields) => {
        if (error) {
            res.send({
                msg: "SQL Error"
            })
        }

        if (results.length == 0) {
            let sql1 = "INSERT INTO timetable (ymd , hour , dsc_id) VALUES('" + req.body.date + "' , " + req.body.hour + " , " + req.body.dsc_id + " )"
            connection.query(sql1, (error, results, fields) => {
                if (error) {
                    res.redirect('/api/selectclass')
                } else {

                    console.log("RESULTS  => " + results)
                    if (req.body.absent == undefined) {
                        res.redirect('/api/staffhome')
                    } else if (Array.isArray(req.body.absent)) {
                        console.log("ARRAY")
                        req.body.absent.forEach(element => {
                            inserttoattendance(element, results.insertId, req.body.dsc_id)
                        });
                        res.redirect('/api/staffhome')
                    } else {
                        console.log("NOT AN ARRAY")
                        console.log(req.body.absent + " and " + results.id + " passed to function")
                        inserttoattendance(req.body.absent, results.insertId, req.body.dsc_id)

                        res.redirect('/api/staffhome')
                    }
                }
            })
        } else {
            res.redirect('/api/selectclass')
        }
    })
})

router.post('/markattandence', auth.authStaff, (req, res) => {

    let sql = "SELECT student.id , student.name FROM student , dept_sem_course WHERE dept_sem_course.dept = student.dept AND dept_sem_course.semester = student.sem AND dept_sem_course.id = '" + req.body.course + "'"

    connection.query(sql, (error, results, fields) => {
        // console.log(results)
        res.render('markattandence', { results: results, course: req.body.course })
    })


})

router.post('/logout', (req, res) => {
    res.clearCookie('_auth')
    res.redirect('/api/loginstaff')
})

router.get('/loginstaff', auth.notAuth, (req, res) => {
    res.render('login')
})

router.get('/staffhome', auth.authStaff, (req, res) => {

    // console.log(req.user)
    let sql = "SELECT * FROM dept_hod WHERE hod_id = '" + req.user.id + "'"
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.send({
                msg: "SQL error"
            })
        }
        if (results.length == 0) {
            let sql = "SELECT * FROM advisor WHERE s_id = '" + req.user.id + "'"
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    res.send({
                        msg: "SQL error"
                    })
                }
                if (results.length == 0) {
                    res.render('staffhome', {
                        id: req.user.id,
                        name: req.user.name,
                        dept: req.user.dept,
                        hod: false,
                        advisor: false
                    })
                } else {
                    res.render('staffhome', {
                        id: req.user.id,
                        name: req.user.name,
                        dept: req.user.dept,
                        hod: false,
                        advisor: true
                    })
                }
            })
        } else {
            res.render('staffhome', {
                id: req.user.id,
                name: req.user.name,
                dept: req.user.dept,
                hod: true,
                advisor: false
            })
        }
    })
})

// For Staff Advisor
router.get('/viewdutyleave', auth.authStaff, (req, res) => {
    // console.log("In duty leave")
    // console.log(req.user)
    let sql = "SELECT duty_leave.id , duty_leave.subject , duty_leave.description , duty_leave.date_of_application , duty_leave.date_for_application , duty_leave.hour , duty_leave.student_id , X.name FROM duty_leave INNER JOIN (SELECT student.name , student.dept , student.sem , student.id AS s_id FROM advisor INNER JOIN student ON (advisor.dept = student.dept AND advisor.semester = student.sem ) WHERE s_id = '" + req.user.id + "') AS X ON X.s_id = duty_leave.student_id AND duty_leave.staff_approved = 0"
    // console.log(sql)
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.redirect('/api/staffhome')
        }
        if (results.length >= 0) {
            res.render('viewdutyleave', { results: results, name: req.user.name })
        }
    })
})

router.post('/approvedadvisor', auth.authStaff, (req, res) => {
    console.log(req.body)
    let sql = "UPDATE duty_leave SET duty_leave.staff_approved = true WHERE duty_leave.id = " + req.body.dutyleave + ""
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.redirect('/api/viewdutyleave')
        } else {
            res.redirect('/api/staffhome')
        }
    })

})

router.post('/approvedhod', async (req, res) => {
    // console.log(req.body)
    let sql = "DELETE FROM attandence where attandence.tt_id in (SELECT id from timetable where ymd in(SELECT date_for_application from duty_leave where id = " + req.body.dutyleave + ") and hour in (SELECT hour from duty_leave where id = " + req.body.dutyleave + ")) and attandence.student_id in (SELECT duty_leave.student_id FROM duty_leave WHERE duty_leave.id = " + req.body.dutyleave + ")"
    let sqlupdate = "UPDATE duty_leave SET hod_approved = 1 WHERE id = " + req.body.dutyleave + ""
    connection.query(sqlupdate, (error, results, fields) => {
        if(error) {
            res.send({
                msg : "SqL Error"
            })
        }
        connection.query(sql, (error, results, fields) => {
            res.redirect('/api/staffhome')
        })

    })
    

})

router.get('/viewdutyleavehod', auth.authStaff, (req, res) => {

    let sql = "SELECT duty_leave.id , duty_leave.subject , duty_leave.description , duty_leave.date_of_application , duty_leave.date_for_application , duty_leave.hour , duty_leave.student_id , student.name from duty_leave INNER JOIN student on duty_leave.student_id = student.id WHERE duty_leave.student_id IN (SELECT student.id FROM student where student.dept IN (SELECT dept_hod.dept from dept_hod WHERE dept_hod.hod_id = '" + req.user.id + "')) AND duty_leave.staff_approved = 1 AND duty_leave.hod_approved = 0"
    // console.log(sql)
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.redirect('/api/staffhome')
        }
        if (results.length >= 0) {

            res.render('viewdutyleavehod', { results: results, name: req.user.name })
        }
        // res.redirect('/api/staffhome')
    })
})

router.post('/loginstaff', (req, res) => {
    let sql = "SELECT * FROM users WHERE usertype = 2 AND id = '" + req.body.username + "' AND pass = '" + req.body.password + "'"
    connection.query(sql, async (error, results, fields) => {
        if (error) {
            res.redirect('/api/loginstaff')
        }
        if (results.length == 1) {
            const token = await jwt.sign(results[0].id, 'secret')
            res.cookie('_auth', token)
            req.user = results[0]
            res.redirect('/api/staffhome')

        } else {
            res.redirect('/api/loginstaff')
        }
    })

})


router.get('/*', (req, res) => {
    res.render('error')
})



module.exports = router