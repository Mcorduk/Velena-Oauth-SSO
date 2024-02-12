import express from 'express';
export const router = express.Router();

import * as apiRouter from './routes/index';

router.use('/api', apiRouter.router);
