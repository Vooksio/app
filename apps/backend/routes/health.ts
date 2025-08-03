import { VercelRequest, VercelResponse } from '@vercel/node';

// Example: Your existing business logic stays the same
function checkSystemHealth() {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
}

// Vercel serverless function export
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const health = checkSystemHealth();
    return res.status(200).json(health);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}