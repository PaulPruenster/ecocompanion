import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';

const app = express();
app.use(express.json());

const db = new sqlite3.Database(path.join(__dirname, '..', 'database.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`);

app.get('/users', (_, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve users' });
      return;
    }
    res.json(rows);
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint')) {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(500).json({ error: 'Failed to create user' });
      }
      return;
    }
    res.status(201).json({ id: this.lastID, name, email });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));