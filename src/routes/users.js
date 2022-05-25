var express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://mongodb/user');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  let json;
  User.find(function(err, result){
      if(!err) {
        json = res.json(result);
      } else {
          return res.status(500).send('get all user faild.');
      }
  });
  res.send(json);
});

router.get('/create', (req, res)=>{
  if (!req.body){
    return res.status(500).send('reqest body empty.');
  }

  const instance = new User();
  instance.name = "test";
  instance.age = 12;
  // MongoDBに保存
  instance.save(function(err){
    console.log(err);
      if(!err) {
          return res.status(200).send('user create success.');
      } else {
          return res.status(500).send('user create faild.');
      }
  });
});

module.exports = router;
