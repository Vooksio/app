import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health'; // compiled path uses .js after tsc, but TS import .ts fine

const app = express();
app.use(cors());

app.use('/health', healthRouter);

// Export the Express app for Vercel
export default app;
