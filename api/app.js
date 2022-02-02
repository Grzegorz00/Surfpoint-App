var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authUtils = require('./util/authUtils');
const i18n = require('i18n');

var indexRouter = require('./routes/index');
const instructorRouter = require('./routes/instructorRoute');
const courseRouter = require('./routes/courseRoute');
const clientRouter = require('./routes/clientRoute');
const instructorApiRouter = require('./routes/api/InstructorAPIRoute');
const clientApiRouter = require('./routes/api/ClientApiRoute');
const courseApiRouter = require('./routes/api/CourseApiRoute');
const authApiRouter = require('./routes/api/AuthApiRoute');
var app = express();

var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik 
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});

app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
});

const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false
}))

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});

app.use('/', indexRouter);
app.use('/instructor', authUtils.permitAuthenticatedUser, instructorRouter);
app.use('/course', courseRouter);
app.use('/client', clientRouter);
app.use('/api/instructors',  instructorApiRouter);
app.use('/api/clients', clientApiRouter);
app.use('/api/courses', courseApiRouter);
app.use('/api/auth', authApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
  .catch(err => {
    console.log(err);
  });

module.exports = app;