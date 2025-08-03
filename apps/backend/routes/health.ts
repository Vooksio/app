import { Router, Request, Response } from 'express';

const router = Router();

function checkSystemHealth() {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  };
}

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(checkSystemHealth());
});

export default router;