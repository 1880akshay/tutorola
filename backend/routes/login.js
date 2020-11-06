var express = require('express');
var router = express.Router();

//student login related apis

router.post('/studentLogin', function(req, res, next) {
    var user = req.body;
    let query = "SELECT * FROM students WHERE email='"+user.email+"' AND password='"+user.password+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            if(result && result.length) {
                let query2 = "UPDATE students SET tokenStatus = 'true' WHERE email = '"+user.email+"' AND password='"+user.password+"'";
                con.query(query2, (e, r) => {
                    if(e) throw e;
                    else res.send({'status': 'success', 'token': result[0].token});
                })
            }
            else res.send({'status': 'failure'});
        }
    })
})

router.post('/studentSendOTP', function(req, res, next) {
    var email = req.body.email;
    var otp = Math.floor(100000 + Math.random()*900000);
    var details = {
		from: 'no-reply@tutorola.com',
		to: email,
		subject: 'Tutorola Email Verification ',
        html: '<h2>Tutorola Email Verification</h2><p>The otp for Tutorola is: '+otp+'</p>'
    };
    
    transporter.sendMail(details, function (error, info) {
        if(error) res.send({status: 'failure'});
        else res.send({status: 'success', otp});  
    });
});

router.post('/studentCheckOTP', function(req, res, next) {
    var otp = req.body.otp;
    var input = req.body.input;
    if(Number(otp) === Number(input)) {
        res.send({status: 'success'});
    }
    else {
        res.send({status: 'failure'});
    }
})

router.post('/studentSignup', function(req, res, next) {
  var user = req.body;
  var currentdate = new Date();
  var token = user.email + "@@" + currentdate.getDate() + "$"
                + (currentdate.getMonth()+1)  + "$" 
                + currentdate.getFullYear() + ".." + "$"  
                + currentdate.getHours() + "$"  
                + currentdate.getMinutes() + "$" 
                + currentdate.getSeconds();
  let query = "INSERT INTO students (name, email, password, token, tokenStatus, profileImage) VALUES ('"+user.name+"', '"+user.email+"', '"+user.password+"', '"+token+"', 'false', 'avatar.png')";
  con.query(query, (err, result) => {
      if(err) {
        res.send({'status': 'failure'});
      }
      else {
        console.log('student record inserted');
        res.send({'status': 'success'});
      }
  })
})

router.post('/studentLogout', function(req, res, next) {
    var token = req.body.token;
    let query = "UPDATE students SET tokenStatus='false' WHERE token='"+token+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else res.send({'status': 'success'});
    })
})

router.post('/checkTokenStatus', function(req, res, next) {
    var token = req.body.token;
    let query = "SELECT * FROM students WHERE token='"+token+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            if(result.length !== 0 && result[0].tokenStatus === 'true') {
                res.send({'status': 'success', 'info': result[0]});
            }
            else {
                res.send({'status': 'failure'});
            }
        }
    })
})

router.post('/studentIsEmail', function(req, res, next) {
    var email = req.body.email;
    let query = "SELECT * FROM students WHERE email='"+email+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            if(result && result.length) res.send({'status': 'notAvailable'});
            else res.send({'status': 'available'});
        }
    })
})

//teacher login related apis

router.post('/teacherLogin', function(req, res, next) {
    var user = req.body;
    let query = "SELECT * FROM teachers WHERE email='"+user.email+"' AND password='"+user.password+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            if(result && result.length) {
                let query2 = "UPDATE teachers SET tokenStatus = 'true' WHERE email = '"+user.email+"' AND password='"+user.password+"'";
                con.query(query2, (e, r) => {
                    if(e) throw e;
                    else res.send({'status': 'success', 'token': result[0].token});
                })
            }
            else res.send({'status': 'failure'});
        }
    })
})

router.post('/teacherSendOTP', function(req, res, next) {
    var email = req.body.email;
    var otp = Math.floor(100000 + Math.random()*900000);
    var details = {
		from: 'no-reply@tutorola.com',
		to: email,
		subject: 'Tutorola Email Verification ',
        html: '<h2>Tutorola Email Verification</h2><p>The otp for Tutorola is: '+otp+'</p>'
    };
    
    transporter.sendMail(details, function (error, info) {
        if(error) res.send({status: 'failure'});
        else res.send({status: 'success', otp});  
    });
});

router.post('/teacherCheckOTP', function(req, res, next) {
    var otp = req.body.otp;
    var input = req.body.input;
    if(Number(otp) === Number(input)) {
        res.send({status: 'success'});
    }
    else {
        res.send({status: 'failure'});
    }
})

router.post('/teacherSignup', function(req, res, next) {
  var user = req.body;
  var currentdate = new Date();
  var token = "teacher" + user.email + "@@" + currentdate.getDate() + "$"
                + (currentdate.getMonth()+1)  + "$" 
                + currentdate.getFullYear() + ".." + "$"  
                + currentdate.getHours() + "$"  
                + currentdate.getMinutes() + "$" 
                + currentdate.getSeconds();
  let query = "INSERT INTO teachers (name, email, password, token, tokenStatus) VALUES ('"+user.name+"', '"+user.email+"', '"+user.password+"', '"+token+"', 'false')";
  con.query(query, (err, result) => {
      if(err) {
        res.send({'status': 'failure'});
      }
      else {
        console.log('teacher record inserted');
        res.send({'status': 'success'});
      }
  })
})

router.post('/teacherLogout', function(req, res, next) {
    var token = req.body.token;
    let query = "UPDATE teachers SET tokenStatus='false' WHERE token='"+token+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else res.send({'status': 'success'});
    })
})

router.post('/teacherCheckTokenStatus', function(req, res, next) {
    var token = req.body.token;
    let query = "SELECT * FROM teachers WHERE token='"+token+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            if(result[0].tokenStatus === 'true') {
                res.send({'status': 'success'});
            }
            else {
                res.send({'status': 'failure'});
            }
        }
    })
})

router.post('/teacherIsEmail', function(req, res, next) {
    var email = req.body.email;
    let query = "SELECT * FROM teachers WHERE email='"+email+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            if(result && result.length) res.send({'status': 'notAvailable'});
            else res.send({'status': 'available'});
        }
    })
})

module.exports = router;
