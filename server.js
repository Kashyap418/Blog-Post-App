// This is the main entry point for the server application
import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import logger from './utils/logger.js';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve(); 

const app = express();
dotenv.config();

// CORS middleware allows requests from other origins
app.use(cors());

// Use express built-in middleware to parse JSON and URL-encoded bodies
// To handle Post API requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the main router for all routes
// Simple request logger
app.use((req, _res, next) => {
  const start = Date.now();
  _res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${_res.statusCode} ${duration}ms`);
  });
  next();
});

app.use('/', router);

// Serve static files from the dist folder
const clientDistPath = path.join(__dirname, "client", "dist");
app.use(express.static(clientDistPath));

// Catch-all route for SPA (Single Page Application)
app.get("*", function(_, res){
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 8000;

// Start the server and listen on the specified port
app.listen(PORT, () => logger.info(`Server is running on Port:${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Database connection
Connection(USERNAME, PASSWORD);
