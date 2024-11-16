const express = require('express');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');



const app = express();
const port = 3000;

// Connect to Redis (using local Redis or AWS ElastiCache Redis)
const redis = new Redis({
  host: '127.0.0.1',  // Use '127.0.0.1' for local Redis, or your AWS ElastiCache endpoint for cloud Redis
  port: 6379,          // Default Redis port
});

// Middleware to parse JSON bodies
app.use(express.json());

// Secret key for JWT signing
const JWT_SECRET = 'super_secret_key_1234567890';

// Endpoint for user login (simulated with dummy data)
// app.post('/login', (req, res) => {
//   const { username } = req.body;
//   const sessionId = `session_${username}`;

//   // Simulated user data
//   const userData = {
//     username,
//     lastLogin: new Date().toISOString(),
//   };

//   // Store session data in Redis with expiration (TTL = 30 minutes)
//   redis.set(sessionId, JSON.stringify(userData), 'EX', 5);

//   res.json({ message: 'Logged in successfully!', sessionId });
// });
app.post('/login', (req, res) => {
    const { username } = req.body;
    const sessionId = `session_${username}`;
  
    // Simulated user data
    const userData = {
      username,
      lastLogin: new Date().toISOString(),
    };
  
    // Store session data in Redis with expiration (TTL = 30 minutes)
    redis.set(sessionId, JSON.stringify(userData), 'EX', 1800);
  
    // Create JWT token
    const token = jwt.sign({ sessionId, username }, JWT_SECRET, { expiresIn: '30m' });
  
    res.json({ message: 'Logged in successfully!', token });
  });

// Endpoint to get session data
app.get('/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const sessionData = await redis.get(sessionId);

  if (sessionData) {
    res.json({ sessionData: JSON.parse(sessionData) });
  } else {
    res.status(404).json({ message: 'Session expired or not found.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
