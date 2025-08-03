import { Router } from 'express';

const router = Router();

function checkSystemHealth() {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  };
}

router.get('/', (_req, res) => {
  res.status(200).json(checkSystemHealth());
});

export default router;