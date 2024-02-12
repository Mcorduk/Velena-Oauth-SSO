import express, { NextFunction, Request, Response, Router } from 'express';
import * as auth from './auth';
import * as me from './me';
import * as oauth from './oauth2';
const router: Router = express.Router();

export const router = express.Router();

router.use('/api/auth', auth.router);
router.use('/api/me', me.router);
router.use('/api/oauth', oauth.router);

export default router;
