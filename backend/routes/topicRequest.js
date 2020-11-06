var express = require('express');
var router = express.Router();

router.get('/getSubjects', function(req, res, next) {
  let query = "SELECT * FROM subject";
  con.query(query, (err, result) => {
      if(err) {
        res.send({'status': 'failure'});
      }
      else {
        res.send(result);
      }
  })
});

router.post('/getTopics', function(req, res, next) {
    var subId = req.body.subId;
    let query = "SELECT * FROM topic WHERE subjectId='"+subId+"'";
    con.query(query, (err, result) => {
        if(err) {
            res.send({status: 'failure'});
        }
        else {
            res.send(result);
        }
    })
})

router.post('/submit', function(req, res, next) {
    var data = req.body;
    let query = "INSERT INTO topic_request (name, email, phoneNumber, subject, topic) VALUES ('"+data.name+"', '"+data.email+"', '"+data.phoneNumber+"', '"+data.subject+"', '"+data.topic+"')";
    con.query(query, (err, result) => {
        if(err) {
            res.send({status: 'failure'});
        }
        else {
            res.send({status: 'success'});
        }
    })
})

module.exports = router;
