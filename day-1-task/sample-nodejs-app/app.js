const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'host.docker.internal',
  user: 'root',
  password: 'hiokjb.py', // replace with your password
  database: 'login_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Handle Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.send(`<h2>✅ Welcome, ${username}!</h2>`);
      } else {
        res.send('<h2>❌ Login Failed. Invalid username or password.</h2>');
      }
    }
  );
});

// Handle Sign Up
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.send('<h2>⚠️ Username already exists.</h2>');
      } else {
        db.query(
          'INSERT INTO users (username, password) VALUES (?, ?)',
          [username, password],
          (err, result) => {
            if (err) throw err;
            res.send('<h2>✅ Registration successful. <a href="/">Login here</a>.</h2>');
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
