import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

// GET users listing
router.get('/', async (req: Request, res: Response, next) => {
  try {
    res.send('users')
  } catch (error) {
    next(error); // Pass errors to error handling middleware
  }
});

export default router;
