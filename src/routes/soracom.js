var express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Soracom = require('../models/soracom');

mongoose.connect('mongodb://db/iot');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* GET users listing. */
router.get('/v1/soracom', function(req, res, next) {
  let response = "ok";
  res.send(response);
});

router.post('/v1/soracom', function(req, res, next) {
  console.log(req.body);
  res.send("ok");
});

module.exports = router;
