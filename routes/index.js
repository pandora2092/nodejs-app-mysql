const express = require('express');
const router = express.Router();
const mysqlx = require('@mysql/xdevapi');
const docs = [];

mysqlx.getSession({
  host: 'localhost',
  port: '33060',
  dbUser: 'root',
  dbPassword: '4647187Cc'
  }).then(function (session) {
  const schema = session.getSchema('world_x');
  const collection = schema.getCollection('countryinfo');
  
  collection
  .find("GNP*1000000/demographics.Population > 30000")
  .execute(doc => {
    docs.push(doc);
    router.get('/', function(req, res, next) {
      //res.json(docs);
      res.render('index', {docs});
    });
  })
  .then((doc) => {
  })
  
  session.close();
})

module.exports = router;
