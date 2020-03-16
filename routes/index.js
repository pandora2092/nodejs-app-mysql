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
  const schema = session.getSchema('nik');
  const collection = schema.getCollection('list2');
  
  collection
  .find('')
  .execute(doc => {
    docs.push(doc);
    router.get('/api/search', function(req, res, next) {
      res.json(docs);
      //res.render('index', {docs});
    });
  })
  .then((doc) => {
  })
  
  session.close();
})

router.post('/api/item/save', function (req, res, next) {
  mysqlx.getSession({
    host: 'localhost',
    port: '33060',
    dbUser: 'root',
    dbPassword: '4647187Cc'
  }).then(function (session) {
    var schema = session.getSchema('nik');
    var collection = schema.getCollection('list2');
    console.log(req.body);

    collection
    .add(req.body)
    .execute()
    .then(() => {
    })

  });
});

module.exports = router;
