import createError, { HttpError } from 'http-errors';
import express, { Response, Request, NextFunction } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import timeout from 'connect-timeout';
import mongoose from 'mongoose';
import connectToMongoDB from './config/db/mongodb'; // Adjust the path accordingly

import indexRouter from './api/routes/index';
import usersRouter from './api/routes/users';

const app = express();

// FIXME make me async await
connectToMongoDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Security Middleware
app.use(helmet()); // Basic security headers

// Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    // Adjust origins, methods, and headers based on your requirements
    origin: ['http://localhost:3000'], // Example: Allow requests from specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

// Rate Limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Allow 100 requests per window
    standardHeaders: true, // Use standard rate limiting headers
    legacyHeaders: false, // Disable deprecated headers
    message: 'Too many requests, please try again later',
  }),
);

// Compression
app.use(compression());

// HTTP Request Timeout
app.use(timeout('30s')); // Set a 30-second timeout

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(express.json()); // Parse JSON data first
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data if JSON parsing fails
app.use(logger('dev')); // Loggin middleware
// Why use path? because otherwise it's not cross-platform. Mac and Linux => /public, on windows \public
// app.use(express.static(path.join(__dirname, '../public'))); // sends static files such as images, js, css
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
