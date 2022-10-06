var express = require('express');
var router = express.Router();
const {  check ,validationResult } = require('express-validator');
var multer = require('multer');
var upload = multer({ dest: './uploads'})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{ title:'Register' });
});

router.get('/login', function(req, res, next) {
  res.render('login',{ title:'Login' });
});

router.post('/register',   
check('name')
.notEmpty()
.withMessage('Name is required field')
.bail() // it's something like stop
.isLength({ min: 4, max: 32 })
.withMessage('Name should be at least 4 and at most 32 chars'),

check('email')
.notEmpty()
.withMessage('Email is required field')
.bail()
.isEmail()
.withMessage('Invalid Email')
.bail(),

check('username')
.notEmpty()
.withMessage('Username is required field')
.bail() // it's something like stop
.isLength({ min: 4, max: 32 })
.withMessage('Username should be at least 4 and at most 32 chars'),

check('password')
.notEmpty()
.withMessage('Password is a required field')
.bail()
.isLength({ min: 6 })
.withMessage('Password should have at least 6 characters')
.bail()
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
.withMessage('Password should have one Capital letter, one Number and one Special Character'),

check('password2')
.equals('password')
.withMessage('Passwords do not match')
.bail(),

upload.single('profileImage'),
 function(req, res, next) {

 var name = req.body.name
 var email = req.body.email
 var username = req.body.username
 var password = req.body.password
 var password2 = req.body.password2

  if(req.file){
    console.log('Uploading File...');
    const profileImage = req.file.filename;
  }else{
    console.log('No File Uploaded...');
    const profileImage = 'noimage.jpg'
  }


  //Check Errors
  const errors =  validationResult(req);
  console.log(errors)

  if(errors){
    res.render('register',{
      errors: errors
    })
  }else{
    console.log('No errors')
  }
});

module.exports = router;
