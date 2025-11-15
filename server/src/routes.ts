import { Router, Request, Response } from 'express';
import { CatchResponse } from './types';

const router = Router();

// POST /api/catch/pokeball - 30% success rate, configurable delay
router.post('/api/catch/pokeball', async (req: Request, res: Response) => {
  // * Get delay from query param (default 3 seconds)
  const delay = parseInt(req.query.delay as string) || 3;
  await new Promise(resolve => setTimeout(resolve, delay * 1000));

  // * Random success (50% chance)
  const success = Math.random() <= 0.5;

  const response: CatchResponse = {
    success,
    message: success ? 'Charizard was caught!' : 'Charizard escaped!'
  };

  res.json(response);
});

// POST /api/catch/masterball - 100% success rate, configurable delay
router.post('/api/catch/masterball', async (req: Request, res: Response) => {
  // * Get delay from query param (default 3 seconds)
  const delay = parseInt(req.query.delay as string) || 3;
  await new Promise(resolve => setTimeout(resolve, delay * 1000));

  // * Master Ball always succeeds
  const response: CatchResponse = {
    success: true,
    message: 'Charizard was caught!'
  };

  res.json(response);
});

export default router;
