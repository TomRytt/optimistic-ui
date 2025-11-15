import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

// Routes
app.use(routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🔥 Pokemon Catching API running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for http://localhost:3000`);
});
