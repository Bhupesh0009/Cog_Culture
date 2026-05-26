import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import verifyRoutes from './routes/verify.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with dynamic matching to support any local development port (e.g. 5173, 5174, 5175)
const localhostRegex = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, postman, curl)
    if (!origin) return callback(null, true);
    
    if (localhostRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by TruthLayer CORS security'));
    }
  },
  credentials: true
}));

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Print clean log of incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().split('T')[1].slice(0, 8)}] ${req.method} ${req.path}`);
  next();
});

// Root API Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'TruthLayer AI API is running.',
    mode: (process.env.HF_API_KEY) ? 'LIVE_AI' : 'SMART_MOCK',
    version: '1.0.0'
  });
});

// Mount routes
app.use('/api/verify', verifyRoutes);

// Catch-all 404 route
app.use((req, res, next) => {
  const error = new Error(`Endpoint Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Register Centralized Error Handler
app.use(errorHandler);

// Launch Server
app.listen(PORT, () => {
  console.log('===================================================');
  console.log(`🚀 TruthLayer AI Server running on port: ${PORT}`);
  console.log(`💡 Mode: ${(process.env.HF_API_KEY) ? '🟢 LIVE AI CORE (HUGGING FACE)' : '🟡 SMART CONTEXT MOCK'}`);
  console.log('===================================================');
});
