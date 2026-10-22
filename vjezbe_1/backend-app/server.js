const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(cors()); 
app.use(express.json()); 

let expenses = [
  { id: 1, title: 'Kava', amount: 2.50 },
  { id: 2, title: 'Mlijeko i kruh', amount: 4.80 }
];


app.get('/api/expenses', (req, res) => {res.json(expenses);});

app.post('/api/expenses', (req, res) => {
  const { title, amount } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ error: 'Naziv i iznos su obavezni!' });
  }

  const newExpense = {
    id: Date.now(),
    title: title,
    amount: parseFloat(amount)
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});


app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exists = expenses.some(e => e.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Trošak nije pronađen.' });
  }

  expenses = expenses.filter(e => e.id !== id);
  res.json({ message: 'Trošak uspješno obrisan.' });
});


app.use(express.static(path.join(__dirname, '../frontend-app/dist')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend-app/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server sluša na http://localhost:${PORT}`);
});