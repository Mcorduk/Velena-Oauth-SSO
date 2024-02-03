import createError, { HttpError } from 'http-errors';
import express, { Response, Request, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './api/routes/index';
import usersRouter from './api/routes/users';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // Loggin middleware
app.use(express.json()); // ??
app.use(express.urlencoded({ extended: false })); // ??
app.use(cookieParser()); // parses cookies
// Why use path? because otherwise it's not cross-platform. Mac and Linux => /public, on windows \public
app.use(express.static(path.join(__dirname, '../public'))); // sends static files such as images, js, css
// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, 'Not Found'));
});

// error handler
//you are not using next, why add it? Express tracks middleware types by the number of arguments they take,
//In this case, error handling middleware = takes four arguments
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
