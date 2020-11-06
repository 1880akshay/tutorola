var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var user = req.body;
  let query = "INSERT INTO webinar (name, email, phoneNumber, jee, neet, school, referralCode) VALUES ('"+user.name+"', '"+user.email+"', '"+user.phoneNumber+"', '"+user.jee+"', '"+user.neet+"', '"+user.school+"', '"+user.referralCode+"')";
  con.query(query, (err, result) => {
      if(err) {
        res.send({'status': 'failure'});
      }
      else {
        res.send({'status': 'success'});
      }
  })
})

module.exports = router;