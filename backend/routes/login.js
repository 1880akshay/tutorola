var express = require('express');
var router = express.Router();

router.post('/studentLogin', function(req, res, next) {
    var user = req.body;
    let query = "SELECT * FROM students WHERE username='"+user.username+"' AND password='"+user.password+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            if(result && result.length) res.send({'status': 'success'});
            else res.send({'status': 'failure'});
        }
    })
})

router.post('/studentSignup', function(req, res, next) {
  var user = req.body;
  let query = "INSERT INTO students (name, email, phoneNumber, username, password) VALUES ('"+user.name+"', '"+user.email+"', '"+user.phoneNumber+"', '"+user.username+"', '"+user.password+"')";
  con.query(query, (err, result) => {
      if(err) {
        res.send({'status': 'failure'});
      }
      else {
        console.log('student record inserted');
        res.send({'status': 'success'});
      }
  })
});

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

router.post('/studentIsPhoneNumber', function(req, res, next) {
    var phoneNumber = req.body.phoneNumber;
    let query = "SELECT * FROM students WHERE phoneNumber='"+phoneNumber+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            if(result && result.length) res.send({'status': 'notAvailable'});
            else res.send({'status': 'available'});
        }
    })
})

router.post('/studentIsUsername', function(req, res, next) {
    var username = req.body.username;
    let query = "SELECT * FROM students WHERE username='"+username+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            if(result && result.length) res.send({'status': 'notAvailable'});
            else res.send({'status': 'available'});
        }
    })
})

module.exports = router;
