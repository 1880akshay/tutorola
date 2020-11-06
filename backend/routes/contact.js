var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var user = req.body;
  let query = "INSERT INTO contact (name, email, message) VALUES ('"+user.name+"', '"+user.email+"', '"+user.message+"')";
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