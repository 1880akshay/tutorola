var express = require('express');
var router = express.Router();

router.post('/getReviews', function(req, res, next) {
    var courseId=req.body.courseId;
    let query = "SELECT * FROM reviews WHERE courseId='"+courseId+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            if(result && result.length)
                res.send({'status': 'success', 'reviews': result});
            else res.send({'status': 'failure'});
        }
    });
});

router.post('/addReview', function(req, res, next) {
    var data=req.body;
    var prevRating=Number(data.prevRating);
    var totalRatings=Number(data.totalRatings);
    var newRating=((prevRating*totalRatings+Number(data.rating))/(totalRatings+1)).toFixed(1);
    let query = "INSERT INTO reviews (courseId, studentId, studentName, profileImage, rating, review) VALUES ('"+data.courseId+"', '"+data.studentId+"', '"+data.studentName+"', '"+data.profileImage+"', '"+data.rating+"', '"+data.review+"'); UPDATE courses SET rating='"+newRating+"' WHERE id='"+data.courseId+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else res.send({'status': 'success'});
    });
});

module.exports = router;