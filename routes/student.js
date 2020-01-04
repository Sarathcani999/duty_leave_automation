const connection = require('../config/connect')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authStaff,notAuth , authStudent } = require('./middleware/auth')

router.get('/login' ,notAuth , (req,res) => {
    res.render('loginstudent')
})

router.post('/login' , (req,res) => {
    let sql = "SELECT * FROM users WHERE usertype = 1 AND id = '" + req.body.username + "' AND pass = '" + req.body.password + "'"
    connection.query(sql, async (error, results, fields) => {
        if (error) {
            res.redirect('/api/loginstaff')
        }
        if (results.length == 1) {
            const token = await jwt.sign(results[0].id, 'secret')
            res.cookie('_auth', token)
            req.user = results[0]
            res.redirect('/student/home')

        } else {
            res.redirect('/student/login')
        }
    })
})

router.get('/viewattendance' , authStudent , (req,res) => {
    let sql = "SELECT F.id , F.c_id , E.total , E.absent , ROUND(100*(total - absent)/total , 2) as percentage FROM (SELECT Q.dsc_id , Q.total , IFNULL(P.absent,0) AS absent FROM (SELECT X.dsc_id , COUNT(*) as absent FROM attandence as X WHERE X.dsc_id IN (SELECT A.id as class from dept_sem_course as A , student as B WHERE A.semester = B.sem AND A.dept = B.dept AND B.id = '"+ req.user.id +"') GROUP BY X.dsc_id) as P RIGHT JOIN (SELECT Y.dsc_id , count(*) as total FROM timetable as Y WHERE Y.dsc_id IN (SELECT C.id as class from dept_sem_course as C , student as D WHERE C.semester = D.sem AND C.dept = D.dept AND D.id = '"+ req.user.id +"') GROUP BY Y.dsc_id) as Q ON P.dsc_id = Q.dsc_id) as E INNER JOIN dept_sem_course as F ON E.dsc_id = F.id"
    
    // console.log(sql)
    
    connection.query(sql , (error, results , fields) => {
        res.render('viewattendance' , {results})
    })
})

router.get('/home' , authStudent , (req,res) => {
    // console.log(req.user)
    res.render('studenthome' , req.user)
})

router.post('/logout' , (req,res) => {
    res.clearCookie('_auth')
    res.redirect('/student/login')
})
router.get('/submitdutyleave' , authStudent , (req,res) => {
    res.render('submitdutyleave')
})

router.post('/submitdutyleave' , authStudent , (req,res) => {
    console.log(req.user)
    console.log(req.body)
    let sql = "insert into duty_leave (subject , description , date_of_application ,date_for_application , hour , student_id ) values('"+ req.body.subject +"' , '"+ req.body.description+"' , CURDATE() , '"+ req.body.date_for_application +"' , "+req.body.hour+" , '"+ req.user.id +"' );"
    
    connection.query(sql , (error , results , fields) => {
        res.redirect('/student/home')
    })
    
})

router.get("/viewsubmitteddutyleave" , authStudent , (req,res) => {
    // res.send(req.user)
    let sql = "SELECT * FROM duty_leave WHERE duty_leave.student_id = '"+ req.user.id +"'"
    // res.send(sql)
    connection.query(sql , (error , results , fields) => {
        if (error) {
            res.redirect('/student/home')
        } else {
            res.render('submitteddutyleave' , { name : req.user.name , results : results})
        }
    })
})

router.get('/*' , (req,res) => {
    res.render('error')
})

module.exports = router