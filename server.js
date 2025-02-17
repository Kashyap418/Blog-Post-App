import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve(); 

const app = express();
dotenv.config();

// CORS middleware
app.use(cors());

// Use express built-in middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// Serve static files from the dist folder
const clientDistPath = path.join(__dirname, "client", "dist");
app.use(express.static(clientDistPath));

// Catch-all route for SPA
app.get("*", function(_, res){
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on Port:${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Database connection
Connection(USERNAME, PASSWORD);
