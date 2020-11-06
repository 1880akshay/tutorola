var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var multer = require("multer");

var storage = multer.diskStorage({
  //destination: '../public_html/profile_images',
  destination: '../final/public/profile_images',
	filename: (req, file, cb) => {
		cb(null, 'image_' + 'user' + req.body.id + path.extname(file.originalname));
	}
});

var upload = multer({
	storage: storage
});

global.upload = upload;

var transporter = nodemailer.createTransport({
  host: "mail.tutorola.com",
  port: 465,
  secure: true,
  auth: {
    user: 'no-reply@tutorola.com',
    pass: 'tutorola@123'
  }
})

global.transporter = transporter;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tutorola_tutorola"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

global.con = con;

var indexRouter = require("./routes/index");
var loginRouter = require('./routes/login');
var webinarRouter = require('./routes/webinar');
var requestRouter = require('./routes/request');
var contactRouter = require('./routes/contact');
var topicRequestRouter = require('./routes/topicRequest');
var profileRouter = require('./routes/profile');
var coursesRouter = require('./routes/courses');
//var usersRouter = require("./routes/users");
//var testAPIRouter = require("./routes/testAPI");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

/*var corsOptions = {
  origin: 'https://www.tutorola.com'
}*/

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", indexRouter);
app.use("/api/login", loginRouter);
app.use('/api/webinar', webinarRouter);
app.use('/api/request', requestRouter);
app.use('/api/contact', contactRouter);
app.use('/api/topicRequest', topicRequestRouter);
app.use('/api/profile', profileRouter);
app.use('/api/courses', coursesRouter);
//app.use("/users", usersRouter);
//app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
