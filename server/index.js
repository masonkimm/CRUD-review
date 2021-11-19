const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'employee__handbook',
});
if (db) {
  console.log('connected to db');
}
app.post('/create', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const position = req.body.position;
  const techStack = req.body.techStack;
  const salary = req.body.salary;

  db.query(
    'INSERT INTO employees(name, age, position, techStack, salary) VALUES (?, ?, ?, ?, ?)',
    [name, age, position, techStack, salary],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values inserted into DB');
      }
    }
  );
});

app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const position = req.body.position;
  db.query(
    'UPDATE employees SET name = ?, position = ? WHERE id = ?',
    [name, position, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server live on port: ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('hi');
});
