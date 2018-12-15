const notes = require('./notes');
const lists = require('./lists');
const main = require('./mainpage.js');

module.exports = (app, db) => {
  main(app,db);
  notes(app, db);
  lists(app, db);
  // Сюда добавлять другие обработчики маршрутов 
};