import express, { Request, Response } from 'express';
import cors from 'cors';
import healthRouter from './routes/health';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Subscribe to Vooks');
});
app.use('/health', healthRouter);

// Error handling
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port ${port}`);
});

export default app;
