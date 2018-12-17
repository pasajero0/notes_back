const express 		= require('express'); // подключаем express
const path 			= require('path');
const MongoClient   = require('mongodb').MongoClient; // подключаем пакет для работы с MongoDB
const bodyParser 	= require('body-parser'); // подключаем middleware для обработки запросов
const cors 			= require('cors'); // подключаем middleware для упрощения работы с CORS
const db 			= require('./config/db'); // подключаем файл с настройками для подключения к базе данных
const app  			= express(); // создаем объект приложения
const port 			= process.env.PORT || 8000

app.use(cors()); // указываем что необходимо использовать пакет cors
app.use(bodyParser.json()); // указываем что все запросы необходимо обрабатывать в JSON формате

app.use('/', express.static('public'));
app.set('view engine', 'pug');
// app.set('views', './views')
app.set('views', path.join(__dirname, 'views'));

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, client) => {
  if(err) return console.log(err); // обработка ошибки
  const database = client.db(db.dbName); // указываем к какой базе подключаться
  require('./routes/routes.js')(app, database); // импортируем роуты и передаем ссылку на объект нашего приложения и подключения к БД
  app.listen(port, () => { // назначаем порт для прослушивания
    console.log('Connected to '+ db.url);
    console.log('We are live on http://localhost:'+port)
  });
});

