import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/authRoutes.js';
import propertyRoutes from './src/routes/propertyRoutes.js';
import './src/config/db.js';

dotenv.config();

const app = express();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from assets folder
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

// Routes
app.use('/api', authRoutes);
app.use('/api', propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));