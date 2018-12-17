const notes = require('./notes');
const lists = require('./lists');
const main = require('./mainpage');

module.exports = (app, db) => {
  main(app,db);
  notes(app, db);
  lists(app, db);
};