const express = require('express');
const router = express.Router();
const mysql = require('./method.js');

router.post('/api/admin/item/:id', function (req, res, next) {
  mysql.deletePost(req.params.id, function (error, deleteBody) {
    if (error) { return next(error); }
    res.json(deleteBody);
  });
});

router.post('/api/admin/item/:id/edit', function (req, res, next) {
  mysql.editPost(req.body, req.params.id, function (error, editBody) {
    if (error) { return next(error); }
    res.json(editBody);
  });
});

router.get('/api/search', function (req, res, next) {
  mysql.getAllItems(function (error, news) {
    if (error) { return next(error); }
    res.json(news);
  });
});

router.get('/api/search/:id', function (req, res, next) {
  mysql.getItemById(req.params.id, function (error, rows) {
    if (error) { return next(error); }
    res.json(rows);
  });
});

router.post('/api/item/save', function (req, res, next) {
  mysql.addPost(req.body, function (error, postBody) {
    if (error) { return next(error); }
    res.json(postBody);
  });
});


module.exports = router;
