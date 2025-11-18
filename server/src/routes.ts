import { Router, Request, Response } from 'express';
import { CatchResponse } from './types';

const router = Router();

let success = true; // Used to alternate success/failure for Poké Ball catches

// POST /api/catch/pokeball - configurable delay, logic for success/failure based on last attempt
router.post('/api/catch/pokeball', async (req: Request, res: Response) => {
  // * Get delay from query param (default 3 seconds)
  const delay = parseInt(req.query.delay as string) || 3;
  await new Promise(resolve => setTimeout(resolve, delay * 1000));


  const response: CatchResponse = {
    success,
    message: success ? 'Charizard was caught!' : 'Charizard escaped!'
  };


  success = !success; // Toggle success for demonstration purposes


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
