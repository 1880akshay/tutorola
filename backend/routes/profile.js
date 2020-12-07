var express = require('express');
var router = express.Router();
const Jimp = require('jimp');
const fs = require('fs');
/*var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
	destination: '../../public_html/profile_images',
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + 'user#' + req.body.id + path.extname(file.originalname));
	}
});

var upload = multer({
	storage: storage
});*/

router.post('/studentIsPhoneNumber', function(req, res, next) {
    var phone = req.body.phoneNumber;
    let query = "SELECT * FROM student_info WHERE phoneNumber='"+phone+"'";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            if(result && result.length) res.send({'status': 'notAvailable'});
            else res.send({'status': 'available'});
        }
    })
})

router.post('/updateProfile', function(req, res, next) {
    var userId = req.body.id;
    var token = req.body.token;
    var part2 = token.substr(token.indexOf('@@'), token.length);
    var newToken = req.body.email+part2;
    let query = "UPDATE students SET name='"+req.body.name+"', email='"+req.body.email+"', token='"+newToken+"' WHERE id='"+userId+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            let query2 = "REPLACE INTO student_info (id, phoneNumber, city, class, subjects) VALUES ('"+userId+"', '"+req.body.phoneNumber+"', '"+req.body.city+"', '"+req.body.class+"', '"+req.body.subjects+"')";
            con.query(query2, (e, r) => {
                if(e) res.send({'status': 'failure'});
                else {
                    res.send({'status': 'success'});
                }
            })
        }
    })
})

router.post('/getProfile', function(req, res, next) {
    var userId = req.body.id;
    let query = "SELECT * FROM student_info WHERE id='"+userId+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            if(result && result.length) res.send({'status': 'success', 'phoneNumber': result[0].phoneNumber, 'city': result[0].city, 'class': result[0].class, 'subjects': result[0].subjects});
            else res.send({'status': 'failure'});
        }
    })
})

router.post('/imageUpload', upload.single('profileImage'), function(req, res, next) {
    var id = req.body.id;
    var image = req.file.filename;
    var nameonly=image.substr(0, image.lastIndexOf('.'));
    // Jimp.read('../public_html/profile_images/students/'+image, (err, img) => {
    Jimp.read('../public/profile_images/students/'+image, (err, img) => {
        if (err) throw err;
        img
          .resize(256, 256) // resize
          .write('../public/profile_images/students/'+nameonly+'.jpg'); // save
    });
    if(nameonly+'.jpg'!==image) {
        fs.unlink('../public/profile_images/students/'+image, (err) => {
            if (err) {
              console.log(err);
              return;
            }          
            //file removed
        })
    }
    let query = "UPDATE students SET profileImage='"+nameonly+".jpg' WHERE id='"+id+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else res.send({'status': 'success'});
    })
})

router.post('/changePassword', function(req, res, next) {
    let query = "SELECT * from students WHERE id='"+req.body.id+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            if(result[0].password===req.body.oldPassword) {
                let query2 = "UPDATE students SET password='"+req.body.newPassword+"' WHERE id='"+req.body.id+"'";
                con.query(query2, (e, r) => {
                    if(e) res.send({'status': 'failure'});
                    else {
                        res.send({'status': 'success'});
                    }
                })
            }
            else res.send({'status': 'failure2'});
        }
    })
})

module.exports = router;