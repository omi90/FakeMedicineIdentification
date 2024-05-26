// server.js
console.log('Loading dependencies');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const constants = require('./constants');
const { error } = require('console');
const contract = require('./subscription');
const product = require('./models/product');
const actor = require('./models/actor');
const rawMaterial = require('./models/rawmaterial');
const PORT = 8085;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client', 'build')));

// Add routes here
app.route('/actor/count')
    .get(async (req,res,next) => {
      res.send({ count: await actor.countDocuments({})});
    });

app.route('/product/count')
    .get(async (req,res,next) => {
      res.send({ count: await product.countDocuments({})});
    });

app.route('/rawmaterial/count')
    .get(async (req,res,next) => {
      res.send({ count: await rawMaterial.countDocuments({})});
    });

mongoose.connect(constants.DBCONNECTIONURL).then( async () => 
  {
    console.log("Db Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
).catch(error => {
  console.log("Error connecting to db:"+error);
});
