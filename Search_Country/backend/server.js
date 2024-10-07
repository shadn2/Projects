const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// SQLite database
const db = new sqlite3.Database(':memory:');

// Table for countries
db.serialize(() => {
  db.run(`CREATE TABLE countries (id INTEGER PRIMARY KEY, name TEXT)`);
  const stmt = db.prepare(`INSERT INTO countries (name) VALUES (?)`);
  const countries = [
    'Albania', 'Andorra', 'Australia', 'Brazil', 'Belgium', 'Canada', 'China',
    'France', 'Germany', 'India', 'Indonesia', 'Ireland', 'Italy', 'Japan', 'Kenya',
    'Luxembourg', 'Mexico', 'New Zealand', 'Nigeria', 'Portugal', 'Russia', 
    'South Africa', 'South Korea', 'Spain', 'Sweden', 'Thailand', 'Ukraine',
    'United Kingdom', 'United States of America', 'Vietnam', 'Zambia'
  ];
  countries.forEach((country) => {
    stmt.run(country);
  }); 
  stmt.finalize();
});

// API
app.get('/countries', (req, res) => {
  const searchQuery = req.query.q || '';
  db.all(`SELECT name FROM countries WHERE name LIKE ?`, [`%${searchQuery}%`], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.map(row => row.name));
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
