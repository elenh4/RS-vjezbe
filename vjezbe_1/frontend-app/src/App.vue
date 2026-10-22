<script setup>
import { ref, computed } from 'vue'

// Stanja za novi trošak
const title = ref('')
const amount = ref('')

// Lista troškova
const expenses = ref([
  { id: 1, title: 'Kava', amount: 2.50 },
  { id: 2, title: 'Gljivice i kruh', amount: 4.80 }
])

// Funkcija za dodavanje troška
function addExpense() {
  if (title.value.trim() !== '' && amount.value > 0) {
    expenses.value.push({
      id: Date.now(),
      title: title.value,
      amount: parseFloat(amount.value)
    })
    title.value = ''
    amount.value = ''
  }
}

// Funkcija za brisanje troška
function removeExpense(id) {
  expenses.value = expenses.value.filter(expense => expense.id !== id)
}

// Izračun ukupnog iznosa (reaktivno pomoću computed)
const totalAmount = computed(() => {
  return expenses.value.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)
})
</script>

<template>
  <main class="container">
    <h1>Praćenje Troškova</h1>

    <!-- Prikaz ukupnog iznosa -->
    <section class="card total-card">
      <h2>Ukupno potrošeno:</h2>
      <p class="total-price">{{ totalAmount }} €</p>
    </section>

    <!-- Forma za unos novog troška -->
    <section class="card">
      <h2>Dodaj novi trošak</h2>
      <div class="form-group">
        <input 
          v-model="title" 
          placeholder="Naziv troška (npr. Internet)..." 
        />
        <input 
          v-model.number="amount" 
          type="number" 
          step="0.01" 
          placeholder="Iznos (€)..." 
          @keyup.enter="addExpense"
        />
        <button @click="addExpense">Dodaj</button>
      </div>
    </section>

    <!-- Lista troškova -->
    <section class="card">
      <h2>Povijest troškova</h2>
      <p v-if="expenses.length === 0" class="empty-text">Nema unesenih troškova.</p>
      <ul v-else>
        <li v-for="expense in expenses" :key="expense.id">
          <span class="expense-title">{{ expense.title }}</span>
          <div class="expense-right">
            <span class="expense-amount">{{ expense.amount.toFixed(2) }} €</span>
            <button class="delete-btn" @click="removeExpense(expense.id)">X</button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.container {
  max-width: 550px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

.card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.total-card {
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
  text-align: center;
}

.total-card h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: normal;
}

.total-price {
  font-size: 2.2rem;
  font-weight: bold;
  margin: 10px 0 0 0;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

button:hover {
  background-color: #33a06f;
}

.form-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.form-group input {
  flex: 1;
  min-width: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group button {
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  background: white;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.expense-title {
  font-weight: 500;
}

.expense-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.expense-amount {
  font-weight: bold;
  color: #c0392b;
}

.delete-btn {
  background-color: #ff5252;
  padding: 5px 10px;
  font-size: 12px;
}

.delete-btn:hover {
  background-color: #e04848;
}

.empty-text {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>