const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Omogućuje zahtjeve s Vue aplikacije
app.use(express.json()); // Omogućuje čitanje JSON podataka iz zahtjeva

// Početni podaci (simulacija baze podataka)
let expenses = [
  { id: 1, title: 'Kava', amount: 2.50 },
  { id: 2, title: 'Gljivice i kruh', amount: 4.80 }
];

// 1. GET ruta - Dohvati sve troškove
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// 2. POST ruta - Dodaj novi trošak
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

// 3. DELETE ruta - Obriši trošak po ID-u
app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exists = expenses.some(e => e.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Trošak nije pronađen.' });
  }

  expenses = expenses.filter(e => e.id !== id);
  res.json({ message: 'Trošak uspješno obrisan.' });
});

// Pokretanje poslužitelja
app.listen(PORT, () => {
  console.log(`Server sluša na http://localhost:${PORT}`);
});