const mysql = require('@mysql/xdevapi'); 

const config = {
  host: 'localhost',
  port: '33060',
  userid: 'root',
  password: '4647187Cc',
  schema: 'nik',
  collection: 'list2'
};

exports.getAllItems = function (cb) {
    mysql.getSession({
      host: config.host,
      port: config.port,
      dbUser: config.userid,
      dbPassword: config.password
    }).then(function (session) {
      const schema = session.getSchema(config.schema);
      const coll = schema.getCollection(config.collection);
      const docs = [];
      coll.find().execute( news => {
        docs.push(news);
      })
      .then(function (result) {
        if (docs.length > 0) {
          cb(null, docs)
          session.close();
        } else {
          cb('No data found', null);
          session.close();
        }
      });
    });
}

exports.getItemById = function (data, cb) {
    mysql.getSession({
      host: config.host,
      port: config.port,
      dbUser: config.userid,
      dbPassword: config.password
    }).then(function (session) {
      const schema = session.getSchema(config.schema);
      const coll = schema.getCollection(config.collection);
      const docs = [];
      coll.find(`_id like :_id`).bind('_id', data).execute(news => {
        docs.push(news);
      })
      .then(function (result) {
        if (docs.length > 0) {
          cb(null, docs)
          session.close();
        } else {
          cb('No data found', null);
          session.close();
        }
      });
    });
}


exports.addPost = function (data, cb) {
  mysql.getSession({
    host: config.host,
    port: config.port,
    dbUser: config.userid,
    dbPassword: config.password
  }).then(function (session) {
    const schema = session.getSchema(config.schema);
    const coll = schema.getCollection(config.collection);
    coll.add(data)
        .execute()
        .then( updated => {
          if (updated.getAffectedRowsCount() > 0) {
            cb(null, data);
          }
          else {
            cb('Comment not added', null);
          }
        });
  });
}

exports.deletePost = function (data, cb) {
  mysql.getSession({
    host: config.host,
    port: config.port,
    dbUser: config.userid,
    dbPassword: config.password
  }).then(function (session) {
    const schema = session.getSchema(config.schema);
    const coll = schema.getCollection(config.collection);
    coll.remove('_id = :_id')
        .bind('_id', data)
        .execute()
        .then( updated => {
          if (updated.getAffectedItemsCount() > 0) {
            cb(null, data);
          }
          else {
            cb('Comment not added', null);
          }
        });
  });
}

exports.editPost = function (data, id, cb) {
  mysql.getSession({
    host: config.host,
    port: config.port,
    dbUser: config.userid,
    dbPassword: config.password
  }).then(function (session) {
    var schema = session.getSchema(config.schema);
    var coll = schema.getCollection(config.collection);
    coll.modify('_id = :id')
        .bind('id', id)
        .set('name', data.name)
        .set('code', data.code)
        .set('manuscript', data.manuscript)
        .set('info', data.info)
        .set('bibliography', data.bibliography)
        .execute().then( updated => {
          if (updated.getAffectedItemsCount() > 0) {
            cb(null, data.comment);
          }
          else {
            cb('Comment not added', null);
          }
        });
  });
}