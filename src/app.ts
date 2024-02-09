import createError, { HttpError } from 'http-errors';
import express, { Response, Request, NextFunction } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import timeout from 'connect-timeout';
import connectToMongoDB from './config/db/mongodb'; // Adjust the path accordingly

import indexRouter from './api/routes/index';
import usersRouter from './api/routes/users';

const app = express();

(async () => {
  try {
    await connectToMongoDB();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();

app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '60000'),
    max: parseInt(process.env.RATE_LIMIT_MAX ?? '100'),
    standardHeaders: true, // Use standard rate limiting headers
    legacyHeaders: false, // Disable deprecated headers
    message: 'Too many requests, please try again later',
  }),
);
app.use(compression());
app.use(timeout('30s')); // Set a 30-second timeout
app.use(express.json()); // Parse JSON data first
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data if JSON parsing fails
app.use(logger('dev')); // Loggin middleware

// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, 'Not Found'));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // log the error
  console.error(err);

  // send a JSON response with the error details
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      stack: req.app.get('env') === 'development' ? err.stack : undefined,
    },
  });
});

module.exports = app;
