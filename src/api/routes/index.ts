import express, { NextFunction, Request, Response, Router } from 'express';

const router: Router = express.Router();

// GET home page
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('index', { title: 'Express' });
  } catch (error) {
    next(error); // Pass errors to error handling middleware
  }
});

export default router;
