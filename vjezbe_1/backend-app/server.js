const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

let expenses = [
  { id: 1, title: 'Kava', amount: 2.5 },
  { id: 2, title: 'Mlijeko i kruh', amount: 4.8 },
]

// API rute
app.get('/api/expenses', (req, res) => {
  res.json(expenses)
})

app.post('/api/expenses', (req, res) => {
  const { title, amount } = req.body

  if (!title || !amount) {
    return res.status(400).json({ error: 'Naziv i iznos su obavezni!' })
  }

  const newExpense = {
    id: Date.now(),
    title: title,
    amount: parseFloat(amount),
  }

  expenses.push(newExpense)
  res.status(201).json(newExpense)
})

app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const exists = expenses.some((e) => e.id === id)

  if (!exists) {
    return res.status(404).json({ error: 'Trošak nije pronađen.' })
  }

  expenses = expenses.filter((e) => e.id !== id)
  res.json({ message: 'Trošak uspješno obrisan.' })
})

// Služenje frontenda (samo ako postoji dist mapa)
const distPath = path.join(__dirname, '../frontend-app/dist')

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))

  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Backend radi. API: /api/expenses')
  })
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server sluša na portu ${PORT}`)
})