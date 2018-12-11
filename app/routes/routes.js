const notes = require('./notes')
const lists = require('./lists')

module.exports = (app, db) => {
  notes(app, db)
  lists(app, db)
  // Сюда добавлять другие обработчики маршрутов 
};