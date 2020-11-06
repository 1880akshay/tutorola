var express = require('express');
var router = express.Router();

router.post('/tutor', function(req, res, next) {
  var user = req.body;
  let query = "INSERT INTO tutor_request (name, email, phoneNumber, class) VALUES ('"+user.name+"', '"+user.email+"', '"+user.phoneNumber+"', '"+user.class+"')";
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