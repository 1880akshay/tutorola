var express = require('express');
var router = express.Router();

router.get('/getCourses', function(req, res, next) {
    let query = "SELECT * from courses";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            res.send(result);
        }
    })
});

router.post('/getCourseInfo', function(req, res, next) {
    let query = "SELECT * from courses WHERE id='"+req.body.courseId+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            if(result.length) res.send({'status': 'success', 'courseInfo': result[0]});
            else res.send({'status': 'failure'});
        }
    })
})

router.post('/getSubject', function(req, res, next) {
    let query = "SELECT * from subject WHERE id='"+req.body.subjectId+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            res.send(result[0]);
        }
    })
});

router.post('/getTopic', function(req, res, next) {
    let query = "SELECT * from topic WHERE subjectId='"+req.body.subjectId+"' AND id='"+req.body.topicId+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            res.send(result[0]);
        }
    })
})

module.exports = router;